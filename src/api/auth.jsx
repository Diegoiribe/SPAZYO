import instance from './axiosConfig';

export const login = async (data) => {
  const res = await instance.post('/auth/login', data);
  const token = res.data.token;

  // Guardar token en localStorage
  localStorage.setItem('token', token);

  return token;
};
