<?php

namespace App\Http\Requests;

use App\Enums\AppointmentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppointmentRequest extends FormRequest
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
            'patient_id' => ['required', 'exists:patients,id'],
            'type' => ['required', Rule::in(AppointmentType::cases())],
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i:s'],
            'phone' => ['sometimes', 'nullable'],
            'reason' => ['sometimes', 'nullable'],
            'notes' => ['sometimes', 'nullable'],
            'duration' => ['required', 'numeric'],
        ];
    }

    /**
     * Handle a passed validation attempt.
     */
    protected function prepareForValidation()
    {
        $formatted_time = $this->input('time').':00';
        $this->merge([
            'patient_id' => $this->input('patientId'),
            'time' => $formatted_time,
        ]);
    }
}
