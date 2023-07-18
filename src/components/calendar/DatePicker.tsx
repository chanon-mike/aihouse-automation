import React, { useEffect, useState } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../index.css';
import moment from 'moment';
import { reservationApi } from '../../api/reservation';
import { useAuth0 } from '@auth0/auth0-react';

const Scheduler: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [days, setDays] = useState<Date[]>([]); // [new Date('2021-10-01'), new Date('2021-10-02')]
  const [confirmReserved, setConfirmReserved] = useState<string[]>([]); // ['2021-10-01', '2021-10-02']
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();

  // Fetch reserved dates from the server based on the userId
  const fetchReservedDates = async () => {
    if (!user) return;

    const token = await getAccessTokenSilently();
    const response = await reservationApi.getReservationDates(user.sub as string, token);

    if (response) {
      const reservedDates = response.data.map((dateStr: string) => moment(dateStr).toDate());
      setDays(reservedDates);
    }
  };

  // Update reserved dates to the server
  const updateReservedDates = async (reservedDates: string[]) => {
    if (!user) return;

    const token = await getAccessTokenSilently();
    await reservationApi.updateReservationDates(user.sub as string, reservedDates, token);
  };

  const handleSelect: SelectMultipleEventHandler = async (selectedDays) => {
    if (selectedDays) {
      setDays(selectedDays);
      setConfirmed(true);

      // reservedDates is an array of strings, e.g. ['2021-10-01', '2021-10-02']
      // You can use this array to send to the backend
      const reservedDates = selectedDays.map((day) => moment(day).format('YYYY-MM-DD'));
      setConfirmReserved(reservedDates);
    }
  };

  const handleButtonClick = () => {
    if (confirmed) {
      alert('確定しました');
      setConfirmed(!confirmed);
      updateReservedDates(confirmReserved);
    }
  };

  const modifiers = {
    selected: days,
  };
  const modifiersClassNames = {
    selected: 'selected',
  };

  useEffect(() => {
    fetchReservedDates();
  }, []);

  return (
    <div>
      <DayPicker
        mode="multiple"
        min={0}
        selected={days}
        onSelect={handleSelect}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        disabled={[today, { before: today }]}
      />
      <div className="flex justify-center">
        <button
          onClick={handleButtonClick}
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
