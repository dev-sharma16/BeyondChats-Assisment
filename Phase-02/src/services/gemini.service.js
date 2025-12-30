import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export const rewriteWithGemini = async (originalArticle, ref1, ref2) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
You are a professional content writer.

ORIGINAL ARTICLE:
${originalArticle}

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

  const result = await model.generateContent(prompt);
  return result.response.text();
};
