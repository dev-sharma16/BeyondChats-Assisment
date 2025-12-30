import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const trimContent = (html, maxChars = 6000) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, " "); // strip HTML
  return text.length > maxChars
    ? text.slice(0, maxChars)
    : text;
};

export const rewriteWithGemini = async (originalHTML, refHTML1, refHTML2) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const original = trimContent(originalHTML, 4000);
  const ref1 = trimContent(refHTML1, 3000);
  const ref2 = trimContent(refHTML2, 3000);

  const prompt = `
You are a professional content writer.

ORIGINAL ARTICLE:
${original}

REFERENCE ARTICLE 1:
${ref1}

REFERENCE ARTICLE 2:
${ref2}

TASK:
Rewrite the original article to improve clarity, structure, SEO, and depth.
Follow the tone and formatting style of the reference articles.
Do NOT copy text.
Return clean HTML content only.
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (err) {
    if (err.status === 429) {
      console.log("Gemini rate limit hit. Waiting 60 seconds...");
      await delay(60000);
      return rewriteWithGemini(originalHTML, refHTML1, refHTML2);
    }

    throw err;
  }
};
