import { GetStaticProps } from 'next';

import { Container, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Offline() {
  const { t } = useTranslation('common');
  return (
    <Container size="md" py={4}>
      <Heading as="h1">{t('offlineMessage')}</Heading>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!)),
    },
  };
};
