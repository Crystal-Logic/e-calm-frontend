import { extendTheme } from '@chakra-ui/react';

import { brand } from './colors';
import { Badge } from './components/Badge';
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
    global: ({ theme }: any) => ({
      html: {
        scrollBehavior: 'smooth',

        '.wysiwyg': {
          color: '#000',

          'p, ul, ol, pre, h1, h2, h3, h4, h5, h6': {
            marginBottom: '1em',
            letterSpacing: '-0.02em',
          },
          'h1, h2, h3, h4, h5, h6': {
            marginTop: '1em',
          },
          'p, a': {
            fontWeight: 400,
            fontSize: 18,
            lineHeight: '28px',
          },
          a: {
            textDecoration: 'underline',
          },
          'ul, ol': {
            paddingLeft: '1.7rem',
          },
          h1: {
            fontSize: 56,
            lineHeight: '64px',
          },
          h2: {
            fontSize: 38,
            lineHeight: '40px',
          },
          h3: {
            fontSize: 28,
            lineHeight: '32px',
          },
          h4: {
            fontSize: 24,
            lineHeight: '32px',
          },
          h5: {
            fontSize: 20,
            lineHeight: '24px',
          },
          h6: {
            fontSize: 18,
            lineHeight: '24px',
          },
          pre: {
            whiteSpace: 'pre-wrap',
          },

          ['@media screen and (max-width: ' + theme.breakpoints.sm + ')']: {
            'p, a': {
              fontSize: 14,
              lineHeight: '18px',
            },
            h1: {
              fontSize: 26,
              lineHeight: '28px',
            },
            h2: {
              fontSize: 20,
              lineHeight: '24px',
            },
            h3: {
              fontSize: 18,
              lineHeight: '24px',
            },
            h4: {
              fontSize: 16,
              lineHeight: '24px',
            },
            h5: {
              fontSize: 14,
              lineHeight: '24px',
            },
            h6: {
              fontSize: 13,
              lineHeight: '24px',
            },
          },
        },
      },
    }),
  },
  colors: {
    brand,
  },
  fonts: {
    heading: font,
    body: font,
  },
  components: {
    Badge,
    Button,
    Checkbox,
    Container,
    FormError,
    Heading,
    Input,
    Text,
  },
});

export { Fonts };
