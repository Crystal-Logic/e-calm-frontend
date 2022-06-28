const path = require('path');

module.exports = {
  i18n: {
    locales: ['ua', 'ru'],
    defaultLocale: 'ua',
    localeDetection: false,
    localePath: path.resolve('./public/locales'),
  },
};
