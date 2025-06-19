// api/auth.ts
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const register = async (auth0User: any) => {
  try {
    const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        auth0User
    );
    return response.data;
  } catch (error) {
    console.error('Register API error:', error);
    throw error;
  }
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      console.log('User registered successfully:', data);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};