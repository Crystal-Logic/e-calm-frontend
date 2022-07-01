import { ContactFormType } from '../components/ContactForm';
import { api } from './api';

export const FormService = {
  submit: ({ name, phone, type }: { type: ContactFormType; name: string; phone: string }) => {
    return api.post('/requests/', {
      full_name: name,
      phone,
      type,
    });
  },
};
