import type { User } from '@/types/user';
import { apiClient, userApiBase } from '../apiClient';

export const userApi = {
  getUserById: async (userId: string, token: string): Promise<User | null> => {
    try {
      const response = await apiClient.get(`${userApiBase}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  updateUser: async (userId: string, token: string, data: User): Promise<User> => {
    const response = await apiClient.patch(`${userApiBase}/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  createUser: async (data: User): Promise<User> => {
    const response = await apiClient.post(`${userApiBase}`, data);

    return response.data;
  },
};
