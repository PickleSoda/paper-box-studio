<?php

namespace App\Services;

use App\Models\Booking;

class CalendarService
{
    public function generateCalendarDataForMonth($date)
    {
        $date = new \Carbon\Carbon($date);
        $calendarData = [];
        $timeRange = (new TimeService)->generateTimeRange(config('app.calendar.start_time'), config('app.calendar.end_time'));
        $bookings = Booking::whereYear('start_time', $date->year)
            ->whereMonth('start_time', $date->month)
            ->get();

        foreach ($timeRange as $time) {
            $timeText = $time['start'] . ' - ' . $time['end'];
            $calendarData[$timeText] = [];

            for ($day = 1; $day <= $date->daysInMonth; $day++) {
                $booking = $bookings->where('start_time', $date->year . '-' . $date->month . '-' . $day)
                    ->where('start_time', $time['start'])
                    ->first();

                if ($booking) {
                    array_push($calendarData[$timeText], [
                        'rowspan' => $booking->difference / 30 ?? ''
                    ]);
                } else if (
                    !$bookings->where('start_time', $date->year . '-' . $date->month . '-' . $day)
                        ->where('start_time', '<', $time['start'])
                        ->where('end_time', '>=', $time['end'])
                        ->count()
                ) {
                    array_push($calendarData[$timeText], 1);
                } else {
                    array_push($calendarData[$timeText], 0);
                }
            }
        }

        return $calendarData;
    }
    public function getBookingsForCurrentMonth()
    {
        $currentDate = now()->startOfMonth();
        $nextMonth = now()->addMonth()->startOfMonth();
        $bookings = Booking::where('start_time', '>', $currentDate)
            ->where('start_time', '<', $nextMonth)
            ->get();
        return $bookings;
    }
}
