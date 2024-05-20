<?php

namespace App\Http\Requests;

use App\Enums\AppointmentStatus;
use App\Enums\AppointmentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appointment.status' => ['sometimes', Rule::in(AppointmentStatus::cases())],
            'appointment.type' => ['sometimes', Rule::in(AppointmentType::cases())],
            'appointment.date' => ['sometimes', 'date'],
            'appointment.time' => ['sometimes', 'date_format:H:i:s'],
            'appointment.phone' => ['sometimes'],
            'appointment.reason' => ['sometimes', 'nullable'],
            'appointment.notes' => ['sometimes', 'nullable'],
            'appointment.duration' => ['sometimes', 'numeric'],
        ];
    }
}
