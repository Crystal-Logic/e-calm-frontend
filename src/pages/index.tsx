import type { GetStaticProps, NextPage } from 'next';

import { Box, Button, Container, Flex, Heading, Hide, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import field from '../assets/field.webp';
import hands from '../assets/hands.webp';
import ECalmLogoWhite from '../assets/icons/e-calm-logo-white.svg';
import TridentIcon from '../assets/icons/trident.svg';
import { Contacts } from '../components/Contacts';
import { FAQ } from '../components/FAQ';
import { FormModalRef, FormModalState } from '../components/FormModal';
import { HomeArticles } from '../components/HomeArticles';
import { ArticleService } from '../services/article';
import { ArticleCategory, ArticlesPreviewByCategory, ContactFormVariant, articleCategories } from '../types';

type HomeProps = {
  categoriesInfo: Record<ArticleCategory, number>;
  articles: ArticlesPreviewByCategory;
};

const Home: NextPage<HomeProps> = ({ categoriesInfo, articles }) => {
  const { t } = useTranslation('common');

  return (
    <Box>
      <Box
        backgroundImage={`url(${hands.src})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        color="white"
      >
        <Container size="md" py={{ base: 20, md: 28 }}>
          <Heading as="h2" maxW="800px" size={{ base: 'md', md: '2xl' }}>
            {t('formsSection.title')}
          </Heading>
          <Flex gap={{ base: 4, md: 6 }} mt={12} flexWrap="wrap">
            <Button
              variant="solidWhite"
              size={{ base: 'md', md: 'lg' }}
              onClick={() => FormModalRef.current?.set(FormModalState.patient, { type: ContactFormVariant.patient })}
            >
              {t('formsSection.getHelp')}
            </Button>
            <Button
              variant="outlineWhite"
              size={{ base: 'md', md: 'lg' }}
              onClick={() =>
                FormModalRef.current?.set(FormModalState.psychologist, { type: ContactFormVariant.psychologist })
              }
            >
              {t('formsSection.becomePsychologist')}
            </Button>
          </Flex>
        </Container>
      </Box>

      <Box bg="#F6F6FA">
        <Container py={{ base: 16, md: 16 }}>
          <Flex direction={{ base: 'column', md: 'row' }} mb={12} gap={8}>
            <Heading as="h2" flex={1} size={{ base: 'md', md: '2xl' }}>
              {t('justBetweenUsSection.title')}
            </Heading>
            <Box flex={1}>
              <Text mb={4}>{t('justBetweenUsSection.subTitle')}</Text>
              <Text>
                {t('justBetweenUsSection.additional')}{' '}
                <Link href="#contacts" textDecoration="underline">
                  {t('justBetweenUsSection.additionalLink')}
                </Link>
              </Text>
            </Box>
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            <Box
              flex={1}
              borderRadius="20px"
              bg="rgba(255, 255, 255, 0.41)"
              sx={{ backdropFilter: 'blur(80px)' }}
              px={{ base: 4, md: 8 }}
              py={{ base: 8, md: 12 }}
            >
              <Heading as="h3" mb={8} flex={1} size="md">
                {t('justBetweenUsSection.phone.title')}
              </Heading>
              <Text mb={4}>{t('justBetweenUsSection.phone.subTitle')}</Text>
              <Button size={{ base: 'md', md: 'lg' }}>{t('justBetweenUsSection.phone.button')}</Button>
            </Box>
            <Box
              flex={1}
              borderRadius="20px"
              bg="rgba(255, 255, 255, 0.41)"
              sx={{ backdropFilter: 'blur(80px)' }}
              px={{ base: 4, md: 8 }}
              py={{ base: 8, md: 12 }}
            >
              <Heading as="h3" mb={8} flex={1} size="md">
                {t('justBetweenUsSection.chat.title')}
              </Heading>
              <Text mb={4}>{t('justBetweenUsSection.chat.subTitle')}</Text>
              <Button size={{ base: 'md', md: 'lg' }}>{t('justBetweenUsSection.chat.button')}</Button>
            </Box>
          </Flex>
        </Container>
      </Box>

      <HomeArticles articles={articles} categoriesInfo={categoriesInfo} />

      <Contacts />

      <Box
        backgroundImage={`url(${field.src})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        color="white"
      >
        <Container py={{ base: 12, md: 28 }}>
          <Hide below="md">
            <Flex gap={8} mb={12}>
              <Box flex="none" width="80px">
                <ECalmLogoWhite />
              </Box>
              <Box flex="none" width="80px">
                <TridentIcon />
              </Box>
            </Flex>
          </Hide>
          <Heading as="h2" size={{ base: 'md', md: '2xl' }}>
            {t('formsSection.secondTitle')}
          </Heading>
          <Flex gap={{ base: 4, md: 6 }} mt={{ base: 8, md: 12 }} flexWrap="wrap">
            <Button
              variant="solidWhite"
              size={{ base: 'md', md: 'lg' }}
              onClick={() => FormModalRef.current?.set(FormModalState.patient, { type: ContactFormVariant.patient })}
            >
              {t('formsSection.getHelp')}
            </Button>
            <Button
              variant="outlineWhite"
              size={{ base: 'md', md: 'lg' }}
              onClick={() =>
                FormModalRef.current?.set(FormModalState.psychologist, { type: ContactFormVariant.psychologist })
              }
            >
              {t('formsSection.becomePsychologist')}
            </Button>
          </Flex>
        </Container>
      </Box>

      <FAQ />
    </Box>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const articlesListByCategory = await ArticleService.getArticlesListByCategory();
  const categoriesInfo = ArticleService.getCategoriesInfo(articlesListByCategory);

  return {
    props: {
      articles: articleCategories.reduce(
        (acc, category) => Object.assign(acc, { [category]: articlesListByCategory[category].slice(0, 3) }),
        {} as ArticlesPreviewByCategory,
      ),
      categoriesInfo,
      ...(await serverSideTranslations(locale!)),
    },
  };
};

export default Home;
