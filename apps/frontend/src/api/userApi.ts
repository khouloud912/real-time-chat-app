import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Backend API base URL

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`);
    return response.data;
  } catch (error) {
    console.error('get users  error:', error);
    throw error;
  }
};

export const getUsersWithChats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/chats`);
    return response.data;
  } catch (error) {
    console.error('get users  error:', error);
    throw error;
  }
};
