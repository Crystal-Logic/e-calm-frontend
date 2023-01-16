import { ChangeEvent } from 'react';

import { Button, Checkbox, FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { ContactFormType } from '@/types';

type ContactFormProps = {
  form: ContactFormType;
  onFormChange: (value: Partial<ContactFormType>) => void;
  onSubmit: () => void;
  variant?: 'light' | 'dark';
};

type FormLocales = {
  name: string;
  nameRequired: string;
  nameError: string;
  phone: string;
  phoneRequired: string;
  phoneError: string;
  checkbox: string;
  checkboxRequired: string;
  btn: string;
};

export const ContactForm = ({ variant = 'dark', form, onFormChange, onSubmit }: ContactFormProps) => {
  const { t } = useTranslation('common');
  const formLocales = t('form', { returnObjects: true }) as FormLocales;
  const { name, phone, checkbox, nameError, phoneError, checkboxError } = form;

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    onFormChange({ name: e.target.value, nameError: null });
  };
  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    onFormChange({ phone: e.target.value, phoneError: null });
  };
  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    onFormChange({ checkbox: e.target.checked, checkboxError: null });
  };

  const validate = () => {
    let valid = true;

    if (name.length < 5) {
      onFormChange({ nameError: name.length === 0 ? formLocales.nameRequired : formLocales.nameError });
      valid = false;
    }

    if (!phone.match(/\d{10,}/)) {
      onFormChange({ phoneError: name.length === 0 ? formLocales.phoneRequired : formLocales.phoneError });
      valid = false;
    }

    if (!checkbox) {
      onFormChange({ checkboxError: formLocales.checkboxRequired });
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async () => {
    const isValid = validate();
    if (isValid) onSubmit();
  };

  const isLight = variant === 'light';

  return (
    <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap={6}>
      <FormControl isInvalid={!!nameError} isRequired>
        <Input
          variant={isLight ? 'flushedWhite' : 'flushedBlack'}
          placeholder={formLocales.name}
          value={name}
          onChange={handleChangeName}
        />
        <FormErrorMessage>{nameError}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!phoneError} isRequired>
        <Input
          variant={isLight ? 'flushedWhite' : 'flushedBlack'}
          placeholder={formLocales.phone}
          value={phone}
          onChange={handleChangePhone}
        />
        <FormErrorMessage>{phoneError}</FormErrorMessage>
      </FormControl>
      <Checkbox
        variant={isLight ? 'white' : 'black'}
        isChecked={checkbox}
        onChange={handleChangeChecked}
        isInvalid={!!checkboxError}
        isRequired
      >
        {formLocales.checkbox}
      </Checkbox>
      <Button size={{ base: 'md', md: 'lg' }} onClick={handleSubmit} variant={isLight ? 'solidWhite' : 'solidBlack'}>
        {formLocales.btn}
      </Button>
    </VStack>
  );
};
