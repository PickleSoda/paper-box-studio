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
    openModal: CallableFunction;
}

const CalendarTable: FC<CalendarTableProps> = ({ date , openModal = () => {} }) => {
    const calendarStore = useStoreState(CalendarStore);
    const Today = new Date(); // Use the current date or any specific date
    const firstWeekday = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const weekHours = getWeekHours(calendarStore.daySelected);
    const todaysHours = weekHours[firstWeekday];
    const handleHourClick = (time: string) => () => {
        openModal(time);
        console.log(time);
    };
    // console.log(calendarStore.daySelected);
    // console.log(dayjs().day());
    // console.log(getMonth());
    // console.log(getWeekHours());
    return (
        <>
            <div className="dark:text-white">
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
                <table className="w-full">
                    <tbody>
                        {todaysHours.map((hourIntervals, hourIndex) => (
                            <tr key={hourIndex} className="border-2">
                                {hourIntervals.map(
                                    (formattedTime, intervalIndex) => (
                                        <tr key={intervalIndex} className="border border-gray-300 border-dashed">
                                            <td>
                                                {formattedTime.split(" ")[1]}
                                            </td>
                                            <td
                                                className=" w-full "
                                                onClick={handleHourClick(
                                                    formattedTime
                                                )}
                                            ></td>
                                        </tr>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CalendarTable;
