export enum ArticleCategory {
  all = 'articles',
  usefulArticles = 'useful-articles',
  pov = 'pov',
  experience = 'experience',
}

export const articleCategories = [
  ArticleCategory.all,
  ArticleCategory.usefulArticles,
  ArticleCategory.pov,
  ArticleCategory.experience,
];

export const navLinks = [
  `/${ArticleCategory.usefulArticles}`,
  `/${ArticleCategory.pov}`,
  `/${ArticleCategory.experience}`,
  `/testing`,
  '/#contacts',
  '/#faq',
] as const;

type Category = {
  name: string;
  slug: ArticleCategory;
};

export type Article = {
  id: never;
  image: string;
  title: string;
  body: string;
  categories: Category[];
};

export type ArticlePreview = Pick<Article, 'id' | 'image' | 'title' | 'categories'>;
export type ArticlesByCategory = Record<ArticleCategory, Article[]>;
export type ArticlesPreviewByCategory = Record<ArticleCategory, ArticlePreview[]>;
