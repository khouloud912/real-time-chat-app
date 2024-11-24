import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Backend API base URL

export const register = async (auth0User: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      auth0User
    );
    return response.data; // Registered user details
  } catch (error) {
    console.error('Register API error:', error);
    throw error;
  }
};
