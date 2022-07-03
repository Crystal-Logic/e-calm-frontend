import { ChangeEvent, useState } from 'react';

import { Button, Checkbox, FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';

import { FormService } from '../../services';
import { FormModalRef, FormModalState } from '../FormModal';

export const enum ContactFormType {
  psychologist = 'Psychologist',
  patient = 'Patient',
}

type ContactFormProps = {
  type: ContactFormType;
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

type FormType = {
  name: string;
  phone: string;
  checkbox: boolean;
  nameError: string | null;
  phoneError: string | null;
  checkboxError: string | null;
};

const formInitialState: FormType = {
  name: '',
  phone: '',
  checkbox: false,
  nameError: null,
  phoneError: null,
  checkboxError: null,
};

export const ContactForm = ({ type, variant = 'dark' }: ContactFormProps) => {
  const { t } = useTranslation('common');
  const formLocales = t('form', { returnObjects: true }) as FormLocales;
  const [{ name, phone, checkbox, nameError, phoneError, checkboxError }, setForm] = useState(formInitialState);

  const changeForm = (value: Partial<FormType>) => {
    setForm((form) => ({ ...form, ...value }));
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    changeForm({ name: e.target.value, nameError: null });
  };
  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    changeForm({ phone: e.target.value, phoneError: null });
  };
  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    changeForm({ checkbox: e.target.checked, checkboxError: null });
  };

  const validate = () => {
    let valid = true;

    if (name.length < 5) {
      changeForm({ nameError: name.length === 0 ? formLocales.nameRequired : formLocales.nameError });
      valid = false;
    }

    if (!phone.match(/\d{10,}/)) {
      changeForm({ phoneError: name.length === 0 ? formLocales.phoneRequired : formLocales.phoneError });
      valid = false;
    }

    if (!checkbox) {
      changeForm({ checkboxError: formLocales.checkboxRequired });
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async () => {
    const isValid = validate();
    if (isValid) {
      try {
        await FormService.submit({ type, name, phone });
        changeForm(formInitialState);
        FormModalRef.current?.set(FormModalState.success);
      } catch (e) {
        if (e instanceof AxiosError) {
          const errors = e.response?.data;
          if (errors?.phone) {
            changeForm({ phoneError: errors.phone[0] });
          }
        }
      }
    }
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
