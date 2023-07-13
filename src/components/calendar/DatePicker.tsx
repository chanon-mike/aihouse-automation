import React, { useState } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../index.css';
// import moment from 'moment';

const Scheduler: React.FC = () => {
  const [days, setDays] = useState<Date[]>([]);

  const handleSelect: SelectMultipleEventHandler = (selectedDays) => {
    if (selectedDays) {
      setDays(selectedDays);
      // reservedDates is an array of strings, e.g. ['2021-10-01', '2021-10-02']
      // You can use this array to send to the backend
      // const reservedDates = selectedDays.map((day) => moment(day).format('YYYY-MM-DD'));
      // console.log(reservedDates);
    }
  };

  const handleButtonClick = () => {
    alert('確定しました');
  };

  const modifiers = {
    selected: days,
  };

  const modifiersClassNames = {
    selected: 'selected',
  };

  return (
    <div>
      <DayPicker
        mode="multiple"
        min={0}
        selected={days}
        onSelect={handleSelect}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
      <div className="flex justify-center">
        <button
          onClick={handleButtonClick}
          className="rounded-xl p-2 px-10 mt-3 text-dark bg-secondary hover:bg-primary hover:text-white"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Scheduler;
