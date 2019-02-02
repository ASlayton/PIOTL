import config from '../config/config';
import axios from 'axios';

const apiBaseUrl = config.getConfig().piotlConfig.apiBaseUrl;

// endpoint: string
// example call: apiGet('customers')
const apiGet = (endpoint) => {
  return axios.get(`${apiBaseUrl}/${endpoint}`);
};

// endpoint: string
// data: object
// example call: apiPost('customers', customerObject)
const apiPost = (endpoint, data) => {
  return axios.post(`${apiBaseUrl}/${endpoint}`, data);
};

// endpoint: string
// data: object
// example call: apiPut('customers?id=43', customerObject)
const apiPut = (endpoint, data) => {
  return axios.put(`${apiBaseUrl}/${endpoint}`, data);
};

// endpoint: string
// example call: apiDelete('customers?id=43')
const apiDelete = (endpoint) => {
  return axios.delete(`${apiBaseUrl}/${endpoint}`);
};

export default {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
};
