import slugify from '@sindresorhus/slugify';

import { Article } from '@/types';

const getSlugForArticle = (article: Article) => slugify(article.title, { customReplacements: [['и', 'y']] });

export const addSlugToArticles = (articles: Article[]) => {
  return articles.map((article) => ({
    ...article,
    slug: getSlugForArticle(article),
  }));
};
