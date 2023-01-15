import type { NextPage } from 'next';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

type FAQItemProps = {
  title: string;
  text: string;
};

const FAQItem = ({ title, text }: FAQItemProps) => (
  <AccordionItem>
    {({ isExpanded }) => (
      <>
        <AccordionButton px={{ base: 2, md: 8 }} py={{ base: 4, md: 8 }}>
          <Heading size={{ base: 'xs', md: 'lg' }} flex="1" textAlign="left" pr={4}>
            {title}
          </Heading>
          {isExpanded ? (
            <MinusIcon fontSize={{ base: '16px', md: '22px' }} />
          ) : (
            <AddIcon fontSize={{ base: '16px', md: '22px' }} />
          )}
        </AccordionButton>
        <AccordionPanel px={{ base: 4, md: 12 }} py={{ base: 4, md: 6 }}>
          <Text fontWeight={300} size={{ base: 'md', md: 'lg' }}>
            {text}
          </Text>
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
);

export const FAQ: NextPage = () => {
  const { t } = useTranslation('faq');

  return (
    <Container id="faq">
      <Box py={{ base: 12, md: 16 }}>
        <Heading mb={{ base: 8, md: 12 }} as="h2" size={{ base: 'md', md: '2xl' }}>
          {t('title')}
        </Heading>
        <Accordion allowMultiple>
          {(t('items', { returnObjects: true }) as FAQItemProps[]).map((item, index) => (
            <FAQItem {...item} key={index} />
          ))}
        </Accordion>
      </Box>
    </Container>
  );
};
