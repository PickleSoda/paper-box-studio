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
        $booking->name = $validatedData['name'];
        $booking->status = $validatedData['status'];
        $booking->start_time = $validatedData['start_time'];
        $booking->end_time = $validatedData['end_time'];
        $booking->save();
        
        return Redirect::route('timetable');
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
