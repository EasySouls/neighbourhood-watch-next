import axios from 'axios';
import Cookies from 'js-cookie';
import https from 'https';

let rejectUnauthorized = true;

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  rejectUnauthorized = false;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const httpAgent = new https.Agent({ rejectUnauthorized: rejectUnauthorized });

const api = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  httpAgent: httpAgent,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
