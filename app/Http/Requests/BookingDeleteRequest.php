<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Booking;

class BookingDeleteRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:bookings,id'],
            'name' => ['required', 'string'],
            'status' => ['required', 'string'],
            'start_time' => ['required', 'date_format:d-m-Y H:i'],
            'end_time' => ['required', 'date_format:d-m-Y H:i'],
        ];
    }
}
