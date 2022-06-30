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
  Link,
  Text,
  VStack,
  useBoolean,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import ECalmLogo from '../../assets/icons/e-calm-logo.svg';
import TridentIcon from '../../assets/icons/trident.svg';

const Links = [
  { title: 'Корисні статті', url: '/useful-articles' },
  { title: 'Точки зору', url: '/pov' },
  { title: 'Особистий досвід', url: '/experience' },
  { title: 'Тестування на психологічний стан', url: '/testing' },
  { title: 'Контакти', url: '/#contacts' },
  { title: 'Питання та відповіді', url: '/#faq' },
];

const NavLink = ({ title, url, onClick }: { title: string; url: string; onClick?: () => void }) => (
  <Link as="span" onClick={onClick}>
    <NextLink passHref href={url}>
      {title}
    </NextLink>
  </Link>
);

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
            <Text color={locale === l ? 'black' : 'gray.500'}>{localesTitles[l]}</Text>
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

  return (
    <Box position="relative" overflow="hidden">
      <Container>
        <Box
          display={{ base: 'flex', md: 'none' }}
          alignItems="center"
          justifyContent="flex-end"
          py={2}
          mr={-2}
          mb={10}
        >
          <LanguageSwitcher />
          <IconButton
            onClick={setIsOpened.toggle}
            aria-label="open menu"
            variant="ghost"
            size="lg"
            icon={<HamburgerIcon />}
          />
        </Box>

        <Flex
          py={{ base: 0, md: 10 }}
          gap={{ base: 3, md: 8 }}
          wrap={{ base: 'wrap', md: 'nowrap' }}
          mb={{ base: 6, md: 24 }}
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
          <Box flex="none" width={{ base: '64px', md: '80px' }}>
            <ECalmLogo />
          </Box>
          <Box order={{ base: '1', md: '0' }} maxW="600px">
            <Heading mb={4} as="h1" size={{ base: 'md', md: '2xl' }}>
              {t('header.title')}
            </Heading>
            <Heading as="p" size={{ base: 'xxs', md: 'xs' }}>
              {t('header.subTitle')}
            </Heading>
          </Box>
          <Flex ml={{ md: 'auto' }}>
            <Box display={{ base: 'none', md: 'flex' }} mr={8}>
              <LanguageSwitcher />
            </Box>
            <Box flex="none" width={{ base: '64px', md: '80px' }}>
              <TridentIcon />
            </Box>
          </Flex>
        </Flex>

        <Box display={{ base: 'none', md: 'flex' }}>
          <HStack as={'nav'} spacing={6} mb={8}>
            {Links.map((link) => (
              <NavLink key={link.url} url={link.url} title={link.title} />
            ))}
          </HStack>
        </Box>
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
            <Box w="32px">
              <ECalmLogo />
            </Box>
            <DrawerCloseButton size="lg" />
          </DrawerHeader>
          <VStack as="nav" spacing={2} alignItems="flex-start" mt={8} pl={3}>
            {Links.map((link) => (
              <NavLink key={link.url} url={link.url} title={link.title} onClick={setIsOpened.off} />
            ))}
          </VStack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
