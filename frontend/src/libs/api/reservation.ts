import type { User } from '@/types/user';
import { apiClient, userApiBase } from './apiClient';

export const reservationApi = {
  getReservationDates: async (userId: string, token: string): Promise<User['reservations']> => {
    try {
      const response = await apiClient.get(`${userApiBase}/${userId}/reservation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch reservation dates');
    }
  },
  updateReservationDates: async (
    userId: string,
    reservationDates: string[],
    token: string,
  ): Promise<User['reservations']> => {
    try {
      const response = await apiClient.patch(
        `${userApiBase}/${userId}/reservation`,
        reservationDates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.data;
    } catch (error) {
      throw new Error('Failed to update reservation dates');
    }
  },
};
