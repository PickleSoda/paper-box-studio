import React, { FC } from "react";
import dayjs from "dayjs";
import { useStoreState } from "pullstate";
import { CalendarStore } from "@/store/calendar";
import { getMonth, getWeekHours } from "@/Utils/time";
// Define the structure of the calendarData object
interface CalendarData {
    [time: string]: (
        | number
        | { rowspan: number; class_name: string; teacher_name: string }
    )[];
}

// Define the props for the CalendarTable component
interface CalendarTableProps {
    date: Date;
    calendarData: CalendarData;
}

const CalendarTable: FC<CalendarTableProps> = ({ date, calendarData }) => {
    const calendarStore = useStoreState(CalendarStore);
    console.log(calendarStore.daySelected);
    console.log(dayjs().day());
    console.log(getMonth());
    console.log(getWeekHours());
    const Today = new Date(); // Use the current date or any specific date
    const firstWeekday = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const weekHours = getWeekHours(calendarStore.daySelected);
    const todaysHours = weekHours[firstWeekday];

    return (
        <>
            <h1>{Today.getDate()}</h1>
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
                    {getMonth().map((week, index) => (
                        <tr key={index}>
                            {week.map((day, index) => (
                                <td key={index}>{day.format("D")}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <table>
                <tbody>
                    {todaysHours.map((hourIntervals, hourIndex) => (
                        <tr key={hourIndex}>
                            {hourIntervals.map(
                                (formattedTime, intervalIndex) => (
                                    <div key={intervalIndex}>
                                        {formattedTime}
                                    </div>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CalendarTable;
