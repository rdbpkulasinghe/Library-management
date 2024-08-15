// authServices.js
import axios from 'axios';
import { appData } from '../config/constants';

const BASE_URL = `${appData.apiBaseUrl}/auth`;

const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await authAxios.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to log in');
  }
};

export const logout = async () => {
  try {
    const response = await authAxios.post('/logout');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to log out');
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await authAxios.post('/change-password', { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to change password');
  }
};
