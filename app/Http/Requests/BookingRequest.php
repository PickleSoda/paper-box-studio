<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{


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
