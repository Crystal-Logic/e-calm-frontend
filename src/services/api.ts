import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.error('API_URL is not defined');
}

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }),
);
