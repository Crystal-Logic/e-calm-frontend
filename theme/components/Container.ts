import { ComponentStyleConfig } from '@chakra-ui/react';

export const Container: ComponentStyleConfig = {
  sizes: {
    lg: {
      maxWidth: '1440px',
    },
    md: {
      maxWidth: '1280px',
    },
    sm: {
      maxWidth: '960px',
    },
  },
  defaultProps: {
    size: 'lg',
  },
};
