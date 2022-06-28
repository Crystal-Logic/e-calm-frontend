import { Fragment } from 'react';

import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ECalmLogo from '../assets/icons/e-calm-logo.svg';
import TridentIcon from '../assets/icons/trident.svg';

export default function FourOhFour() {
  const { t } = useTranslation('common');

  return (
    <Flex
      h="100vh"
      bgGradient="linear-gradient(90deg, #FFC701 0%, #FFE073 39.06%, #599AFB 73.96%, #066AFF 100%)"
      flexDirection="column"
      justifyContent="center"
    >
      <Container>
        <Flex gap={4}>
          <Box w="80px">
            <TridentIcon />
          </Box>
          <Box w="80px">
            <ECalmLogo />
          </Box>
        </Flex>
        <Heading as="h1" fontSize="100">
          404
        </Heading>
        <Heading as="h2">{t('404.title')}</Heading>
        <Text>{t('404.subTitle')}</Text>
        <Link href="/" passHref>
          <Button as="a" href="/" size="lg" mt={8}>
            {t('404.button')}
          </Button>
        </Link>
      </Container>
    </Flex>
  );
}

FourOhFour.getLayout = Fragment;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!)),
  },
});
