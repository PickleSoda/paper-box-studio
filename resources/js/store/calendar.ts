import dayjs, { Dayjs } from "dayjs";
import { Store } from "pullstate";
import { Booking } from "@/types";
interface ICalendarStore {
    monthIndex: number;
    daySelected: Dayjs;
    viewCalender: "month" | "week" | "day";
    savedBookings: Booking[];
}

export const CalendarStore = new Store<ICalendarStore>({
    monthIndex: 0,
    daySelected: dayjs(),
    viewCalender: "week",
    savedBookings: [],
});
