import type { ComponentType } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';

import { Layout } from '../components/Layout';
import { Fonts, theme } from '../theme';

export type NextPageWithLayout = NextPage & {
  getLayout?: ComponentType<any>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { t } = useTranslation('common');

  const LayoutComponent = Component.getLayout || Layout;
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        title={t('header.title')}
        description={t('header.subTitle')}
        openGraph={{
          type: 'website',
          title: t('header.title'),
          description: t('header.subTitle'),
          url: process.env.NEXT_PUBLIC_APP_URL,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/og_logo.jpg`,
              width: 1200,
              height: 630,
              alt: t('header.title'),
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Fonts />
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
