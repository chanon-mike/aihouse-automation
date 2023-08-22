import type { User } from '@/types/user';
import { apiClient, userApiBase } from './apiClient';

export const userApi = {
  getUserById: async (userId: string, token: string): Promise<User | null> => {
    try {
      const response = await apiClient.get(`${userApiBase}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.data;
    } catch (error) {
      return null;
    }
  },
  updateUser: async (userId: string, token: string, data: User): Promise<User> => {
    try {
      const response = await apiClient.patch(`${userApiBase}/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.data;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  },
  createUser: async (data: User): Promise<User> => {
    try {
      const response = await apiClient.post(`${userApiBase}`, data);

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.data;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },
};
