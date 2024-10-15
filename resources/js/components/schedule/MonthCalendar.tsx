// MonthCalendar.tsx
import React, { FC, useState, useEffect } from "react";
import dayjs from "dayjs";
import { useStoreState } from "pullstate";
import { CalendarStore } from "@/store/calendar";
import { Calendar } from "@/components/ui/calendar";

const MonthCalendar: FC = () => {
  const currentDate = dayjs(new Date());
  const calendarStore = useStoreState(CalendarStore);

  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      const selectedDay = dayjs(date);
      CalendarStore.update((s) => {
        s.daySelected = selectedDay;
      });
    }
  };

  const handleMonthChange = (date: Date) => {
    const updatedMonth = dayjs(date);
    CalendarStore.update((s) => {
      s.daySelected = updatedMonth.startOf("month");
    });
    fetchMonthData(updatedMonth);
  };

  // Placeholder function to fetch month data
  const fetchMonthData = (date: dayjs.Dayjs) => {
    console.log("Fetching data for:", date.format("YYYY-MM"));
    // Replace with actual fetch call
    // fetch(`/api/bookings?month=${date.format('YYYY-MM')}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Process your data and perhaps update state
    //   });
  };

  return (
    <div className="p-2 border rounded-xl w-fit">
      <Calendar
        mode="single"
        selected={calendarStore.daySelected.toDate()}
        onSelect={handleDaySelect}
        month={calendarStore.daySelected.toDate()}
        onMonthChange={handleMonthChange}
        disabled={(date) => dayjs(date).isBefore(currentDate, "day")}
      />
    </div>
  );
};

export default MonthCalendar;
