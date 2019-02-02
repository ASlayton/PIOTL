import constants from '../constants.json';
import axios from 'axios';

const apibaseUrl = constants.piotlConfig.apibaseUrl;
// endpoint: string
// example call: apiGet('customers')
const apiGet = (endpoint) => {
  return axios.get(`${apibaseUrl}/${endpoint}`);
};

// endpoint: string
// data: object
// example call: apiPost('customers', customerObject)
const apiPost = (endpoint, data) => {
  return axios.post(`${apibaseUrl}/${endpoint}`, data);
};

// endpoint: string
// data: object
// example call: apiPut('customers?id=43', customerObject)
const apiPut = (endpoint, data) => {
  return axios.put(`${apibaseUrl}/${endpoint}`, data);
};

// endpoint: string
// example call: apiDelete('customers?id=43')
const apiDelete = (endpoint) => {
  return axios.delete(`${apibaseUrl}/${endpoint}`);
};

export default {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
};
