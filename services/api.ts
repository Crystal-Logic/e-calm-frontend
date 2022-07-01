import axios from 'axios';

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.error('API_URL is not defined');
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
