import { useState } from 'react';

import NextLink from 'next/link';

import { Button, Center, Container, Grid, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { ArticleCategory, ArticlesPreviewByCategory } from '../../types';
import { ArticleCard } from '../ArticleCard';
import { CategoriesNav } from '../CategoriesNav';

type HomeArticlesProps = {
  categoriesInfo: Record<ArticleCategory, number>;
  articles: ArticlesPreviewByCategory;
};

export const HomeArticles = ({ categoriesInfo, articles }: HomeArticlesProps) => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>(ArticleCategory.all);

  return (
    <Container py={{ base: 16, md: 16 }}>
      <Heading as="h2" size={{ base: 'md', md: '2xl' }}>
        {t('articles.listTitle')}
      </Heading>
      <CategoriesNav
        categoriesInfo={categoriesInfo}
        activeCategory={selectedCategory}
        onClick={(e, category) => {
          e.preventDefault();
          setSelectedCategory(category);
        }}
      />
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 6, lg: 8 }}>
        {articles[selectedCategory]?.map((article) => (
          <NextLink key={article.id} passHref href={`/${article.categories[0]}/${article.id}`}>
            <a>
              <ArticleCard article={article} />
            </a>
          </NextLink>
        ))}
      </Grid>
      <Center mt={{ base: 8, md: 12 }}>
        <NextLink passHref href={`/${selectedCategory}`}>
          <Button>{t('articles.allArticles')}</Button>
        </NextLink>
      </Center>
    </Container>
  );
};
