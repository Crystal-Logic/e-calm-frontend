import type { GetStaticProps, NextPage } from 'next';

import { Box, Button, Container, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import field from '../assets/field.jpg';
import hands from '../assets/hands.jpg';
import ECalmLogoWhite from '../assets/icons/e-calm-logo-white.svg';
import TridentIcon from '../assets/icons/trident.svg';
import { FAQ } from '../components/FAQ';

type Contact = {
  title: string;
  subTitle?: string;
  phones: string[];
};

const ContactItem = ({ title, subTitle, phones }: Contact) => (
  <Box key={title}>
    <Heading as="h3" maxWidth={400} mb={5} flex={1} size={{ base: 'sm', md: 'lg' }}>
      {title}
    </Heading>
    {subTitle && (
      <Text size={{ base: 'md', md: 'lg' }} mb={5}>
        {subTitle}
      </Text>
    )}
    {phones.map((phone, index) => (
      <Link display="block" mb={2} key={index} href={`tel:${phone}`}>
        <Heading as="span" size={{ base: 'xs', md: 'sm' }}>
          {phone}
        </Heading>
      </Link>
    ))}
  </Box>
);

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <Box>
      <Box
        backgroundImage={`url(${hands.src})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        color="white"
      >
        <Container size="md" py={{ base: 20, md: 28 }}>
          <Heading as="h2" maxW="800px" size={{ base: 'md', md: '2xl' }}>
            {t('formsSection.title')}
          </Heading>
          <Flex gap={{ base: 4, md: 6 }} mt={12} flexWrap="wrap">
            <Button color="black" size={{ base: 'md', md: 'lg' }}>
              {t('formsSection.getHelp')}
            </Button>
            <Button variant="outline" size={{ base: 'md', md: 'lg' }}>
              {t('formsSection.becomePsychologist')}
            </Button>
          </Flex>
        </Container>
      </Box>

      <Box bg="#F6F6FA">
        <Container py={{ base: 16, md: 16 }}>
          <Flex direction={{ base: 'column', md: 'row' }} mb={12} gap={8}>
            <Heading as="h2" flex={1} size={{ base: 'md', md: '2xl' }}>
              {t('justBetweenUsSection.title')}
            </Heading>
            <Box flex={1}>
              <Text mb={4}>{t('justBetweenUsSection.subTitle')}</Text>
              <Text>
                {t('justBetweenUsSection.additional')}{' '}
                <Link href="#contacts" textDecoration="underline">
                  {t('justBetweenUsSection.additionalLink')}
                </Link>
              </Text>
            </Box>
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            <Box
              flex={1}
              borderRadius="20px"
              bg="rgba(255, 255, 255, 0.41)"
              sx={{ backdropFilter: 'blur(80px)' }}
              px={{ base: 4, md: 8 }}
              py={{ base: 8, md: 12 }}
            >
              <Heading as="h3" mb={8} flex={1} size="md">
                {t('justBetweenUsSection.phone.title')}
              </Heading>
              <Text mb={4}>{t('justBetweenUsSection.phone.subTitle')}</Text>
              <Button size={{ base: 'md', md: 'lg' }}>{t('justBetweenUsSection.phone.button')}</Button>
            </Box>
            <Box
              flex={1}
              borderRadius="20px"
              bg="rgba(255, 255, 255, 0.41)"
              sx={{ backdropFilter: 'blur(80px)' }}
              px={{ base: 4, md: 8 }}
              py={{ base: 8, md: 12 }}
            >
              <Heading as="h3" mb={8} flex={1} size="md">
                {t('justBetweenUsSection.chat.title')}
              </Heading>
              <Text mb={4}>{t('justBetweenUsSection.chat.subTitle')}</Text>
              <Button size={{ base: 'md', md: 'lg' }}>{t('justBetweenUsSection.chat.button')}</Button>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container py={{ base: 16, md: 16 }}>
        <Heading as="h2" size={{ base: 'md', md: '2xl' }}>
          Статті психологів
        </Heading>
      </Container>

      <Box bg="#F6F6FA">
        <Container py={{ base: 16, md: 16 }}>
          <Heading as="h2" mb={12} size={{ base: 'md', md: '2xl' }}>
            {t('contacts.title')}
          </Heading>
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            <Flex
              flex={1}
              borderRadius="20px"
              bg="rgba(255, 255, 255, 0.41)"
              px={{ base: 4, md: 8 }}
              py={{ base: 8, md: 12 }}
              gap={{ base: 8, md: 16 }}
              flexDirection="column"
            >
              {(t('contacts.left', { returnObjects: true }) as Contact[]).map((contact) => (
                <ContactItem {...contact} key={contact.title} />
              ))}
            </Flex>
            <Flex
              flex={1}
              borderRadius="20px"
              bg="rgba(255, 255, 255, 0.41)"
              px={{ base: 4, md: 8 }}
              py={{ base: 8, md: 12 }}
              gap={{ base: 8, md: 16 }}
              flexDirection="column"
            >
              {(t('contacts.right', { returnObjects: true }) as Contact[]).map((contact) => (
                <ContactItem {...contact} key={contact.title} />
              ))}
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box
        backgroundImage={`url(${field.src})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        color="white"
      >
        <Container py={{ base: 12, md: 28 }}>
          <Flex gap={8} mb={12} display={{ base: 'none', md: 'flex' }}>
            <Box flex="none" width="80px">
              <ECalmLogoWhite />
            </Box>
            <Box flex="none" width="80px">
              <TridentIcon />
            </Box>
          </Flex>
          <Heading as="h2" size={{ base: 'md', md: '2xl' }}>
            {t('formsSection.secondTitle')}
          </Heading>
          <Flex gap={{ base: 4, md: 6 }} mt={{ base: 8, md: 12 }} flexWrap="wrap">
            <Button color="black" size={{ base: 'md', md: 'lg' }}>
              {t('formsSection.getHelp')}
            </Button>
            <Button variant="outline" size={{ base: 'md', md: 'lg' }}>
              {t('formsSection.becomePsychologist')}
            </Button>
          </Flex>
        </Container>
      </Box>

      <FAQ />
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!)),
  },
});

export default Home;
