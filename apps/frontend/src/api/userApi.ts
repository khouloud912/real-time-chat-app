import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Backend API base URL

export const getUsers = async (getToken: any) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_BASE_URL}/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('get users  error:', error);
    throw error;
  }
};

export const getUsersWithChats = async (getToken: any) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_BASE_URL}/users/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('get users  error:', error);
    throw error;
  }
};
