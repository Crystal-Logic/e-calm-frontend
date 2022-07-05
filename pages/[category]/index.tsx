import type { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';

import { Container, Grid, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ArticleCard } from '../../components/ArticleCard';
import { CategoriesNav } from '../../components/CategoriesNav';
import { ArticleService } from '../../services';
import { ArticleCategory, ArticlesPreviewByCategory, articleCategories } from '../../types';

type ArticlesListProps = {
  category: ArticleCategory;
  articlesListByCategory: ArticlesPreviewByCategory;
  categoriesInfo: Record<ArticleCategory, number>;
};

const ArticlesList: NextPage<ArticlesListProps> = ({ articlesListByCategory, categoriesInfo, category }) => {
  const { t } = useTranslation('common');

  return (
    <Container py={{ base: 8, md: 16 }}>
      <Heading as="h2" size={{ base: 'md', md: '2xl' }}>
        {t('articles.listTitle')}
      </Heading>
      <CategoriesNav categoriesInfo={categoriesInfo} activeCategory={category} />
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 6, lg: 8 }}>
        {articlesListByCategory[category]?.map((article) => (
          <NextLink key={article.id} passHref href={`/${article.categories[0]}/${article.id}`}>
            <a>
              <ArticleCard article={article} />
            </a>
          </NextLink>
        ))}
      </Grid>
    </Container>
  );
};

export async function getStaticPaths() {
  return {
    paths: articleCategories.map((category) => ({ params: { category } })),
    fallback: 'blocking', // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps<ArticlesListProps, { category: ArticleCategory }> = async ({
  locale,
  params,
}) => {
  const articlesListByCategory = await ArticleService.getArticlesListByCategory();
  const categoriesInfo = ArticleService.getCategoriesInfo(articlesListByCategory);

  return {
    props: {
      articlesListByCategory,
      category: params!.category,
      categoriesInfo,
      ...(await serverSideTranslations(locale!)),
    },
  };
};

export default ArticlesList;
