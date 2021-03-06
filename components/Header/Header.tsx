import { Fragment } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
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
import { navLinks } from '../../types';
import { NavLink } from '../NavLink';

const localesTitles: Record<string, string> = {
  ua: 'УКР',
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
  const [isOpened, setIsOpened] = useBoolean();

  const { t } = useTranslation('common');
  const navLinksTitles = t('navigation', { returnObjects: true }) as Record<typeof navLinks[number], string>;

  return (
    <Box position="relative" overflow="hidden">
      <Container>
        <Flex alignItems="center" justifyContent="flex-end" py={2} mr={-2} display={{ base: 'flex', md: 'none' }}>
          <LanguageSwitcher />
          <IconButton
            onClick={setIsOpened.toggle}
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
          <NextLink href="/" passHref>
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

        <HStack as="nav" spacing={6} mb={8} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <NavLink key={link} url={link} title={navLinksTitles[link]} />
          ))}
        </HStack>
      </Container>

      <Drawer isOpen={isOpened} placement="right" onClose={setIsOpened.off} size="full">
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
            <NextLink href="/" passHref>
              <Box w="32px" cursor="pointer" onClick={setIsOpened.off}>
                <ECalmLogo />
              </Box>
            </NextLink>
            <DrawerCloseButton size="lg" />
          </DrawerHeader>
          <VStack as="nav" spacing={2} alignItems="flex-start" mt={8} pl={3}>
            {navLinks.map((link) => (
              <NavLink key={link} url={link} title={navLinksTitles[link]} onClick={setIsOpened.off} />
            ))}
          </VStack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
