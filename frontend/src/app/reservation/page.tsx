import DatePicker from '@/components/calendar/DatePicker';
import { getSession } from '@auth0/nextjs-auth0';

const Reservation = async () => {
  const session = await getSession();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-dark mt-28">
      <div className="text-center">
        <h2 className="text-lg font-bold">DINNER RESERVATION</h2>
        <h1 className="text-4xl font-bold">夕食取り置き予約</h1>
      </div>
      <p className="text-sm max-w-2xl text-clip text-center mt-2">
        夕食取り置きをする日を選択してください。
        <br />
        予約をキャンセルする場合は、予約日を押すと削除できます。
        <br />
        Please select the date for dinner reservation.
        <br />
        If you want to cancel the reservation, you can delete it by pressing the reservation date.
      </p>
      <DatePicker session={session} />
    </div>
  );
};

export default Reservation;
