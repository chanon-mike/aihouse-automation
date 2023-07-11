import { BsGithub } from 'react-icons/bs';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';

const Reservation = () => {

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-800 p-5">
      <div className="w-full h-full flex flex-col justify-center items-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-semibold">AI-House HUB-4</h1>
          <h1 className="text-xl font-bold">夕食取り置き予約 (英語の部分は頼んだ)</h1>
        </div>
        <p className="text-gray-400 text-sm max-w-2xl text-clip text-center mt-2">
          夕食取り置きをする日を選択してください。
          <br />
          (英語の部分は頼んだ)
        </p>
        <div>
          <FullCalendar 
          plugins={[dayGridPlugin]} 
          initialView="dayGridMonth" 
          locales={[jaLocale]}
          locale='ja'
          />
        </div>

        <footer>
          <a className="flex mt-10" href="https://github.com/chanon-mike/aihouse-automation">
            <BsGithub className="text-2xl" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Reservation;
