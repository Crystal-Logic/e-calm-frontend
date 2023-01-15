import { ComponentStyleConfig } from '@chakra-ui/react';

export const Text: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 400,
  },
  sizes: {
    lg: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontWeight: 300,
    },
    md: {
      fontSize: '13px',
      lineHeight: 1.38,
    },
    sm: {
      fontSize: '12px',
      lineHeight: 1.33,
    },
    xs: {
      fontSize: '10px',
      lineHeight: 1.6,
    },
  },
  defaultProps: {
    size: 'lg',
  },
};
