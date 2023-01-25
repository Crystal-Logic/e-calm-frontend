import Image from 'next/image';

import { AspectRatio, Badge, Box, Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { ArticlePreview } from '@/types';

export const ArticleCard = ({ article }: { article: ArticlePreview }) => {
  const { t } = useTranslation('common');
  const categoriesTranslations = t('categories', { returnObjects: true }) as Record<string, string>;

  return (
    <Box boxShadow="lg" h="full">
      <AspectRatio ratio={16 / 10}>
        <Box bg="brand.lightBlue">
          {article.image && <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />}
        </Box>
      </AspectRatio>
      <Box p={4}>
        <Flex wrap="wrap" gap={3} mb={4}>
          {[...article.categories, ...article.sub_categories].map((category) => (
            <Badge key={category}>{categoriesTranslations[category]}</Badge>
          ))}
        </Flex>
        <Heading size={{ base: 'xxs', md: 'xs' }}>{article.title}</Heading>
      </Box>
    </Box>
  );
};
