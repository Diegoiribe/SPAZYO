import { post } from './http';

export const login = async (data) => {
  // auth siempre va contra la API global
  const res = await post('/auth/login', data);
  const token = res.token;
  const subdomain = res.subdomain;

  // Guardar token y subdomain en localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('subdomain', subdomain);

  return { token, subdomain };
};
