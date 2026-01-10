import axios from 'axios';

const withAuth = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return instance;
};

// CORE API (global)
export const coreInstance = withAuth(
  axios.create({
    baseURL: 'https://api.spazyo.xyz',
    headers: { 'Content-Type': 'application/json' }
  })
);

// TENANT API (por defecto zayca, luego lo puedes hacer dinámico)
export const tenantInstance = withAuth(
  axios.create({
    baseURL: 'https://zayca.spazyo.xyz',
    headers: { 'Content-Type': 'application/json' }
  })
);
