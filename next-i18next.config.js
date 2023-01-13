const path = require('path');

module.exports = {
  i18n: {
    locales: ['uk', 'ru'],
    defaultLocale: 'uk',
    localeDetection: false,
    localePath: path.resolve('./public/locales'),
  },
};
