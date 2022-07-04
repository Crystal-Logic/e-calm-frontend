import { extendTheme } from '@chakra-ui/react';

import { brand } from './colors';
import { Button } from './components/Button';
import { Checkbox } from './components/Checkbox';
import { Container } from './components/Container';
import { FormError } from './components/FormError';
import { Heading } from './components/Heading';
import { Input } from './components/Input';
import { Text } from './components/Text';
import { Fonts } from './fonts';

const font =
  '"e-Ukraine", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
    },
  },
  colors: {
    brand,
  },
  fonts: {
    heading: font,
    body: font,
  },
  components: {
    FormError,
    Button,
    Checkbox,
    Container,
    Heading,
    Input,
    Text,
  },
});

export { Fonts };
