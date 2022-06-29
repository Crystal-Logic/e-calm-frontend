import { ComponentStyleConfig } from '@chakra-ui/react';

export const Heading: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 400,
  },
  sizes: {
    '4xl': {
      fontSize: '100px',
      lineHeight: 1,
    },
    '3xl': {
      fontSize: '56px',
      lineHeight: 1.075,
    },
    '2xl': {
      fontSize: '38px',
      lineHeight: 1.05,
    },
    xl: {
      fontSize: '28px',
      lineHeight: 1.15,
    },
    lg: {
      fontSize: '24px',
      lineHeight: 1.15,
    },
    md: {
      fontSize: '20px',
      lineHeight: 1.2,
    },
    sm: {
      fontSize: '18px',
      lineHeight: 1.5,
    },
    xs: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
  },
  defaultProps: {
    size: '2xl',
  },
};
