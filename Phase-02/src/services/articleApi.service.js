import axios from 'axios';
import { config } from '../config/env.js';

export const fetchArticles = async () => {
  const { data } = await axios.get(`${config.phase1Api}/articles`);
  return data.filter((article) => !article.isUpdated);
};
