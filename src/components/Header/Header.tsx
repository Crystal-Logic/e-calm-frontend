import { Fragment } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useBoolean,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import ECalmLogo from '../../assets/icons/e-calm-logo.svg';
import TridentIcon from '../../assets/icons/trident.svg';
import { ArticleCategory, articleSubCategories, navLinks } from '../../types';
import { NavLink } from '../NavLink';

const localesTitles: Record<string, string> = {
  uk: 'УКР',
  ru: 'РУС',
};

const LanguageSwitcher = () => {
  const { locale, locales, asPath } = useRouter();

  return (
    <Flex gap={1} mr={2}>
      {locales!.map((l, i, arr) => (
        <Fragment key={l}>
          <NextLink href={asPath} locale={l}>
            <Text cursor="pointer" color={locale === l ? 'brand.black' : 'brand.grey'}>
              {localesTitles[l]}
            </Text>
          </NextLink>
          {i !== arr.length - 1 && <Text>-</Text>}
        </Fragment>
      ))}
    </Flex>
  );
};

export const Header = () => {
  const [drawerIsOpened, setDrawerIsOpened] = useBoolean();
  const [subNavIsOpened, setSubNavIsOpened] = useBoolean();

  const { t } = useTranslation('common');
  const navLinksTitles = t('navigation', { returnObjects: true }) as Record<(typeof navLinks)[number], string>;
  const categoriesTranslations = t('categories', { returnObjects: true }) as Record<string, string>;

  return (
    <Box position="relative" pb={{ base: 1, md: 8 }}>
      <Box overflow="hidden" position="absolute" w="100%" h="100%" pointerEvents="none">
        <Box
          position="absolute"
          bg="#FFC701"
          w="clamp(250px, 50vw, 600px)"
          h="clamp(250px, 50vw, 600px)"
          left="clamp(-300px, -25vw, -125px)"
          bottom="clamp(-200px, -25vw, -125px)"
          borderRadius="50%"
          sx={{ filter: 'blur(clamp(100px, 20vw, 200px))' }}
          zIndex={-1}
        />
        <Box
          position="absolute"
          bg="#066AFF"
          w="clamp(250px, 50vw, 600px)"
          h="clamp(250px, 50vw, 600px)"
          right="clamp(-300px, -25vw, -125px)"
          top="clamp(-200px, -25vw, -125px)"
          borderRadius="50%"
          sx={{ filter: 'blur(clamp(100px, 20vw, 200px))' }}
          zIndex={-1}
        />
      </Box>
      <Container>
        <Flex alignItems="center" justifyContent="flex-end" py={2} mr={-2} display={{ base: 'flex', md: 'none' }}>
          <LanguageSwitcher />
          <IconButton
            onClick={setDrawerIsOpened.toggle}
            aria-label="open menu"
            variant="unstyled"
            size="lg"
            icon={<HamburgerIcon />}
          />
        </Flex>

        <Flex
          py={{ base: 0, md: 10 }}
          gap={{ base: 3, md: 8 }}
          wrap={{ base: 'wrap', md: 'nowrap' }}
          mb={{ base: 6, md: 24 }}
          alignItems="flex-start"
        >
          <NextLink title="Home page" href="/">
            <Box flex="none" width={{ base: '64px', md: '80px' }} cursor="pointer">
              <ECalmLogo />
            </Box>
          </NextLink>
          <Box order={{ base: '1', md: '0' }} maxW="600px">
            <Heading mb={4} as="h1" size={{ base: 'md', md: '2xl' }}>
              {t('header.title')}
            </Heading>
            <Heading as="p" size={{ base: 'xxs', md: 'xs' }}>
              {t('header.subTitle')}
            </Heading>
          </Box>
          <Flex alignItems="flex-start" ml={{ md: 'auto' }}>
            <Box mr={8} display={{ base: 'none', md: 'flex' }}>
              <LanguageSwitcher />
            </Box>
            <Box flex="none" width={{ base: '64px', md: '80px' }}>
              <TridentIcon />
            </Box>
          </Flex>
        </Flex>

        <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link, index) => (
            <Fragment key={index}>
              {link === `/${ArticleCategory.usefulArticles}` ? (
                <Box onMouseEnter={setSubNavIsOpened.on} onMouseLeave={setSubNavIsOpened.off}>
                  <NavLink url={link} title={navLinksTitles[link]} />
                  <Collapse in={subNavIsOpened}>
                    <Box pt={8} position="absolute" left={0} w="100%" zIndex={1} shadow="md">
                      <Box bg="white" p={8}>
                        <Container>
                          <HStack spacing={8}>
                            {articleSubCategories.map((link) => (
                              <Box key={link} onClick={setSubNavIsOpened.off}>
                                <NavLink url={`/${link}`} title={categoriesTranslations[link]} />
                              </Box>
                            ))}
                          </HStack>
                        </Container>
                      </Box>
                    </Box>
                  </Collapse>
                </Box>
              ) : (
                <NavLink url={link} title={navLinksTitles[link]} />
              )}
            </Fragment>
          ))}
        </HStack>
      </Container>

      <Drawer isOpen={drawerIsOpened} placement="right" onClose={setDrawerIsOpened.off} size="full">
        <DrawerContent>
          <DrawerHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
            pl={4}
            borderBottom="2px"
            borderBottomColor="#F6F6FA"
          >
            <NextLink href="/">
              <Box w="32px" cursor="pointer" onClick={setDrawerIsOpened.off}>
                <ECalmLogo />
              </Box>
            </NextLink>
            <DrawerCloseButton size="lg" />
          </DrawerHeader>
          <VStack as="nav" spacing={2} alignItems="flex-start" mt={8} pl={3}>
            {navLinks.map((link) => (
              <Fragment key={link}>
                <NavLink url={link} title={navLinksTitles[link]} onClick={setDrawerIsOpened.off} />
                {link === `/${ArticleCategory.usefulArticles}` && (
                  <Box alignSelf="stretch">
                    <Flex onClick={setSubNavIsOpened.toggle} alignItems="flex-end">
                      {navLinksTitles[link]}
                      <ChevronDownIcon
                        ml={2}
                        w="22px"
                        h="22px"
                        __css={{
                          transform: subNavIsOpened ? 'rotate(-180deg)' : undefined,
                          transition: 'transform 0.2s',
                          transformOrigin: 'center',
                        }}
                      />
                    </Flex>
                    <Collapse in={subNavIsOpened} animateOpacity>
                      <VStack as="nav" spacing={2} alignItems="flex-start" px={4} py={2}>
                        {articleSubCategories.map((link) => (
                          <NavLink
                            key={link}
                            url={`/${link}`}
                            title={categoriesTranslations[link]}
                            onClick={setDrawerIsOpened.off}
                          />
                        ))}
                      </VStack>
                    </Collapse>
                  </Box>
                )}
              </Fragment>
            ))}
          </VStack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
