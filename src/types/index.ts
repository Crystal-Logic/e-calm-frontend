export * from './form';

export enum ArticleCategory {
  all = 'articles',
  usefulArticles = 'useful-articles',
}

export enum ArticleSubCategory {
  mentalHealth = 'mental-health',
  helpForChildren = 'help-for-children',
  familyRelationships = 'family-relationships',
}

export const articleCategories = [ArticleCategory.all, ArticleCategory.usefulArticles];

export const articleSubCategories = [
  ArticleSubCategory.mentalHealth,
  ArticleSubCategory.familyRelationships,
  ArticleSubCategory.helpForChildren,
];

export const navLinks = [
  `/${ArticleCategory.usefulArticles}`,
  // `/testing`,
  '/#contacts',
  '/#faq',
] as const;

export type Article = {
  id: never;
  image: string;
  title: string;
  body: string;
  categories: ArticleCategory[];
  subCategories: ArticleSubCategory[];
};

export type ArticlePreview = Pick<Article, 'id' | 'image' | 'title' | 'categories' | 'subCategories'>;
export type ArticlesByCategory = Record<ArticleCategory, Article[]>;
export type ArticlesPreviewByCategory = Record<ArticleCategory, ArticlePreview[]>;
export type ArticlesPreviewBySubCategory = Record<ArticleSubCategory, ArticlePreview[]>;
