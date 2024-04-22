<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Requests\BookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Store a newly created resource in storage.
     */


    public function store(BookingRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        $booking = new Booking();
        if ($booking->isTimeAvailable($validatedData['start_time'], $validatedData['end_time'])) {
            debug($validatedData['start_time']);
            debug($validatedData['end_time']);
            $booking->name = $validatedData['name'];
            $booking->status = $validatedData['status'];
            $booking->setStartTimeAttribute($validatedData['start_time']);
            $booking->setEndTimeAttribute($validatedData['end_time']);
            $booking->save();
            return Redirect::route('timetable');
        } else {
            return redirect()->back()->withErrors(['time' => 'The selected time is not available.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking): RedirectResponse
    {
        //
        if (!$booking) {
            // Handle the case where the booking is not found
            return redirect()->back()->withErrors('Booking not found.');
        }
    
        // Proceed with your existing logic
        $booking->update($request->validated());
    
        return redirect()->route('timetable')->with('message', 'Booking updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }
}
