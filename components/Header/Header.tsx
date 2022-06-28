import NextLink from 'next/link';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
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
  <Box px={2} py={1} onClick={onClick}>
    <NextLink passHref href={url}>
      {title}
    </NextLink>
  </Box>
);

export const Header = () => {
  const [isOpened, setIsOpened] = useBoolean();

  return (
    <Box position="relative" sx={{ overflow: 'hidden' }}>
      <Box display={{ base: 'flex', md: 'none' }} justifyContent="flex-end" py={1} px={2}>
        <IconButton
          onClick={setIsOpened.toggle}
          aria-label="open menu"
          variant="ghost"
          size="lg"
          icon={<HamburgerIcon />}
        />
      </Box>
      <Flex
        p={{ base: 4, md: 8 }}
        pt={{ base: 0, md: 8 }}
        gap={4}
        wrap={{ base: 'wrap', md: 'nowrap' }}
        mb={{ base: 0, md: 8 }}
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
        <Box order={{ base: '1', md: '0' }} maxW="540px">
          <Heading as="h1" size={{ xs: 'md', md: 'lg', lg: 'xl' }}>
            Дистанційна професійна психологічна допомога
          </Heading>
          <Text fontSize={{ xs: 'md', md: 'lg', lg: 'xl' }}>
            Безкоштовний, дистанційний онлайн-сервіс для українських родин, які потребують психологічної допомоги.
          </Text>
        </Box>
        <Box flex="none" width={{ base: '64px', md: '80px' }} ml={{ md: 'auto' }}>
          <TridentIcon />
        </Box>
      </Flex>

      <Box display={{ base: 'none', md: 'flex' }} px={[4, 8]}>
        <HStack as={'nav'} spacing={4} mb={2}>
          {Links.map((link) => (
            <NavLink key={link.url} url={link.url} title={link.title} />
          ))}
        </HStack>
      </Box>

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
