import React, { FC } from "react";
import dayjs from "dayjs";
import { useStoreState } from "pullstate";
import { CalendarStore } from "@/store/calendar";
import { getWeekHours } from "@/Utils/time";
// Define the props for the CalendarTable component
interface DayTableProps {
    openModal: CallableFunction;
}

const DayTable: FC<DayTableProps> = ({
    openModal = () => {},
}) => {
    const calendarStore = useStoreState(CalendarStore);
    const weekHours = getWeekHours(calendarStore.daySelected);
    const todaysHours = weekHours[calendarStore.daySelected.day()];
    const bookings = useStoreState(CalendarStore, (s) => s.bookings);
    const currentDate = dayjs();

    const handleHourClick = (time: string) => () => {
        openModal(time);
        console.log(time);
    };
    const findBooking = (time: dayjs.Dayjs) => {
        const foundBooking = bookings.find((booking) =>
            time.isBetween(
                dayjs(booking.start_time),
                dayjs(booking.end_time),
                null,
                "[)"
            )
        );
        return foundBooking;
    };

    const getQuartDetails = (time: string) => {
        const timeMoment = dayjs(time, "DD-MM-YYYY HH:mm");
        const foundBooking = findBooking(timeMoment);
        if (foundBooking) {
            const isStart = timeMoment.isSame(dayjs(foundBooking.start_time));
            const isEnd = timeMoment.isSame(
                dayjs(foundBooking.end_time).subtract(1, "minute")
            ); // Adjust if end time is inclusive
            return { booked: true, isStart, isEnd, name: foundBooking.name };
        }
        return { booked: false };
    };
    
    return (
        <>
            <div className="dark:text-white">


                <div className="w-full text-center text-3xl">
                    <h1>
                        Bookings for{" "}
                        {calendarStore.daySelected.format("DD/MM/YYYY")}
                    </h1>
                </div>

                <table className="w-full">
                    <tbody>
                        {todaysHours.map((hourIntervals, hourIndex) => (
                            <tr key={hourIndex} className="border border-gray-300">
                                {hourIntervals.map(
                                    (formattedTime, intervalIndex) => {
                                        const { booked, isStart, isEnd, name } =
                                            getQuartDetails(formattedTime);
                                        return (
                                            <tr
                                                onClick={handleHourClick(
                                                    formattedTime
                                                )}
                                                key={intervalIndex}
                                                className={`p-2 border border-gray-200 border-dashed ${
                                                    booked
                                                        ? (isStart
                                                              ? "rounded-tl-lg rounded-tr-lg bg-blue-500"
                                                              : "") +
                                                          (isEnd
                                                              ? " rounded-bl-lg rounded-br-lg bg-blue-500"
                                                              : " bg-blue-300")
                                                        : dayjs(
                                                              formattedTime,
                                                              "DD-MM-YYYY HH:mm"
                                                          ).isBefore(
                                                              currentDate,
                                                              "minute"
                                                          )
                                                        ? " bg-gray-600/10"
                                                        : "cursor-pointer hover:bg-green-100"
                                                }`}
                                            >
                                                <td className={`${booked&&"text-white"} font-bold p-1`}>
                                                    {
                                                        formattedTime.split(
                                                            " "
                                                        )[1]
                                                    }
                                                </td>

                                                <td
                                                    key={intervalIndex}
                                                    className="border border-gray-300 border-dashed w-full"
                                                >
                                                    {isStart ? (
                                                        <span className="text-white font-bold">
                                                            {name}
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DayTable;
