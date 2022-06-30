import { extendTheme } from '@chakra-ui/react';

import { Container } from './components/Container';
import { Heading } from './components/Heading';
import { Text } from './components/Text';
import { Fonts } from './fonts';

const font =
  '"e-Ukraine", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';

const fonts = {
  heading: font,
  body: font,
};

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
    },
  },
  fonts,
  components: {
    Container,
    Heading,
    Text,
  },
});

export { Fonts };
