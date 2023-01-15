const variantFlushed = (color: 'brand.white' | 'brand.black') => ({
  field: {
    borderBottom: '2px solid',
    borderColor: color,
    borderRadius: 0,
    px: 0,
    bg: 'transparent',
    _placeholder: {
      color: 'brand.lightGrey',
    },
    _readOnly: {
      boxShadow: 'none !important',
      userSelect: 'all',
    },
    _invalid: {
      borderColor: 'red.500',
      boxShadow: `0px 1px 0px 0px red.500`,
    },
    _focusVisible: {
      borderColor: 'blue.500',
      boxShadow: `0px 1px 0px 0px blue.500}`,
    },
  },
  addon: {
    borderBottom: '2px solid',
    borderColor: 'inherit',
    borderRadius: 0,
    px: 0,
    bg: 'transparent',
  },
});

export const Input = {
  baseStyle: {
    field: {
      fontWeight: 300,
      letterSpacing: '-0.02em',
    },
  },
  variants: {
    flushedWhite: variantFlushed('brand.white'),
    flushedBlack: variantFlushed('brand.black'),
  },
  defaultProps: {
    size: 'md',
    variant: 'flushedBlack',
  },
};
