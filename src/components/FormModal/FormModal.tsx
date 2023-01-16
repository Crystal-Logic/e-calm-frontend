import { createRef, useImperativeHandle, useState } from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@chakra-ui/modal';
import { Box, Button, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { FormService } from '@/services/form';
import { ContactFormType, ContactFormVariant, FormModalType } from '@/types';

import { ContactForm } from '../ContactForm';
import { OtpForm } from '../OtpForm';

export const enum FormModalState {
  closed = 'closed',
  psychologist = 'psychologist',
  patient = 'patient',
  otp = 'otp',
  success = 'success',
}

type FormLocale = {
  title: string;
  subTitle: string;
  btn: string;
};

const formInitialState: FormModalType = {
  type: ContactFormVariant.patient,
  name: '',
  phone: '',
  checkbox: false,
  nameError: null,
  phoneError: null,
  checkboxError: null,
  code: '',
  codeError: null,
  showCodeResend: false,
};

export const FormModalRef = createRef<{
  set: (state: FormModalState, formState?: Partial<ContactFormType>) => void;
}>();

export const FormModal = () => {
  const { t } = useTranslation('common');
  const [state, setState] = useState(FormModalState.closed);
  const [form, setForm] = useState(formInitialState);

  const changeForm = (value: Partial<FormModalType>) => {
    setForm((form) => ({ ...form, ...value }));
  };

  useImperativeHandle(
    FormModalRef,
    () => ({
      set: (state, formState) => {
        setState(state);
        if (formState) changeForm(formState);
      },
    }),
    [],
  );

  const locales = t(`formModals.${state}`, { returnObjects: true }) as FormLocale;

  const handleClose = () => {
    setForm(formInitialState);
    setState(FormModalState.closed);
  };

  const handleSubmitOtp = async () => {
    try {
      await FormService.submit(form);
      setForm(formInitialState);
      setState(FormModalState.success);
    } catch (e) {
      const errors = e as { code?: string[] };
      if (errors?.code) {
        changeForm({ codeError: errors.code[0], showCodeResend: true });
      }
    }
  };

  const handleSubmitContactForm = async () => {
    try {
      await FormService.submit(form);
    } catch (e) {
      const errors = e as { phone?: string[]; code?: string[] };
      if (errors?.phone) {
        changeForm({ phoneError: errors.phone[0] });
      }
      if (errors.code && Object.keys(errors).length === 1) {
        await FormService.otp({ phone: form.phone });
        FormModalRef.current?.set(FormModalState.otp);
      }
    }
  };

  const handleCodeResend = async () => {
    try {
      changeForm({ showCodeResend: false, code: '', codeError: null });
      await FormService.otp({ phone: form.phone });
    } catch (e) {
      const error = e as string;
      if (error) {
        changeForm({ codeError: error });
      }
    }
  };

  return (
    <Modal isOpen={state !== FormModalState.closed} onClose={handleClose} size="full">
      <ModalContent>
        {state !== FormModalState.success && (
          <ModalHeader p={{ base: 2, md: 8 }}>
            <IconButton
              size="lg"
              variant="unstyled"
              icon={<ArrowBackIcon w="30" h="30" />}
              aria-label="close modal"
              onClick={handleClose}
            />
          </ModalHeader>
        )}
        <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
          {state === FormModalState.success ? (
            <VStack justifyContent="center" gap={4}>
              <Heading size={{ base: 'sm', md: '2xl' }}>{locales.title}</Heading>
              <Text size={{ base: 'md', md: 'lg' }}>{locales.subTitle}</Text>
              <Button onClick={handleClose} size={{ base: 'md', md: 'lg' }}>
                {locales.btn}
              </Button>
            </VStack>
          ) : (
            <VStack justifyContent="center" gap={{ base: 4, md: 8 }}>
              <Heading size={{ base: 'sm', md: '2xl' }}>{locales.title}</Heading>
              <Text size={{ base: 'md', md: 'lg' }}>{locales.subTitle}</Text>
              <Box maxW="420" w="100%">
                {state === FormModalState.otp ? (
                  <OtpForm
                    form={form}
                    onFormChange={changeForm}
                    onSubmit={handleSubmitOtp}
                    onCodeResend={handleCodeResend}
                  />
                ) : (
                  <ContactForm form={form} onFormChange={changeForm} onSubmit={handleSubmitContactForm} />
                )}
              </Box>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
