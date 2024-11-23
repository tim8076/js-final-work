// 此為 api.js 檔案 (統一管理 API)
import axios from 'axios';
const apiPath = 'tim6029';
const token = 'q1qYVBiDx5XwAxAmz6ZK6gu5Y9Z2';

// 前台axios實體
const userRequest = axios.create({
  baseURL: `https://livejs-api.hexschool.io/api/livejs/v1/customer/${apiPath}`,
});

// 前台api
export const customerGetProducts = () => userRequest.get('/products');
export const customerGetCarts = () => userRequest.get('/carts');
export const customerPostCarts = (data) => userRequest.post('/carts', data);
export const customerDeleteCart = (id) => userRequest.delete(`/carts/${id}`);
export const customerDeleteAllCart = () => userRequest.delete(`/carts`);
export const customerModifyCartNum = (data) => userRequest.patch('/carts', data);
export const customerSendOrder = (data) => userRequest.post('/orders', data);

// 後台axios實體
const adminRequest = axios.create({
  baseURL: `https://livejs-api.hexschool.io/api/livejs/v1/admin/${apiPath}`,
  headers: {
    'Authorization': token
  }
});

// 後台api
export const adminGetOrders = () => adminRequest.get('/orders');
export const adminDeleteOrder = (id) => adminRequest.delete(`/orders/${id}`);
export const adminDeleteAllOrders = () => adminRequest.delete('/orders');
export const adminModifyOrderStatus = (data) => adminRequest.put('/orders', data);