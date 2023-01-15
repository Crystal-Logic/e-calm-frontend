import { Fragment } from 'react';

import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import ECalmLogo from '../assets/icons/e-calm-logo.svg';
import TridentIcon from '../assets/icons/trident.svg';

export default function FourOhFour() {
  const { t } = useTranslation('common');

  return (
    <>
      <NextSeo
        title={t('404.title')!}
        openGraph={{
          title: t('404.title')!,
        }}
      />
      <Flex
        h="100vh"
        bgGradient="linear-gradient(90deg, #FFC701 0%, #FFE073 39.06%, #599AFB 73.96%, #066AFF 100%)"
        flexDirection="column"
        justifyContent="center"
      >
        <Container size="md">
          <Flex mb={20} gap={4}>
            <Box w="80px">
              <TridentIcon />
            </Box>
            <Box w="80px">
              <ECalmLogo />
            </Box>
          </Flex>
          <Heading as="h1" mb={10} size="4xl">
            404
          </Heading>
          <Heading mb={2} as="h2" size="2xl">
            {t('404.title')}
          </Heading>
          <Text mb={20}>{t('404.subTitle')}</Text>
          <Link href="/">
            <Button as="span">{t('404.button')}</Button>
          </Link>
        </Container>
      </Flex>
    </>
  );
}

FourOhFour.getLayout = Fragment;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!)),
  },
});
