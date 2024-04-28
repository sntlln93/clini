<?php

namespace App\Http\Requests\Paginated;

class PaginatedPatientRequest extends PaginatedRequest
{
    /**
     * Columns that can be sorted
     *
     * @var array<string>
     */
    public $sortable_columns = [
        'dni',
        'names',
        'lastname',
        'date_of_birth',
    ];
}
