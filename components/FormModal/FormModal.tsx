import { createRef, useImperativeHandle, useState } from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@chakra-ui/modal';
import { Box, Button, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { ContactForm, ContactFormType } from '../ContactForm';

export const enum FormModalState {
  closed = 'closed',
  psychologist = 'psychologist',
  patient = 'patient',
  success = 'success',
}

type FormLocale = {
  title: string;
  subTitle: string;
  btn: string;
};

export const FormModalRef = createRef<{ set: (state: FormModalState) => void }>();

export const FormModal = () => {
  const { t } = useTranslation('common');
  const [state, setState] = useState(FormModalState.closed);

  useImperativeHandle(
    FormModalRef,
    () => ({
      set: (state: FormModalState) => setState(state),
    }),
    [],
  );

  const locales = t(`formModals.${state}`, { returnObjects: true }) as FormLocale;

  const handleClose = () => {
    setState(FormModalState.closed);
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
              <Box maxW="420">
                <ContactForm
                  type={state === FormModalState.patient ? ContactFormType.patient : ContactFormType.psychologist}
                />
              </Box>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
