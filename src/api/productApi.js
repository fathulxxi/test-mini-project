import axios from 'axios';

const createInstance = (token) =>
  axios.create({
    baseURL: 'https://dummyjson.com',
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProducts = (token, { limit = 10, skip = 0, q = '' } = {}) => {
  const api = createInstance(token);
  if (q) return api.get(`/products/search?q=${q}&limit=${limit}&skip=${skip}`);
  return api.get(`/products?limit=${limit}&skip=${skip}`);
};

export const getProductById = (token, id) =>
  createInstance(token).get(`/products/${id}`);

export const addProduct = (token, data) =>
  createInstance(token).post('/products/add', data);

export const updateProduct = (token, id, data) =>
  createInstance(token).put(`/products/${id}`, data);

export const deleteProduct = (token, id) =>
  createInstance(token).delete(`/products/${id}`);
