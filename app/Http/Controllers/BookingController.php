<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Services\CalendarService;
use Illuminate\Http\Request;
use App\Http\Requests\BookingRequest;
use App\Http\Requests\BookingUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CalendarService $calendarService): Response
    {
        $bookings = $calendarService->getBookingsForCurrentMonth();


        return Inertia::render('Dashboard/TimeTable', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(BookingRequest $request)
     {
         $validatedData = $request->validated();
         $booking = new Booking();
 
         if ($booking->isTimeAvailable($validatedData['start_time'], $validatedData['end_time'])) {
             $booking->name = $validatedData['name'];
             $booking->status = $validatedData['status'];
             $booking->setStartTimeAttribute($validatedData['start_time']);
             $booking->setEndTimeAttribute($validatedData['end_time']);
             $booking->save();
 
             // Return back with a success message
             return back()->with('success', 'Booking created successfully!');
         } else {
             // Return back with error messages
             return back()->withErrors(['time' => 'The selected time is not available.']);
         }
     }
 
     public function update(BookingUpdateRequest $request, Booking $booking)
     {
         if (!$booking) {
             return back()->withErrors(['booking' => 'Booking not found.']);
         }
 
         $booking->update($request->validated());
 
         // Return back with a success message
         return back()->with('success', 'Booking updated successfully!');
     }
 
     public function destroy(Booking $booking)
     {
         if (!$booking) {
             return back()->withErrors(['booking' => 'Booking not found.']);
         }
 
         $booking->delete();
 
         // Return back with a success message
         return back()->with('success', 'Booking deleted successfully!');
     }
}
