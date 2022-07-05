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
        <Box bg="brand.lightBlue">
          <Image src={article.image} layout="fill" alt={article.title} />
        </Box>
      </AspectRatio>
      <Box p={4}>
        <HStack spacing={4} mb={4}>
          {article.categories.map((category) => (
            <Badge
              key={category}
              py={1}
              px={2}
              bg="brand.lightBlue"
              fontWeight="normal"
              textTransform="none"
              color="brand.black"
            >
              {categoriesTranslations[category]}
            </Badge>
          ))}
        </HStack>
        <Heading size={{ base: 'xxs', md: 'xs' }}>{article.title}</Heading>
      </Box>
    </Box>
  );
};
