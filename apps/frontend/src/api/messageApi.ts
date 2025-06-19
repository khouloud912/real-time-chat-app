import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const addMessage = async (body: any) => {
  try {
    const response = await axios.post(
        `${API_BASE_URL}/messages/`,
        body
    );
    return response.data;
  } catch (error) {
    console.error('Message API error:', error);
    throw error;
  }
};
export const getMessages = async (senderId: string, receiverId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages/`, {
      params: { senderId, receiverId }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch messages:', error);
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

export const useMessages = (senderId: string, receiverId: string) => {
  return useQuery({
    queryKey: ['messages', senderId, receiverId],
    queryFn: () => getMessages(senderId, receiverId),
    enabled: !!(senderId && receiverId), // Only run if both IDs are available
  });
}