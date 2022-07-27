export const enum ContactFormVariant {
  psychologist = 'Psychologist',
  patient = 'Patient',
}

export type ContactFormType = {
  type: ContactFormVariant;
  name: string;
  phone: string;
  checkbox: boolean;
  nameError: string | null;
  phoneError: string | null;
  checkboxError: string | null;
};

export type OtpFormType = {
  code: string;
  codeError: string | null;
  showCodeResend: boolean;
};

export type FormModalType = ContactFormType & OtpFormType;
