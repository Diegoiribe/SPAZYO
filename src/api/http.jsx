import { coreInstance } from './axiosConfig';

export const get = async (endpoint, params = null) => {
  const res = await coreInstance.get(endpoint, { params });
  return res.data;
};

export const post = async (endpoint, data) => {
  const res = await coreInstance.post(endpoint, data);
  return res.data;
};

export const patch = async (endpoint, data) => {
  const res = await coreInstance.patch(endpoint, data);
  return res.data;
};

export const del = async (endpoint) => {
  const res = await coreInstance.delete(endpoint);
  return res.data;
};
