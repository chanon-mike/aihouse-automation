import type { User } from '@/types/user';
import { apiClient, userApiBase } from '../apiClient';

export const userApi = {
  getUserById: async (userId: string, token: string): Promise<User> => {
    const response = await apiClient.get(`${userApiBase}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch user data');
    }

    return response.data;
  },
  updateUser: async (userId: string, token: string, data: User): Promise<User> => {
    const response = await apiClient.patch(`${userApiBase}/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to update user data');
    }

    return response.data;
  },
};
