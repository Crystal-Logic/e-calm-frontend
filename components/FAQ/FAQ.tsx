import type { NextPage } from 'next';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Heading, Text } from '@chakra-ui/react';
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
          <Heading fontWeight="500" fontSize={{ base: '16px', md: '24px' }} flex="1" textAlign="left" pr={4}>
            {title}
          </Heading>
          {isExpanded ? (
            <MinusIcon fontSize={{ base: '16px', md: '22px' }} />
          ) : (
            <AddIcon fontSize={{ base: '16px', md: '22px' }} />
          )}
        </AccordionButton>
        <AccordionPanel px={{ base: 4, md: 12 }} py={{ base: 4, md: 6 }}>
          <Text fontSize={{ base: '13px', md: '16px' }}>{text}</Text>
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
);

export const FAQ: NextPage = () => {
  const { t } = useTranslation('faq');

  return (
    <Box px={{ base: 4, md: 12 }} py={{ base: 12, md: 16 }}>
      <Heading mb={12} as="h2" size={{ base: 'md', md: 'xl' }}>
        {t('title')}
      </Heading>
      <Accordion allowToggle allowMultiple>
        {(t('items', { returnObjects: true }) as FAQItemProps[]).map((item, index) => (
          <FAQItem {...item} key={index} />
        ))}
      </Accordion>
    </Box>
  );
};
