import React, { useEffect, useState } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../index.css';
import moment from 'moment';
import { reservationApi } from '../../libs/services/reservation';
import { useAuth0 } from '@auth0/auth0-react';

const Scheduler: React.FC = () => {
  const { user, getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [days, setDays] = useState<Date[]>([]); // [new Date('2021-10-01'), new Date('2021-10-02')]
  const [confirmReserved, setConfirmReserved] = useState<string[]>([]); // ['2021-10-01', '2021-10-02']
  const [confirmed, setConfirmed] = useState(false);

  const modifiers = {
    selected: days,
  };
  const modifiersClassNames = {
    selected: 'selected',
  };

  const fetchReservedDates = async () => {
    if (!user) return;

    const token = await getAccessTokenSilently();
    const response = await reservationApi.getReservationDates(user.sub as string, token);

    if (response.status !== 200)
      alert(`${response.status}: ${response.statusText}\nPlease try again or contact us.`);

    if (response) {
      const reservedDates = response.data.map((dateStr: string) => moment(dateStr).toDate());
      setDays(reservedDates);
    }
  };
  const updateReservedDates = async (reservedDates: string[]) => {
    if (!user) return;

    const token = await getAccessTokenSilently();
    const response = await reservationApi
      .updateReservationDates(user.sub as string, reservedDates, token)
      .then((res) => res)
      .catch((e) => e.response);
    return response;
  };

  const handleSelectDates: SelectMultipleEventHandler = async (selectedDays) => {
    if (selectedDays) {
      setDays(selectedDays);
      setConfirmed(true);

      // reservedDates is an array of strings, e.g. ['2021-10-01', '2021-10-02']
      // You can use this array to send to the backend
      const reservedDates = selectedDays.map((day) => moment(day).format('YYYY-MM-DD'));
      setConfirmReserved(reservedDates);
    }
  };

  const handleConfirmation = async () => {
    if (!confirmed) return;

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    const response = await updateReservedDates(confirmReserved);
    if (response.status === 200) {
      alert('確定しました\nReservation confirmed!');
      setConfirmed(!confirmed);
    } else {
      alert(`${response.status} ${response.statusText}\nPlease try again or contact us.`);
    }
  };

  useEffect(() => {
    fetchReservedDates();
  }, [user]);

  return (
    <div>
      <DayPicker
        mode="multiple"
        min={0}
        selected={days}
        onSelect={handleSelectDates}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        disabled={[new Date(), { before: new Date() }]}
      />
      <div className="flex justify-center">
        <button
          onClick={handleConfirmation}
          className={`rounded-xl p-2 px-10 mt-3" ${
            !confirmed ? 'text-dark bg-secondary' : 'text-secondary bg-dark'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Scheduler;
