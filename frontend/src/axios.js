import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mystore-ecommerce-coj7.onrender.com', 
  withCredentials: true,
});

export default instance;
