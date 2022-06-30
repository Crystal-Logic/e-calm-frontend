import { Box, Container, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import ECalmLogoWhite from '../../assets/icons/e-calm-logo-white.svg';
import FBIcon from '../../assets/icons/fb.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import TelegramIcon from '../../assets/icons/telegram.svg';
import TridentIcon from '../../assets/icons/trident.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import { NavLinks } from '../../utils/navLinks';
import { NavLink } from '../NavLink';

export const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <Box bg="brand.black" color="brand.white">
      <Container py={{ base: 8, md: 16 }}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          <Box flex={1}>
            <Heading size="sm">Звернутись за допомогою</Heading>
            <div>form here</div>
          </Box>
          <Divider display={{ base: 'block', md: 'none' }} />
          <Box flex={1}>
            <Heading size="sm">{t('footer.linksTitle')}</Heading>
            <VStack as="nav" spacing={2} alignItems="flex-start" mt={8}>
              {NavLinks.map((link) => (
                <NavLink key={link.url} url={link.url} title={link.title} />
              ))}
            </VStack>
          </Box>
        </Flex>
        <Divider my={8} />
        <Flex direction={{ base: 'column-reverse', md: 'row' }} gap={8}>
          <Box flex={1}>
            <Flex gap={4} alignItems="center">
              <Box flex="none" width="48px">
                <TridentIcon />
              </Box>
              <Box flex="none" width="48px">
                <ECalmLogoWhite />
              </Box>
              <Box>
                <Text size="sm">espokiy.com</Text>
                <Text size="sm">{`${new Date().getFullYear()}. ${t('footer.allRights')}`}</Text>
              </Box>
            </Flex>
          </Box>
          <Box flex={1}>
            <Heading size="xs" mb={2}>
              {t('footer.shareTitle')}
            </Heading>
            <Flex gap={3}>
              <Box flex="none" width="36px">
                <FBIcon />
              </Box>
              <Box flex="none" width="36px">
                <InstagramIcon />
              </Box>
              <Box flex="none" width="36px">
                <TelegramIcon />
              </Box>
              <Box flex="none" width="36px">
                <TwitterIcon />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
