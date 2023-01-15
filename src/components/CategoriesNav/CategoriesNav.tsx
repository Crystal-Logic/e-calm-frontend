import { MouseEvent } from 'react';

import NextLink from 'next/link';

import { HStack, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { ArticleCategory } from '../../types';

type CategoriesNavProps<T extends string> = {
  items: T[];
  categoriesInfo: Record<T, number>;
  activeCategory: T | null;
  onClick?: (e: MouseEvent<HTMLAnchorElement>, category: T) => void;
};

export const CategoriesNav = <T extends string>({
  items,
  categoriesInfo,
  activeCategory,
  onClick,
}: CategoriesNavProps<T>) => {
  const { t } = useTranslation('common');
  const categoriesTranslations = t('categories', { returnObjects: true }) as Record<string, string>;

  return (
    <HStack as="nav" spacing={{ base: 4, md: 6 }} mt={2} mb={2} overflow="auto" whiteSpace="nowrap" pb={2}>
      {items.map((category) => (
        <NextLink onClick={(e) => onClick && onClick(e, category)} key={category} href={`/${category}`} scroll={false}>
          <Link
            as="span"
            fontSize={{ base: 'sm', md: 'xl' }}
            textDecoration={activeCategory === category ? 'underline' : 'initial'}
            color={activeCategory === category ? 'brand.black' : 'brand.grey'}
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
