import slugify from '@sindresorhus/slugify';
import path from 'path';
import { request } from 'undici'

const getSlugForArticle = (article) => slugify(article.title, { customReplacements: [['и', 'y']] });

const addSlugToArticles = (articles) => {
  return articles.map((article) => ({
    ...article,
    slug: getSlugForArticle(article),
  }));
};

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

export const getDynamicPageEntries = async (buildId) => {
  const { body } = await request(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const data = await body.json();
  const articles = addSlugToArticles(data)

  return locales
    .map((locale) =>
      articles.map((article) =>
        getPageEntry(
          buildId,
          {
            route: `/post/${article.slug}`,
            precacheHtml: true,
            precacheJson: true,
          },
          locale,
        ),
      ),
    )
    .flat(2);
};

export const getDynamicPrecacheEntries = async (buildId) => {
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
