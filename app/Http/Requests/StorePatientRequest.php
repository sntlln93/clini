<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    const NAME_PATTERN = "/^[a-zA-ZÀ-ÿ\s\']+$/";

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
            'patient.dni' => ['required', 'numeric', 'unique:patients,dni'],
            'patient.names' => ['required', 'regex:'.self::NAME_PATTERN],
            'patient.lastname' => ['required', 'regex:'.self::NAME_PATTERN],
            'patient.date_of_birth' => ['required', 'date'],
            'patient.sex' => ['required', 'in:F,M,U'],
            'patient.healthcare' => ['sometimes'],
            'address' => ['sometimes'],
            'address.address_line' => ['sometimes'],
            'address.city' => ['present_with:address'],
            // 'address.state' => ['present_with:address'],
            // 'address.country' => ['present_with:address'],
            // 'address.zip_code' => ['present_with:address'],
        ];
    }

    public function prepareForValidation()
    {
        $input = $this->all();

        if (isset($input['address']) && array_filter($input['address']) === []) {
            unset($input['address']);
        }

        $this->replace($input);
    }
}
