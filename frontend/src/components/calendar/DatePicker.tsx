'use client';

import { useEffect, useRef, useState } from 'react';
import type { SelectMultipleEventHandler } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import moment from 'moment';
import { reservationApi } from '@/libs/services/reservation';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import SuccessModal from '../common/SuccessModal';

type DatePickerProps = {
  accessToken: string;
};

const DatePicker = ({ accessToken }: DatePickerProps) => {
  const router = useRouter();
  const { user } = useUser();
  const successModal = useRef<HTMLDialogElement>(null);
  const [days, setDays] = useState<Date[]>([]); // [new Date('2021-10-01'), new Date('2021-10-02')]
  const [confirmReserved, setConfirmReserved] = useState<string[]>([]); // ['2021-10-01', '2021-10-02']
  const [confirmed, setConfirmed] = useState(false);

  const modifiers = {
    selected: days,
  };
  const modifiersClassNames = {
    selected: 'selected',
  };

  const updateReservedDates = async (reservedDates: string[]) => {
    const response = await reservationApi
      .updateReservationDates(user?.sub ?? '', reservedDates, accessToken)
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

    if (user === undefined) {
      router.replace('/api/auth/login');
      return;
    }

    const response = await updateReservedDates(confirmReserved);
    if (response.status === 200) {
      successModal.current?.showModal();
      setConfirmed(!confirmed);
    } else {
      alert(`${response.status} ${response.statusText}\nPlease try again or contact us.`);
    }
  };

  useEffect(() => {
    const fetchReservedDates = async () => {
      if (user === undefined) return;

      const response = await reservationApi.getReservationDates(user?.sub ?? '', accessToken);

      if (response.status !== 200)
        alert(`${response.status}: ${response.statusText}\nPlease try again or contact us.`);

      if (response !== null) {
        const reservedDates = response.data.map((dateStr: string) => moment(dateStr).toDate());
        setDays(reservedDates);
      }
    };

    fetchReservedDates();
  }, [accessToken, user]);

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
          className={`btn mt-3" ${!confirmed ? ' btn-secondary ' : 'btn-neutral'}`}
        >
          Confirm
        </button>
      </div>
      <SuccessModal modalRef={successModal} message="Reservation confirmed!" />
    </div>
  );
};

export default DatePicker;
