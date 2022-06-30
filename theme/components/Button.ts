import { ComponentStyleConfig } from '@chakra-ui/react';

const baseCustomButton = {
  borderRadius: '40px',
  borderWidth: '2px',
  borderStyle: 'solid',
  fontWeight: 400,
  letterSpacing: '-0.02em',
};

export const Button: ComponentStyleConfig = {
  variants: {
    solidBlack: {
      ...baseCustomButton,
      bg: 'brand.black',
      borderColor: 'brand.black',
      color: 'brand.white',

      _active: {
        bg: 'brand.white',
        borderColor: 'brand.black',
        color: 'brand.black',
      },
      _disabled: {
        bg: 'brand.lightGrey',
        borderColor: 'brand.lightGrey',
        color: 'brand.white',
        opacity: 1,
      },
      _hover: {
        _disabled: {
          bg: 'brand.lightGrey',
          borderColor: 'brand.lightGrey',
          color: 'brand.white',
        },
      },
    },
    solidWhite: {
      ...baseCustomButton,
      bg: 'brand.white',
      borderColor: 'brand.white',
      color: 'brand.black',
      _active: {
        bg: 'brand.black',
        color: 'brand.white',
        borderColor: 'brand.white',
      },
      _disabled: {
        color: 'brand.white',
        bg: 'brand.lightGrey',
        opacity: 1,
        borderColor: 'brand.lightGrey',
      },
      _hover: {
        _disabled: {
          color: 'brand.white',
          bg: 'brand.lightGrey',
          borderColor: 'brand.lightGrey',
        },
      },
    },
    outlineWhite: {
      ...baseCustomButton,
      color: 'brand.white',
      bg: 'transparent',
      borderColor: 'brand.white',
      _active: {
        bg: 'brand.white',
        color: 'brand.black',
        borderColor: 'brand.white',
      },
      _disabled: {
        color: 'brand.lightGrey',
        bg: 'transparent',
        opacity: 1,
        borderColor: 'brand.lightGrey',
      },
      _hover: {
        _disabled: {
          color: 'brand.lightGrey',
          bg: 'transparent',
          borderColor: 'brand.lightGrey',
        },
      },
    },
    outlineBlack: {
      ...baseCustomButton,
      color: 'brand.black',
      bg: 'transparent',
      borderColor: 'brand.black',
      _active: {
        bg: 'brand.black',
        color: 'brand.white',
        borderColor: 'brand.black',
      },
      _disabled: {
        color: 'brand.lightGrey',
        bg: 'transparent',
        opacity: 1,
        borderColor: 'brand.lightGrey',
      },
      _hover: {
        _disabled: {
          color: 'brand.lightGrey',
          bg: 'transparent',
          borderColor: 'brand.lightGrey',
        },
      },
    },
  },
  sizes: {
    lg: {
      height: '56px',
      padding: '0 40px',
      fontSize: '16px',
      lineHeight: '24px',
    },
    md: {
      height: '48px',
      padding: '0 34px',
      fontSize: '14px',
      lineHeight: '20px',
    },
    sm: {
      height: '40px',
      padding: '0 28px',
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'solidBlack',
  },
};
