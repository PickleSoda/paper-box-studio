<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Booking;

class BookingUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
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
