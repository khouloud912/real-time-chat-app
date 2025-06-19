import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const addMessage = async (body: any) => {
  try {
    const response = await axios.post(
        `${API_BASE_URL}/messages/newMessage`,
        body
    );
    return response.data;
  } catch (error) {
    console.error('Message API error:', error);
    throw error;
  }
};

export const useAddMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMessage,
    onSuccess: () => {
      // Invalidate and refetch related queries after successful mutation
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'chats'] });
    },
    onError: (error) => {
      console.error('Failed to add message:', error);
    },
  });
};