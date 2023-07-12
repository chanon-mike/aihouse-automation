import { FC, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';

export const Calendar: FC = () => {
    const [events, setEvents] = useState<EventInput[]>([
        {
            title: 'Sample Event',
            start: '2023-07-14T10:30:00',
            end: '2023-07-14T12:30:00'
        },
    ]);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection

        const existingEventIndex = events.findIndex(event => event.start === selectInfo.startStr);

        // If no event on selected date, add new one
        if (existingEventIndex === -1) {
            let check = confirm('予約しますか？');
            if (check) {
                setEvents([
                    ...events,
                    {
                        title: "予約済",
                        start: selectInfo.startStr,
                        end: selectInfo.endStr,
                        allDay: selectInfo.allDay
                    }
                ]);
            }

        }
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        // When event is clicked, remove it
        let check = confirm('削除しますか？');
        console.log(clickInfo)
        if (check) {
            setEvents(events => events.filter(event => event.start !== clickInfo.event.startStr));
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            aspectRatio={0.65}
        />
    );
};
