import axios from 'axios';

const withAuth = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Handle FormData correctly
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  });
  return instance;
};

// CORE API (global)
export const coreInstance = withAuth(
  axios.create({
    baseURL: 'https://api.spazyo.xyz'
  })
);
