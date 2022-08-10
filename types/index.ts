export * from './form';

export enum ArticleCategory {
  all = 'articles',
  usefulArticles = 'useful-articles',
  pov = 'pov',
  experience = 'experience',
}

export enum ArticleSubCategory {
  mentalHealth = 'mental-health',
  familyRelationships = 'family-relationships',
}

export const articleCategories = [
  ArticleCategory.all,
  ArticleCategory.usefulArticles,
  ArticleCategory.pov,
  ArticleCategory.experience,
];

export const articleSubCategories = [ArticleSubCategory.mentalHealth, ArticleSubCategory.familyRelationships];

export const navLinks = [
  `/${ArticleCategory.usefulArticles}`,
  `/${ArticleCategory.pov}`,
  `/${ArticleCategory.experience}`,
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
