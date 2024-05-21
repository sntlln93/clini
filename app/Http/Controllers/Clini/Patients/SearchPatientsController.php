<?php

namespace App\Http\Controllers\Clini\Patients;

use App\Http\Controllers\Controller;
use App\Http\Requests\Paginated\PaginatedPatientRequest;
use App\Http\Resources\PatientCollection;
use App\Models\Patient;

class SearchPatientsController extends Controller
{
    public function __invoke(PaginatedPatientRequest $request): PatientCollection
    {
        $validated = $request->validated();

        $patients = Patient::query()
            ->where('dni', 'LIKE', '%'.$validated['filter'].'%')
            ->orWhere('lastname', 'LIKE', '%'.$validated['filter'].'%')
            ->orWhere('names', 'LIKE', '%'.$validated['filter'].'%')
            ->limit(20)
            ->get();

        return new PatientCollection($patients);
    }
}
