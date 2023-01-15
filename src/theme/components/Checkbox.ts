export const Checkbox = {
  baseStyle: {
    control: {
      borderRadius: 0,

      _disabled: {
        bg: 'none',
        color: 'brand.lightGrey',
        borderColor: 'brand.lightGrey',
      },

      _checked: {
        _disabled: {
          bg: 'none',
          color: 'brand.lightGrey',
          borderColor: 'brand.lightGrey',
        },
      },
    },
    label: {
      _invalid: {
        color: 'red.500',
      },

      _disabled: {
        opacity: 1,
        color: 'brand.lightGrey',
      },
    },
  },
  sizes: {
    md: {
      control: {
        w: 5,
        h: 5,
      },
      label: {
        fontSize: '11px',
        lineHeight: '14px',
      },
    },
    lg: {
      control: {
        w: 6,
        h: 6,
      },
      label: {
        fontSize: '13px',
        lineHeight: '16px',
      },
      icon: {
        fontSize: '0.75rem',
      },
    },
  },
  variants: {
    white: {
      control: {
        borderColor: 'brand.white',

        _checked: {
          bg: 'none',
          borderColor: 'brand.white',

          _hover: {
            bg: 'none',
            borderColor: 'brand.white',
          },
        },
      },
    },
    black: {
      control: {
        borderColor: 'brand.black',
        color: 'brand.black',

        _checked: {
          color: 'brand.black',
          bg: 'none',
          borderColor: 'brand.black',

          _hover: {
            bg: 'none',
            borderColor: 'brand.black',
          },
        },
      },
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'black',
  },
};
