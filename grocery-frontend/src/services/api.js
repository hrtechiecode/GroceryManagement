import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const registerUser = (user) =>
  axios.post(`${BASE_URL}/users/register`, user);

export const loginUser = (user) =>
  axios.post(`${BASE_URL}/users/login`, user);

export const getItems = async () => {
  const res = await axios.get(`${BASE_URL}/items`);
  return res.data;
};

export const addItem = (item) =>
  axios.post(`${BASE_URL}/items`, item);

export const deleteItem = (id) =>
  axios.delete(`${BASE_URL}/items/${id}`);

// 🆕 ORDER
export const placeOrder = (order) =>
  axios.post(`${BASE_URL}/orders`, order);