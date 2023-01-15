import Image from 'next/image';

import { AspectRatio, Badge, Box, HStack, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { ArticlePreview } from '../../types';

export const ArticleCard = ({ article }: { article: ArticlePreview }) => {
  const { t } = useTranslation('common');
  const categoriesTranslations = t('categories', { returnObjects: true }) as Record<string, string>;

  return (
    <Box boxShadow="lg">
      <AspectRatio ratio={16 / 10}>
        <Box bg="brand.lightBlue">{article.image && <Image fill src={article.image} alt={article.title} />}</Box>
      </AspectRatio>
      <Box p={4}>
        <HStack spacing={4} mb={4}>
          {[...article.categories, ...article.subCategories].map((category) => (
            <Badge key={category}>{categoriesTranslations[category]}</Badge>
          ))}
        </HStack>
        <Heading size={{ base: 'xxs', md: 'xs' }}>{article.title}</Heading>
      </Box>
    </Box>
  );
};
