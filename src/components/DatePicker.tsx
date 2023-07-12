import React, { useState } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Scheduler: React.FC = () => {
    const initialDays: Date[] = [];
    const [days, setDays] = useState<Date[] | undefined>(initialDays);
    const [bookingEnabled, setBookingEnabled] = useState(false);

    const handleSelect: SelectMultipleEventHandler = (selectedDays) => {
        if (bookingEnabled) {
            setDays(selectedDays);
        }
    }

    const handleButtonClick = () => {
        if (bookingEnabled) {
            alert('確定しました');
        }
        setBookingEnabled(!bookingEnabled);
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
                <button
                    onClick={handleButtonClick}
                    className={`rounded-xl p-2 mt-3 ${bookingEnabled ? 'bg-green-600' : 'bg-yellow-600'}`}
                >
                    {bookingEnabled ? 'Confirm' : 'Book'}
                </button>
            </div>
        </div>
    );
}

export default Scheduler;
