import { useState } from 'react';

import { Box, Container, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';

import ECalmLogoWhite from '../../assets/icons/e-calm-logo-white.svg';
import FBIcon from '../../assets/icons/fb.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import TelegramIcon from '../../assets/icons/telegram.svg';
import TridentIcon from '../../assets/icons/trident.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import { FormService } from '../../services';
import { ContactFormType, ContactFormVariant, navLinks } from '../../types';
import { ContactForm } from '../ContactForm';
import { FormModalRef, FormModalState } from '../FormModal';
import { NavLink } from '../NavLink';

const formInitialState: ContactFormType = {
  type: ContactFormVariant.patient,
  name: '',
  phone: '',
  checkbox: false,
  nameError: null,
  phoneError: null,
  checkboxError: null,
};

export const Footer = () => {
  const { t } = useTranslation('common');
  const navLinksTitles = t('navigation', { returnObjects: true }) as Record<typeof navLinks[number], string>;

  const [form, setForm] = useState(formInitialState);

  const changeForm = (value: Partial<ContactFormType>) => {
    setForm((form) => ({ ...form, ...value }));
  };

  const handleSubmit = async () => {
    try {
      await FormService.submit(form);
    } catch (e) {
      if (e instanceof AxiosError) {
        const errors = e.response?.data;
        if (errors?.phone) {
          changeForm({ phoneError: errors.phone[0] });
        }
        if (errors.code && Object.keys(errors).length === 1) {
          await FormService.otp({ phone: form.phone });
          FormModalRef.current?.set(FormModalState.otp, form);
          setForm(formInitialState);
        }
      }
    }
  };

  return (
    <Box bg="brand.black" color="brand.white">
      <Container py={{ base: 8, md: 16 }}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          <Box flex={1}>
            <Heading size="sm" mb={4}>
              {t('footer.formTitle')}
            </Heading>
            <Box maxW="420">
              <ContactForm form={form} onFormChange={changeForm} onSubmit={handleSubmit} variant="light" />
            </Box>
          </Box>
          <Divider display={{ base: 'block', md: 'none' }} />
          <Box flex={1}>
            <Heading size="sm">{t('footer.linksTitle')}</Heading>
            <VStack as="nav" spacing={2.5} alignItems="flex-start" mt={8}>
              {navLinks.map((link) => (
                <NavLink color="brand.lightGrey" key={link} url={link} title={navLinksTitles[link]} />
              ))}
            </VStack>
          </Box>
        </Flex>
        <Divider mt={16} mb={8} />
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
