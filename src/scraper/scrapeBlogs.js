import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import * as cheerio from "cheerio";
import connectDB from "../config/db.js";
import Article from "../models/article.model.js";

const BASE_URL = "https://beyondchats.com";

const scrapeBlogs = async () => {
  try {
    connectDB();
    console.log("Scraping started...");

    // 1️⃣ Load first blogs page to detect last page
    const { data } = await axios.get(`${BASE_URL}/blogs/`);
    const $ = cheerio.load(data);

    let lastPage = 1;
    $(".page-numbers").each((_, el) => {
      const num = parseInt($(el).text());
      if (!isNaN(num)) lastPage = Math.max(lastPage, num);
    });

    console.log("Last page:", lastPage);

    // Collect oldest 5 articles (go backwards)
    const articleLinks = new Set();
    let currentPage = lastPage;

    while (articleLinks.size < 5 && currentPage > 0) {
      const pageUrl =
        currentPage === 1
          ? `${BASE_URL}/blogs/`
          : `${BASE_URL}/blogs/page/${currentPage}/`;

      console.log("Scanning page:", pageUrl);

      const pageRes = await axios.get(pageUrl);
      const $$ = cheerio.load(pageRes.data);

      $$(".entry-title a").each((_, el) => {
        if (articleLinks.size < 5) {
          articleLinks.add($$(el).attr("href"));
        }
      });

      currentPage--;
    }

    const oldestFive = Array.from(articleLinks);
    console.log("Collected articles:", oldestFive.length);

    // Visit & save articles
    for (const url of oldestFive) {
      const exists = await Article.findOne({ originalUrl: url });
      if (exists) {
        console.log("Already exists, skipping:", url);
        continue;
      }

      const articleRes = await axios.get(url);
      const $$$ = cheerio.load(articleRes.data);

      // Use plain h1 for title (no class)
      const title = $$$('h1').first().text().trim();

      // Collect all content between the h1 and the 'Leave a Reply' section
      let contentNodes = [];
      let foundH1 = false;
      let foundEnd = false;
      $$$('body').find('*').each(function(_, el) {
        if (foundEnd) return;
        if (!foundH1) {
          if ($$$(el).is('h1')) foundH1 = true;
          return;
        }
        // Stop at 'Leave a Reply' or similar section
        if ($$$(el).text().trim().toLowerCase().includes('leave a reply')) {
          foundEnd = true;
          return;
        }
        // Only collect visible content (skip scripts, forms, etc.)
        if (!['script', 'style', 'form', 'nav', 'footer'].includes($$$(el).prop('tagName').toLowerCase())) {
          contentNodes.push($$$(el).clone());
        }
      });
      const contentHTML = contentNodes.map(node => $$$.html(node)).join('\n').trim();

      if (!title || !contentHTML) {
        console.log("Invalid article structure, skipping:", url);
        continue;
      }

      await Article.create({
        title,
        content: contentHTML,
        originalUrl: url,
      });

      console.log("Saved:", title);
    }

    console.log("Scraping completed ✅");
    process.exit();
  } catch (error) {
    console.error("Scraping failed ❌", error.message);
    process.exit(1);
  }
};

scrapeBlogs();
