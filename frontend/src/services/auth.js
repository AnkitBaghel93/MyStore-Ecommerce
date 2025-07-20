// src/services/auth.js
import axios from 'axios';
import BACKEND_URL from '../config';


export const loginUser = async (email, password) => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
    email,
    password,
  });

  // Store user in localStorage for session persistence
  localStorage.setItem('user', JSON.stringify(response.data.user));

  return response.data;
};
