import React, { useState } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Scheduler: React.FC = () => {
    const initialDays: Date[] = [];
    const [days, setDays] = useState<Date[] | undefined>(initialDays);

    const handleSelect: SelectMultipleEventHandler = (selectedDays) => {
        setDays(selectedDays);
    }

    const handleButtonClick = () => {
        alert('確定しました');
    }

    return (
        <div>
            <DayPicker
                mode="multiple"
                min={0}
                selected={days}
                onSelect={handleSelect}
            />
            <div className="flex justify-end">
                <button onClick={handleButtonClick} className="bg-yellow-600 rounded-xl p-2 mt-3">
                    Book
                </button>
            </div>
        </div>
    );
}

export default Scheduler;
