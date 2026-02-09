import { post } from './http';

export const login = async (data) => {
  // auth SIEMPRE va contra el CORE API
  const res = await post('/auth/login', data, 'core');
  const token = res.token;
  const subdomain = res.subdomain;

  // Guardar token en localStorage
  localStorage.setItem('token', token);

  return { token, subdomain };
};
