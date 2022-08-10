import {
  Article,
  ArticleCategory,
  ArticlePreview,
  ArticleSubCategory,
  ArticlesByCategory,
  ArticlesPreviewByCategory,
  ArticlesPreviewBySubCategory,
  articleCategories,
  articleSubCategories,
} from '../types';
import { api } from './api';

export const ArticleService = {
  getAllArticles: async () => {
    const { data } = await api.get<Article[]>('/posts');
    return data;
  },
  getArticlesByCategory: async (): Promise<ArticlesByCategory> => {
    const articles = await ArticleService.getAllArticles();

    const articlesByCategory: ArticlesByCategory = {
      [ArticleCategory.all]: articles,
      [ArticleCategory.usefulArticles]: [],
      [ArticleCategory.pov]: [],
      [ArticleCategory.experience]: [],
    };

    articles.forEach((article) => {
      article.categories.forEach((category) => {
        articlesByCategory[category].push(article);
      });
    });
    return articlesByCategory;
  },
  getArticlesListByCategory: async () => {
    const articlesByCategory = await ArticleService.getArticlesByCategory();

    const articlePreview = (article: Article): ArticlePreview => ({
      id: article.id,
      image: article.image,
      title: article.title,
      categories: article.categories,
      subCategories: article.subCategories,
    });

    return articleCategories.reduce(
      (acc, category) => Object.assign(acc, { [category]: articlesByCategory[category].map(articlePreview) }),
      {} as ArticlesPreviewByCategory,
    );
  },
  getCategoriesInfo: (
    articlesByCategory: ArticlesByCategory | ArticlesPreviewByCategory,
  ): Record<ArticleCategory, number> => {
    return articleCategories.reduce(
      (acc, category) => Object.assign(acc, { [category]: articlesByCategory[category].length }),
      {} as Record<ArticleCategory, number>,
    );
  },
  getArticlesListBySubCategory: (articles: ArticlePreview[]) => {
    const articlesBySubCategory: ArticlesPreviewBySubCategory = {
      [ArticleSubCategory.mentalHealth]: [],
      [ArticleSubCategory.familyRelationships]: [],
    };

    articles.forEach((article) => {
      article.subCategories.forEach((category) => {
        articlesBySubCategory[category].push(article);
      });
    });
    return articlesBySubCategory;
  },
  getSubCategoriesInfo: (articlesBySubCategory: ArticlesPreviewBySubCategory): Record<ArticleSubCategory, number> => {
    return articleSubCategories.reduce(
      (acc, subCategory) => Object.assign(acc, { [subCategory]: articlesBySubCategory[subCategory].length }),
      {} as Record<ArticleSubCategory, number>,
    );
  },
};
