import { Fragment } from 'react';

import Link from 'next/link';

import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';

import ECalmLogo from '../assets/icons/e-calm-logo.svg';
import TridentIcon from '../assets/icons/trident.svg';

export default function FourOhFour() {
  return (
    <Flex
      h="100vh"
      bgGradient="linear-gradient(90deg, #FFC701 0%, #FFE073 39.06%, #599AFB 73.96%, #066AFF 100%)"
      flexDirection="column"
      justifyContent="center"
    >
      <Container>
        <Flex gap={4}>
          <Box w="80px">
            <TridentIcon />
          </Box>
          <Box w="80px">
            <ECalmLogo />
          </Box>
        </Flex>
        <Heading as="h1" fontSize="100">
          404
        </Heading>
        <Heading as="h2">Такої сторінки не існує</Heading>
        <Text>Схоже, це неправильна адреса, або сторінка переїхала</Text>
        <Link href="/" passHref>
          <Button as="a" href="/" size="lg" mt={8}>
            На головну
          </Button>
        </Link>
      </Container>
    </Flex>
  );
}

FourOhFour.getLayout = Fragment;
