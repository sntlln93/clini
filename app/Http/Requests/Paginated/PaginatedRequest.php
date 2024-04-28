<?php

namespace App\Http\Requests\Paginated;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

abstract class PaginatedRequest extends FormRequest
{
    /** @var array<string> */
    protected $sortable_columns = [];

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
            'sort_column' => ['required_with:sort_order', Rule::in($this->sortable_columns)],
            'sort_order' => ['required_with:sort_column', 'in:asc,desc'],
            'filter' => ['sometimes'],
            'page' => ['sometimes', 'numeric'],
            'per_page' => ['sometimes', 'numeric'],
        ];
    }
}
