import type { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';

import { Container, Grid, GridItem, HStack, Heading, Link } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ArticleService } from '../../services';
import { ArticleCategory, ArticlesPreviewByCategory, articleCategories } from '../../types';

type ArticlesListProps = {
  slug: ArticleCategory;
  articlesListByCategory: ArticlesPreviewByCategory;
  categoriesInfo: Record<ArticleCategory, number>;
};

const ArticlesList: NextPage<ArticlesListProps> = ({ articlesListByCategory, categoriesInfo, slug }) => {
  const { t } = useTranslation('common');

  const categoriesTranslations = t('categories', { returnObjects: true }) as Record<string, string>;

  const articles = articlesListByCategory[slug];
  return (
    <Container py={{ base: 8, md: 16 }}>
      <Heading as="h2" size={{ base: 'md', md: '2xl' }}>
        {t('articles.listTitle')}
      </Heading>
      <HStack as={'nav'} spacing={6} mb={8}>
        {articleCategories.map((category) => (
          <NextLink key={category} passHref href={category}>
            <Link>
              {categoriesTranslations[category]} ({categoriesInfo[category]})
            </Link>
          </NextLink>
        ))}
      </HStack>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {articles?.map((article) => (
          <NextLink key={article.id} passHref href={`${article.categories[0].slug}/${article.id}`}>
            <GridItem as={Link}>
              <img src={article.image} alt="image" />
              {article.id} <br />
              {article.title}
            </GridItem>
          </NextLink>
        ))}
      </Grid>
    </Container>
  );
};

export async function getStaticPaths() {
  return {
    paths: articleCategories.map((category) => ({ params: { slug: category } })),
    fallback: 'blocking', // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps<ArticlesListProps, { slug: ArticleCategory }> = async ({
  locale,
  params,
}) => {
  const articlesListByCategory = await ArticleService.getArticlesListByCategory();
  const categoriesInfo = ArticleService.getCategoriesInfo(articlesListByCategory);

  return {
    props: {
      articlesListByCategory,
      slug: params!.slug,
      categoriesInfo,
      ...(await serverSideTranslations(locale!)),
    },
  };
};

export default ArticlesList;
