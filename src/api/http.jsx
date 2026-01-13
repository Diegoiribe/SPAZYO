import { coreInstance, tenantInstance } from './axiosConfig';

const resolveInstance = (scope = 'tenant') => {
  return scope === 'core' ? coreInstance : tenantInstance;
};

export const get = async (endpoint, params, scope) => {
  const res = await resolveInstance(scope).get(endpoint, { params });
  return res.data;
};

export const post = async (endpoint, data, scope) => {
  const res = await resolveInstance(scope).post(endpoint, data);
  return res.data;
};

export const patch = async (endpoint, data, scope) => {
  const res = await resolveInstance(scope).patch(endpoint, data);
  return res.data;
};

export const del = async (endpoint, scope) => {
  const res = await resolveInstance(scope).delete(endpoint);
  return res.data;
};
