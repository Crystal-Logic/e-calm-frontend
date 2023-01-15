import { Box, Container, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

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

export const Contacts = () => {
  const { t } = useTranslation('common');

  return (
    <Box bg="#F6F6FA" id="contacts">
      <Container py={{ base: 12, md: 16 }}>
        <Heading as="h2" mb={{ base: 8, md: 12 }} size={{ base: 'md', md: '2xl' }}>
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
  );
};
