<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{

    public function authorize()
    {
        // You can add authorization logic here, e.g.:
        // return $this->user()->can('update', Booking::find($this->route('booking')));
        if (auth()->check()) {
            // Add your authorization logic here
            return true; // Make sure to implement proper authorization
        }
        return false;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'status' => ['required', 'string'],
            'start_time' => ['required', 'date_format:d-m-Y H:i'],
            'end_time' => ['required', 'date_format:d-m-Y H:i'],            
        ];
    }
}
