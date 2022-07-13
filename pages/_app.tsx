import type { ComponentType } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

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
      <Head>
        <meta name="application-name" content="ЄCпокій" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ЄCпокій" />
        <meta name="description" content="Some description" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />

        <link rel="icon" type="image/png" sizes="48x48" href="/icons/icon-48x48.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
