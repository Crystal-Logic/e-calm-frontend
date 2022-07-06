import { MouseEvent } from 'react';

import NextLink from 'next/link';

import { HStack, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { ArticleCategory, articleCategories } from '../../types';

type CategoriesNavProps = {
  categoriesInfo: Record<ArticleCategory, number>;
  activeCategory: ArticleCategory;
  onClick?: (e: MouseEvent<HTMLAnchorElement>, category: ArticleCategory) => void;
};

export const CategoriesNav = ({ categoriesInfo, activeCategory, onClick }: CategoriesNavProps) => {
  const { t } = useTranslation('common');
  const categoriesTranslations = t('categories', { returnObjects: true }) as Record<string, string>;

  return (
    <HStack as="nav" spacing={{ base: 4, md: 6 }} mt={8} mb={6} overflow="auto" whiteSpace="nowrap" pb={2}>
      {articleCategories.map((category) => (
        <NextLink key={category} passHref href={category} scroll={false}>
          <Link
            fontSize={{ base: 'sm', md: 'xl' }}
            textDecoration={activeCategory === category ? 'underline' : 'initial'}
            color={activeCategory === category ? 'brand.black' : 'brand.grey'}
            onClick={(e) => onClick && onClick(e, category)}
          >
            {categoriesTranslations[category]}
            {category !== ArticleCategory.all && (
              <Text as="span" transform="translateY(-0.6em)" display="inline-block" size="sm" ml={0.5}>
                {categoriesInfo[category]}
              </Text>
            )}
          </Link>
        </NextLink>
      ))}
    </HStack>
  );
};
