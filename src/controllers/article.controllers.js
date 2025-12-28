import Article from '../models/article.model.js';

export const createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  res.status(201).json(article);
};

export const getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

export const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
};

export const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(article);
};

export const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: 'Article deleted' });
};
