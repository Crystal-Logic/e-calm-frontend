import { api } from '@/services/api';
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
} from '@/types';
import { addSlugToArticles } from '@/utils';

export const ArticleService = {
  getAllArticles: async () => {
    const data = await api.get<Article[]>('/posts');
    return addSlugToArticles(data);
  },
  getArticlesByCategory: async (): Promise<ArticlesByCategory> => {
    const articles = await ArticleService.getAllArticles();

    const articlesByCategory: ArticlesByCategory = {
      [ArticleCategory.all]: articles,
      [ArticleCategory.usefulArticles]: [],
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
      sub_categories: article.sub_categories,
      slug: article.slug,
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
      [ArticleSubCategory.helpForChildren]: [],
    };

    articles.forEach((article) => {
      article.sub_categories.forEach((category) => {
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
