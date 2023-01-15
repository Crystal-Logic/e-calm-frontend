import type { GetStaticProps, NextPage } from 'next';

import { Container, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Testing: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Heading as="h2" size={{ base: 'md', md: '2xl' }}>
        Тестирование
      </Heading>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!)),
    },
  };
};

export default Testing;
