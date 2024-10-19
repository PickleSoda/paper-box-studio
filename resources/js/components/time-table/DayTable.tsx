import React, { FC } from "react";
import dayjs from "dayjs";
import { useStoreState } from "pullstate";
import { CalendarStore } from "@/store/calendar";
import { getWeekHours } from "@/utils/time";
// Define the props for the CalendarTable component
interface DayTableProps {
    openModal: CallableFunction;
}

const DayTable: FC<DayTableProps> = ({ openModal = () => {} }) => {
    const calendarStore = useStoreState(CalendarStore);
    const weekHours = getWeekHours(calendarStore.daySelected);
    const todaysHours = weekHours[calendarStore.daySelected.day()];
    const bookings = useStoreState(CalendarStore, (s) => s.bookings);
    const currentDate = dayjs();

    const handleHourClick = (time: string) => () => {
        openModal(time);
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
            const isStart = timeMoment.isBetween(
                dayjs(foundBooking.start_time).subtract(1, "minute"),
                dayjs(foundBooking.start_time).add(15, "minute")
            );
            const isEnd = timeMoment.isBetween(
                dayjs(foundBooking.end_time),
                dayjs(foundBooking.end_time).subtract(16, "minute")
            );
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
                            <tr
                                key={hourIndex}
                                className="border-2 border-gray-300 dark:border-gray-700 rounded-lg"
                            >
                                {hourIntervals.map(
                                    (formattedTime, intervalIndex) => {
                                        const { booked, isStart, isEnd, name } =
                                            getQuartDetails(formattedTime);
                                        return (
                                            <div
                                                onClick={handleHourClick(
                                                    formattedTime
                                                )}
                                                key={intervalIndex}
                                                className={`p-2 flex ${
                                                    isStart
                                                        ? "rounded-tl-lg rounded-tr-lg bg-blue-500 dark:bg-slate-600 border-b-0"
                                                        : 
                                                    isEnd
                                                        ? " rounded-bl-lg rounded-br-lg border-t-0 bg-blue-300 dark:bg-slate-800"
                                                        :  booked && " bg-blue-300 dark:bg-slate-800 border-y-0"
                                                } ${booked && "border-2 border-blue-700 dark:border-slate-400"} ${
                                                    !booked &&
                                                    "border border-gray-200 dark:border-gray-700 border-dashed border-x-0" +
                                                        (intervalIndex === 0 &&
                                                            "border-t-0") +
                                                        (intervalIndex === 3 &&
                                                            "border-b-0") +
                                                        (dayjs(
                                                            formattedTime,
                                                            "DD-MM-YYYY HH:mm"
                                                        ).isBefore(
                                                            currentDate,
                                                            "minute"
                                                        )
                                                            ? " bg-gray-600/10 hover:bg-red-500/20"
                                                            : "cursor-pointer hover:bg-green-500/20 ")
                                                }
`}
                                            >
                                                <div
                                                    className={`${
                                                        booked && "text-white"
                                                    } font-bold p-1`}
                                                >
                                                    {
                                                        formattedTime.split(
                                                            " "
                                                        )[1]
                                                    }
                                                </div>

                                                <div
                                                    key={intervalIndex}
                                                    className="w-full text-white font-bold p-1"
                                                >
                                                    {isStart ? (
                                                        <span className="">
                                                            {name}
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
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
