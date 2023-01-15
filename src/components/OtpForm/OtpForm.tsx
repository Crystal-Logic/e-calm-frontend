import { ChangeEvent } from 'react';

import { Button, FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { FormModalType } from '../../types';

type FormLocales = {
  otp: string;
  otpRequired: string;
  otpError: string;
  btn: string;
};

type OtpFormProps = {
  form: FormModalType;
  onFormChange: (value: Partial<FormModalType>) => void;
  onSubmit: () => void;
  onCodeResend: () => void;
};

export const OtpForm = ({ form, onFormChange, onSubmit, onCodeResend }: OtpFormProps) => {
  const { t } = useTranslation('common');
  const formLocales = t('form', { returnObjects: true }) as FormLocales;
  const { code, codeError, showCodeResend } = form;

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    onFormChange({ code: e.target.value, codeError: null });
  };

  const validate = () => {
    let valid = true;

    if (code.length < 5) {
      onFormChange({
        codeError: code.length === 0 ? formLocales.otpRequired : formLocales.otpError,
        showCodeResend: false,
      });
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async () => {
    const isValid = validate();
    if (isValid) {
      onSubmit();
    }
  };

  return (
    <VStack alignItems="center" gap={6}>
      <FormControl isInvalid={!!codeError} isRequired maxW={250}>
        <Input placeholder={formLocales.otp} value={code} onChange={handleChangeCode} autoComplete="one-time-code" />
        <FormErrorMessage justifyContent="space-between">
          {codeError}
          {showCodeResend && (
            <Button variant="link" onClick={onCodeResend} size="sm">
              Resend Code
            </Button>
          )}
        </FormErrorMessage>
      </FormControl>
      <Button size={{ base: 'md', md: 'lg' }} onClick={handleSubmit}>
        {formLocales.btn}
      </Button>
    </VStack>
  );
};
