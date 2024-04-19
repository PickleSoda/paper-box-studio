// MonthCalendar.tsx
import React, { FC, useCallback } from 'react';
import dayjs from 'dayjs';
import { useStoreState } from "pullstate";
import { CalendarStore } from "@/store/calendar";
import { getMonth } from "@/Utils/time";

const MonthCalendar: FC = () => {
    const currentDate = dayjs();
    const calendarStore = useStoreState(CalendarStore);

    const handleDayClick = (day: dayjs.Dayjs) => () => {
        CalendarStore.update((s) => {
            s.daySelected = day;
        });
    };

    const handleMonthChange = useCallback((direction: 'next' | 'prev') => {
        const updatedMonth = direction === 'next' ? 
            calendarStore.daySelected.add(1, 'month') :
            calendarStore.daySelected.subtract(1, 'month');
            CalendarStore.update(s => { s.daySelected = updatedMonth.startOf('month'); });
        // Optionally, fetch new data for the new month from the backend
        fetchMonthData(updatedMonth);
    }, [calendarStore.daySelected]);

    // Placeholder function to fetch month data
    const fetchMonthData = (date: dayjs.Dayjs) => {
        console.log("Fetching data for:", date.format('YYYY-MM'));
        // Replace with actual fetch call
        // fetch(`/api/bookings?month=${date.format('YYYY-MM')}`)
        // .then(response => response.json())
        // .then(data => {
        //     // Process your data and perhaps update state
        // });
    };

    return (
        <div className='p-2 border rounded-xl w-fit'> 
            <div>
                <div className='flex justify-between items-center'>
                    <button onClick={() => handleMonthChange('prev')}>←</button>
                    <h1 className='text-center font-bold text-lg'>{calendarStore.daySelected.format("MMMM YYYY")}</h1>
                    <button onClick={() => handleMonthChange('next')}>→</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {getMonth(calendarStore.daySelected.month()).map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, dayIndex) => (
                                <td
                                    key={dayIndex}
                                    onClick={handleDayClick(day)}
                                    className={`${
                                        day.isBefore(currentDate, "day")
                                            ? " bg-gray-600/10"
                                            :
                                            calendarStore.daySelected.isSame(day, "day")
                                            ?   "bg-blue-200"
                                            :
                                            "cursor-pointer hover:bg-green-100"
                                    } h-8 w-8 p-1 text-center rounded-full`}
                                >
                                    {day.format("D")}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthCalendar;
