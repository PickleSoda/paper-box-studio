<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Requests\BookingRequest;
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
    public function update(Request $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }
}
