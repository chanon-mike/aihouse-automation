'use client';

import { useEffect, useState } from 'react';
import type { SelectMultipleEventHandler } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import moment from 'moment';
import { reservationApi } from '@/libs/services/reservation';
import type { Session } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';

type DatePickerProps = { session: Session | null | undefined };

const DatePicker = ({ session }: DatePickerProps) => {
  const router = useRouter();
  const [days, setDays] = useState<Date[]>([]); // [new Date('2021-10-01'), new Date('2021-10-02')]
  const [confirmReserved, setConfirmReserved] = useState<string[]>([]); // ['2021-10-01', '2021-10-02']
  const [confirmed, setConfirmed] = useState(false);

  const modifiers = {
    selected: days,
  };
  const modifiersClassNames = {
    selected: 'selected',
  };

  const isValidSession = (session: Session | null | undefined): boolean => {
    return session !== null && session !== undefined;
  };

  const fetchReservedDates = async () => {
    if (!isValidSession(session)) return;

    const response = await reservationApi.getReservationDates(
      session?.user.sub,
      session?.accessToken ?? '',
    );

    if (response.status !== 200)
      alert(`${response.status}: ${response.statusText}\nPlease try again or contact us.`);

    if (response !== null) {
      const reservedDates = response.data.map((dateStr: string) => moment(dateStr).toDate());
      setDays(reservedDates);
    }
  };

  const updateReservedDates = async (reservedDates: string[]) => {
    const response = await reservationApi
      .updateReservationDates(session?.user.sub ?? '', reservedDates, session?.accessToken ?? '')
      .then((res) => res)
      .catch((e) => e.response);
    return response;
  };

  const handleSelectDates: SelectMultipleEventHandler = async (selectedDays) => {
    if (selectedDays !== undefined) {
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

    if (session?.user !== undefined) {
      router.push('api/auth/login');
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
  });

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

export default DatePicker;
