import { fetchArticles } from './services/articleApi.service.js';
import { googleSearch } from './services/googleSearch.service.js';
import { scrapeReferenceArticle } from './services/scraper.service.js';
import { rewriteWithGemini } from './services/gemini.service.js';
import { publishUpdatedArticle } from './services/publisher.service.js';
import { delay } from '../../Phase-01/src/utils/delay.js';

const run = async () => {
  const articles = await fetchArticles();
  console.log(`Found ${articles.length} articles to process`);

  for (const article of articles) {
    console.log('Processing:', article.title);

    const links = await googleSearch(article.title);
    if (links.length < 2) {
      console.log('Not enough reference articles, skipping');
      continue;
    }

    const ref1 = await scrapeReferenceArticle(links[0]);
    const ref2 = await scrapeReferenceArticle(links[1]);

    const updatedContent = await rewriteWithGemini(article.content, ref1, ref2);

    await publishUpdatedArticle(article._id, updatedContent, links);
    delay(60000) // adding delay of 60 sec

    console.log('Updated & published:', article.title);
  }
};

run();
