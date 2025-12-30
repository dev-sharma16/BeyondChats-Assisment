import axios from 'axios';
import { config } from '../config/env.js';

export const googleSearch = async (query) => {
  const url = 'https://serpapi.com/search.json';

  const { data } = await axios.get(url, {
    params: {
      q: query,
      api_key: config.serpApiKey,
      num: 5,
    },
  });

  const links = [];

  for (const result of data.organic_results || []) {
    const link = result.link;
    if (
      !link.includes('beyondchats.com') &&
      !link.includes('youtube') &&
      !link.includes('reddit')
    ) {
      links.push(link);
    }
    if (links.length === 2) break;
  }

  return links;
};
