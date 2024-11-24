import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Backend API base URL

export const addMessage = async (body: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/messages/newMessage`,
      body
    );
    return response.data; // Registered user details
  } catch (error) {
    console.error('Message API error:', error);
    throw error;
  }
};
