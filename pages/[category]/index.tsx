import type { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';

import { Container, Grid, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import { ArticleCard } from '../../components/ArticleCard';
import { CategoriesNav } from '../../components/CategoriesNav';
import { ArticleService } from '../../services';
import {
  ArticleCategory,
  ArticlePreview,
  ArticleSubCategory,
  articleCategories,
  articleSubCategories,
} from '../../types';

type ArticlesListProps = {
  category: ArticleCategory;
  subCategory: ArticleSubCategory | null;
  articlesList: ArticlePreview[];
  categoriesInfo: Record<ArticleCategory, number>;
  subCategoriesInfo: Record<ArticleSubCategory, number>;
};

const ArticlesList: NextPage<ArticlesListProps> = ({
  articlesList,
  categoriesInfo,
  category,
  subCategory,
  subCategoriesInfo,
}) => {
  const { t } = useTranslation('common');
  const categoriesTranslations = t('categories', { returnObjects: true }) as Record<string, string>;

  const pageTitle = `${t('articles.listTitle')} | ${categoriesTranslations[category]}`;
  return (
    <>
      <NextSeo
        title={pageTitle}
        openGraph={{ title: pageTitle }}
        canonical={`${process.env.NEXT_PUBLIC_APP_URL}/${category}`}
      />
      <Container py={{ base: 8, md: 16 }}>
        <Heading as="h2" size={{ base: 'md', md: '2xl' }} mb={6}>
          {t('articles.listTitle')}
        </Heading>
        <CategoriesNav items={articleCategories} categoriesInfo={categoriesInfo} activeCategory={category} />
        <CategoriesNav items={articleSubCategories} categoriesInfo={subCategoriesInfo} activeCategory={subCategory} />
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={{ base: 6, lg: 8 }}
          mt={4}
        >
          {articlesList.map((article) => (
            <NextLink key={article.id} passHref href={`/${article.categories[0]}/${article.id}`}>
              <a>
                <ArticleCard article={article} />
              </a>
            </NextLink>
          ))}
        </Grid>
      </Container>
    </>
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
  let category = params?.category;
  let subCategory: ArticleSubCategory | null = null;

  if (category && articleSubCategories.includes(category as unknown as ArticleSubCategory)) {
    subCategory = category as unknown as ArticleSubCategory;
    category = ArticleCategory.usefulArticles;
  }

  if (!category || (category && !(articleCategories.includes(category) || subCategory))) {
    return {
      notFound: true,
    };
  }

  const articlesListByCategory = await ArticleService.getArticlesListByCategory();
  const categoriesInfo = ArticleService.getCategoriesInfo(articlesListByCategory);

  const articlesListBySubCategory = ArticleService.getArticlesListBySubCategory(
    articlesListByCategory[ArticleCategory.usefulArticles],
  );
  const subCategoriesInfo = ArticleService.getSubCategoriesInfo(articlesListBySubCategory);

  return {
    props: {
      articlesList: subCategory ? articlesListBySubCategory[subCategory] : articlesListByCategory[category],
      category,
      subCategory,
      categoriesInfo,
      subCategoriesInfo,
      ...(await serverSideTranslations(locale!)),
    },
  };
};

export default ArticlesList;
