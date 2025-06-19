import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/authContext.tsx';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const useUsers = (enabled: boolean = true) => {
  const { getToken } = useAuth();

  const getUsers = async () => {
    const token = await getToken();
    console.log('token', token);
    const response = await axios.get(`${API_BASE_URL}/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled,
  });
};

export const useUsersWithChats = (enabled: boolean = true) => {
  const { getToken } = useAuth();

  const getUsersWithChats = async () => {
    const token = await getToken();
    const response = await axios.get(`${API_BASE_URL}/users/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  return useQuery({
    queryKey: ['users', 'chats'],
    queryFn: getUsersWithChats,
    enabled,
  });
};
export const useConnectedUser = (enabled: boolean = true) => {
  const { getToken } = useAuth();

  const fetchConnectedUser = async () => {
    const token = await getToken();
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  return useQuery({
    queryKey: ['connectedUser'],
    queryFn: fetchConnectedUser,
    enabled,
  });
};