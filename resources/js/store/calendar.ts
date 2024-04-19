import dayjs, { Dayjs } from "dayjs";
import { Store,useStoreState } from "pullstate";
import { Booking } from "@/types";
interface ICalendarStore {
    monthIndex: number;
    daySelected: Dayjs;
    viewCalender: "month" | "week" | "day";
    bookings: Booking[];
}

export const CalendarStore = new Store<ICalendarStore>({
    monthIndex: 0,
    daySelected: dayjs(),
    viewCalender: "week",
    bookings: [],
});

