export const Checkbox = {
  baseStyle: {
    control: {
      borderRadius: '0',
      _checked: {
        bg: 'none',
        borderColor: 'brand.white',
        _hover: {
          bg: 'none',
          borderColor: 'brand.white',
        },
        _disabled: {
          bg: 'none',
          color: 'brand.lightGrey',
          borderColor: 'brand.lightGrey',
        },
      },
      _invalid: {
        bg: 'none',
        borderColor: 'red.500',
      },
    },
    label: {
      _invalid: {
        color: 'red.500',
      },
    },
  },
  sizes: {
    md: {
      control: {
        w: '20px',
        h: '20px',
      },
      label: {
        fontSize: '11px',
        lineHeight: '14px',
      },
      icon: {
        fontSize: '0.65rem',
      },
    },
    lg: {
      control: {
        w: '24px',
        h: '24px',
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
  defaultProps: {
    size: 'lg',
  },
};
