import { PropsWithChildren } from 'react';
import React from 'react';

import { Footer } from '../Footer';
import { FormModal } from '../FormModal';
import { Header } from '../Header';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FormModal />
    </>
  );
};
