<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AppointmentsRequest extends FormRequest
{
    /** @var string[] MONTHS */
    private const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

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
            'month' => ['required', Rule::in(self::MONTHS)],
            'year' => ['required', 'digits:4'],
        ];
    }

    /**
     * Get the validated data from the request.
     *
     * @param  array<string>|int|string|null  $key
     * @param  mixed  $default
     * @return array<string,string|int>
     */
    public function validated($key = null, $default = null)
    {
        /** @var array<string,string|int> */
        $validated = parent::validated($key, $default);

        // Ensure that $validatedData is an array before modifying it
        if (is_array($validated) && isset($validated['month'])) {
            // Convert month from string to number
            $validated['month'] = array_search($validated['month'], self::MONTHS) + 1;
        }

        return $validated;
    }
}
