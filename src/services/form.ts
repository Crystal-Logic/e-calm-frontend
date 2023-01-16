import { FormModalType } from '@/types';

import { api } from './api';

export const FormService = {
  submit: ({
    name,
    phone,
    type,
    code,
  }: Pick<FormModalType, 'type' | 'phone' | 'name'> & Partial<Pick<FormModalType, 'code'>>) => {
    return api.post('/requests/', { full_name: name, phone, type, code });
  },
  otp: ({ phone }: Pick<FormModalType, 'phone'>) => {
    return api.post('/otp/', { phone });
  },
};
