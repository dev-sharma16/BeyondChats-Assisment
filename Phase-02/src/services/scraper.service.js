import axios from "axios";
import https from "https";
import * as cheerio from "cheerio";

export const scrapeReferenceArticle = async (url) => {
  const { data } = await axios.get(url, {
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; BeyondChatsBot/1.0; +https://beyondchats.com)",
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });

  const $ = cheerio.load(data);

  // Remove obvious non-content blocks
  $("script, style, nav, footer, form, iframe, noscript").remove();

  // Try common article containers first (BEST CASE)
  const possibleSelectors = [
    "article",
    ".entry-content",
    ".post-content",
    ".blog-content",
    ".content",
    ".article-content",
    "main",
  ];

  for (const selector of possibleSelectors) {
    if ($(selector).length) {
      const html = $(selector).html()?.trim();
      if (html && html.length > 300) {
        return html;
      }
    }
  }

  // Fallback: Phase-01 style intelligent traversal
  let contentNodes = [];
  let started = false;

  $("body")
    .find("*")
    .each((_, el) => {
      const tag = $(el).prop("tagName")?.toLowerCase();
      const text = $(el).text().trim().toLowerCase();

      if (!started) {
        if (tag === "h1") {
          started = true;
        }
        return;
      }

      // Stop when comments / reply section begins
      if (
        text.includes("leave a reply") ||
        text.includes("comments") ||
        text.includes("comment")
      ) {
        return false;
      }

      if (!["script", "style", "nav", "footer", "form"].includes(tag)) {
        contentNodes.push($(el).clone());
      }
    });

  const contentHTML = contentNodes
    .map((node) => $.html(node))
    .join("\n")
    .trim();

  if (!contentHTML || contentHTML.length < 300) {
    throw new Error("Failed to extract meaningful content");
  }

  return contentHTML;
};
