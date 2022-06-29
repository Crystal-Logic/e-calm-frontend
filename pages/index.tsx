import type { GetStaticProps, NextPage } from 'next';

import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
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

const contactsLeft: Contact[] = [
  {
    title: 'Тяжкі розлади у дітей та дорослих',
    subTitle:
      'Анонімна пітримка і поради щодо проблем в особистих стосунках, булінгу, непорозумінь з батьками, насильства чи жорсткого поводження.',
    phones: ['+38 (067) 594 94 46', '+38 (067) 594 94 46'],
  },
  {
    title: 'Національна лінія підтримки для дітей',
    subTitle:
      'Анонімна пітримка і поради щодо проблем в особистих стосунках, булінгу, непорозумінь з батьками, насильства чи жорсткого поводження.',
    phones: ['0 (800) 500 225', '116 111'],
  },
  {
    title: 'Національна дітяча гаряча лінія',
    phones: ['0 (800) 500 225'],
  },
  {
    title: 'Лінія психологічної допомоги для учасників АТО і членів їх сімей',
    phones: ['0 (800) 505 085'],
  },
];

const contactsRight: Contact[] = [
  {
    title: 'Домашнє насильство та гендерна дискримінація',
    subTitle:
      'Національна гаряча лінія із запобігання домашнім насильствам, торгівлі людьми та гендерної дискримінації.',
    phones: ['0 (800) 500 335', '116 123'],
  },
  {
    title: 'Національна лінія запобігання суїцидам 24/7',
    subTitle:
      'Національна професійна цілодобова лінія з питань запобігання самогубств та профілактики психічного здоров’я «Lifeline Ukraine».',
    phones: ['7333'],
  },
  {
    title: 'Екстренна психологічна допомога при кризових центрах медико-психологічної допомоги',
    phones: ['+ 38 (068) 770 37 70', '+ 38 (099) 632 18 18', '+ 38 (093) 609 30 03'],
  },
];

const ContactItem = ({ title, subTitle, phones }: Contact) => (
  <Box key={title}>
    <Heading as="h3" mb={4} flex={1} size="md">
      {title}
    </Heading>
    {subTitle && (
      <Text mt={4} mb={4}>
        {subTitle}
      </Text>
    )}
    {phones.map((phone) => (
      <Box key={phone}>
        <Link href={`tel:${phone}`}>{phone}</Link>
      </Box>
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
        px={{ base: 4, md: 28 }}
        py={{ base: 20, md: 28 }}
        color="white"
      >
        <Heading as="h2" maxW="600px" size={{ base: 'md', md: 'xl' }}>
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
      </Box>

      <Box px={{ base: 4, md: 12 }} py={{ base: 16, md: 16 }} bg="#F6F6FA">
        <Flex direction={{ base: 'column', md: 'row' }} mb={12} gap={8}>
          <Heading as="h2" flex={1}>
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
      </Box>

      <Box px={{ base: 4, md: 12 }} py={{ base: 16, md: 16 }}>
        <Heading as="h2">Статті психологів</Heading>
      </Box>

      <Box px={{ base: 4, md: 12 }} py={{ base: 16, md: 16 }} bg="#F6F6FA">
        <Heading as="h2" mb={12}>
          {t('contacts.title')}
        </Heading>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          <Flex
            flex={1}
            borderRadius="20px"
            bg="rgba(255, 255, 255, 0.41)"
            px={{ base: 4, md: 8 }}
            py={{ base: 8, md: 12 }}
            gap={8}
            flexDirection="column"
          >
            {contactsLeft.map((contact, index) => (
              <ContactItem {...contact} key={contact.title} />
            ))}
          </Flex>
          <Flex
            flex={1}
            borderRadius="20px"
            bg="rgba(255, 255, 255, 0.41)"
            px={{ base: 4, md: 8 }}
            py={{ base: 8, md: 12 }}
            gap={8}
            flexDirection="column"
          >
            {contactsRight.map((contact, index) => (
              <ContactItem {...contact} key={contact.title} />
            ))}
          </Flex>
        </Flex>
      </Box>

      <Box
        backgroundImage={`url(${field.src})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        px={{ base: 4, md: 28 }}
        py={{ base: 12, md: 28 }}
        color="white"
      >
        <Flex gap={8} mb={12} display={{ base: 'none', md: 'flex' }}>
          <Box flex="none" width="80px">
            <ECalmLogoWhite />
          </Box>
          <Box flex="none" width="80px">
            <TridentIcon />
          </Box>
        </Flex>
        <Heading as="h2" size={{ base: 'md', md: 'xl' }}>
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
