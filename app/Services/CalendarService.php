<?php

namespace App\Services;

use App\Models\Booking;

class CalendarService
{
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
