import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';

import { Badge, Box, Container, Divider, Flex, Heading, Image, Link, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import FBIcon from '../../assets/icons/fb.svg';
import TelegramIcon from '../../assets/icons/telegram.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import { ArticleService } from '../../services';
import { Article, ArticleCategory, articleCategories } from '../../types';

type PageParams = { category: ArticleCategory; id: string };

type ArticleProps = {
  article: Article;
  otherArticle: Pick<Article, 'id' | 'categories' | 'title'> | null;
  params: PageParams;
};

const ArticlePage: NextPage<ArticleProps> = ({ article, otherArticle, params }) => {
  const { t } = useTranslation('common');
  const categoriesTranslations = t('categories', { returnObjects: true }) as Record<string, string>;

  return (
    <>
      <NextSeo
        title={article.title}
        description={' '}
        openGraph={{ title: article.title, description: ' ', images: [{ url: article.image }] }}
        canonical={`${process.env.NEXT_PUBLIC_APP_URL}/${params.category}/${params.id}`}
      />
      <Container py={{ base: '56px', md: '112px' }}>
        <VStack alignItems="center">
          <Heading
            mb={{ base: 8, md: 12 }}
            textAlign="center"
            maxWidth="1000px"
            size={{ base: 'xl', md: '2xl' }}
            as="h2"
          >
            {article.title}
          </Heading>
        </VStack>
        <Image mb={{ base: 8, md: 12 }} src={article.image} alt="image" width="full" height="auto" />
        <Flex flexDirection={{ base: 'column', md: 'row' }} width="full" gap={{ base: 12, md: 4, lg: 8 }}>
          <Box display={{ base: 'none', md: 'block' }} flex={2} />
          <Flex flexDirection="column" flex={7}>
            <Box px={2} className="wysiwyg" dangerouslySetInnerHTML={{ __html: article.body }} />
          </Flex>
          <Box minWidth="200px" flex={2}>
            <Box mb={10}>
              <Heading size="xs" mb={5}>
                {t('article.shareTitle')}
              </Heading>
              <Flex gap={4}>
                <Box cursor="pointer" flex="none" width="36px">
                  <FBIcon />
                </Box>
                <Box cursor="pointer" flex="none" width="36px">
                  <TelegramIcon />
                </Box>
                <Box cursor="pointer" flex="none" width="36px">
                  <TwitterIcon />
                </Box>
              </Flex>
            </Box>
            {otherArticle && (
              <Box>
                <Heading size="sm">{t('article.otherArticles')}</Heading>
                <Divider opacity={1} borderColor="black" borderBottomWidth={2} mt={6} mb={4} />
                <Flex gap={2} mb={2}>
                  {otherArticle.categories.map((cat) => (
                    <NextLink key={cat} passHref href={`/${cat}`}>
                      <a>
                        <Badge>{categoriesTranslations[cat]}</Badge>
                      </a>
                    </NextLink>
                  ))}
                </Flex>
                <NextLink passHref href={`/${otherArticle.categories[0]}/${otherArticle.id}`}>
                  <Link>{otherArticle.title}</Link>
                </NextLink>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const articlesByCategory = await ArticleService.getArticlesByCategory();

  return {
    paths: locales!
      .map((locale: string) =>
        articleCategories
          .filter((cat) => cat !== ArticleCategory.all)
          .map((category) =>
            articlesByCategory[category].map((article) => ({
              params: { category, id: String(article.id) },
              locale,
            })),
          )
          .flat(),
      )
      .flat(),
    fallback: 'blocking', // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<ArticleProps, PageParams> = async ({ locale, params }) => {
  const articles = await ArticleService.getAllArticles();
  const article = articles.find(
    (article) => String(article.id) === params?.id && article.categories.includes(params?.category),
  );
  const otherArticles = articles.filter((art) => String(art.id) !== params?.id);
  const randomIndex = Math.floor(Math.random() * otherArticles.length);
  const otherArticle = otherArticles[randomIndex];

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
      otherArticle: otherArticle
        ? {
            title: otherArticle.title,
            categories: otherArticle.categories,
            id: otherArticle.id,
          }
        : null,
      params: params!,
      ...(await serverSideTranslations(locale!)),
    },
  };
};

export default ArticlePage;
