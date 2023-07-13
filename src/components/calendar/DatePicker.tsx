import React, { useState } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../index.css'

const Scheduler: React.FC = () => {
    const [days, setDays] = useState<Date[]>([]);

    const handleSelect: SelectMultipleEventHandler = (selectedDays) => {
        if (selectedDays) { // Check that selectedDays is not undefined
            setDays(selectedDays);
        }
    }

    const handleButtonClick = () => {
        alert('確定しました');
    }

    const modifiers = {
        selected: days
    };
    
    const modifiersClassNames = {
        selected: 'selected'
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
            <div className="flex justify-end">
                <button onClick={handleButtonClick} className="rounded-xl p-2 px-5 mt-3 text-dark bg-secondary">
                    Book
                </button>
            </div>
        </div>
    );
}

export default Scheduler;
