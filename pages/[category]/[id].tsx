import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ArticleService } from '../../services';
import { Article, ArticleCategory, articleCategories } from '../../types';

type ArticleProps = {
  article: Article;
};

const ArticlePage: NextPage<ArticleProps> = ({ article }) => {
  const { t } = useTranslation('common');

  return (
    <div>
      {article.title}
      <br />
      <img src={article.image} alt="image" width={400} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const articlesByCategory = await ArticleService.getArticlesByCategory();

  return {
    paths: locales!
      .map((locale: string) =>
        articleCategories
          .filter((cat) => cat !== ArticleCategory.all)
          .map((category) =>
            articlesByCategory[category].map((article) => ({
              params: { category, id: String(article.id) },
              locale,
            })),
          )
          .flat(),
      )
      .flat(),
    fallback: 'blocking', // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<ArticleProps, { id: string }> = async ({ locale, params }) => {
  const articles = await ArticleService.getAllArticles();

  return {
    props: {
      article: articles.find((article) => String(article.id) === params!.id)!,
      locale: locale!,
      ...(await serverSideTranslations(locale!)),
    },
  };
};

export default ArticlePage;
