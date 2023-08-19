import { apiClient, userApiBase } from '../apiClient';

export const reservationApi = {
  getReservationDates: async (userId: string, token: string) => {
    const response = await apiClient.get(`${userApiBase}/${userId}/reservation`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  updateReservationDates: async (userId: string, reservationDates: string[], token: string) => {
    console.log(reservationDates);
    const response = await apiClient.put(`${userApiBase}/${userId}/reservation`, reservationDates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};
