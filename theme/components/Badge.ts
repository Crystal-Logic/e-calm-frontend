import { ComponentStyleConfig } from '@chakra-ui/react';

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 400,
    textTransform: 'none',
    px: 2,
    py: 1,
    borderRadius: 'xl',
  },
  defaultProps: {
    variant: 'subtle',
  },
};
