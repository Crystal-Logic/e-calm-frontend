const path = require('path');
const axios = require('axios');

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const locales = ['uk', 'ru'];
const defaultLocale = 'uk';
const articleCategories = ['articles', 'useful-articles', 'help-for-children', 'family-relationships', 'mental-health'];

const pages = articleCategories.map((category) => ({
  route: `/${category}`,
  precacheHtml: true,
  precacheJson: true,
}));

const getJSONEntry = (buildId, pageRoute) => ({
  url: path.posix.join('/_next/data/', buildId, `${pageRoute}.json`),
  revision: null,
});

const getHTMLEntry = (buildId, pageRoute) => ({ url: pageRoute, revision: buildId });

const getPageEntry = (buildId, page, locale) => {
  let entries = [];
  if (page.precacheHtml) {
    entries.push(getHTMLEntry(buildId, `${locale !== defaultLocale ? `/${locale}` : ''}${page.route}`));
  }
  if (page.precacheJson) {
    entries.push(getJSONEntry(buildId, `/${locale}${page.route}`));
  }
  return entries;
};

const getDynamicPageEntries = async (buildId) => {
  const articles = await api.get('/posts').then((res) => res.data);

  const articlesByCategory = {
    [articleCategories[0]]: articles.map((article) => article.id),
    [articleCategories[1]]: [],
    [articleCategories[2]]: [],
    [articleCategories[3]]: [],
    [articleCategories[4]]: [],
  };

  articles.forEach((article) => {
    article.categories.forEach((category) => {
      articlesByCategory[category].push(article.id);
    });
  });

  return locales
    .map((locale) =>
      articleCategories
        .filter((cat) => cat !== 'articles')
        .map((category) =>
          articlesByCategory[category].map((id) =>
            getPageEntry(
              buildId,
              {
                route: `/${category}/${id}`,
                precacheHtml: true,
                precacheJson: true,
              },
              locale,
            ),
          ),
        ),
    )
    .flat(3);
};

const getDynamicPrecacheEntries = async (buildId) => {
  if (typeof buildId !== 'string') {
    console.error('getGeneratedPrecacheEntries: buildId should be a string', buildId);
    return;
  } else if (buildId === '') {
    console.error('getGeneratedPrecacheEntries: buildId cannot be an empty string');
    return;
  }

  const staticPages = locales.map((locale) => pages.map((page) => getPageEntry(buildId, page, locale))).flat(2);
  const dynamicPages = await getDynamicPageEntries(buildId);

  return staticPages.concat(dynamicPages);
};

module.exports = getDynamicPrecacheEntries;
