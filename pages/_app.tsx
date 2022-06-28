import type { ComponentType } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';

import { Layout } from '../components/Layout';

export type NextPageWithLayout = NextPage & {
  getLayout?: ComponentType<any>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutComponent = Component.getLayout || Layout;
  return (
    <ChakraProvider>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
