<?php

namespace App\Http\Controllers\Clini\Patients;

use App\Http\Controllers\Controller;
use App\Http\Requests\Paginated\PaginatedPatientRequest;
use App\Http\Resources\PatientCollection;
use App\Models\Patient;
use App\Services\FilterPaginatedResultService;
use Illuminate\Support\Facades\Auth;

class GetPatientsController extends Controller
{
    public function __invoke(PaginatedPatientRequest $request): PatientCollection
    {
        /** @var array<string,string> $validated */
        $validated = $request->validated();

        /**
         * In the future this will also return patients created by the practice
         * and patients whose its clinical history has entries created by the practice
         */
        $patient_builder = Patient::whereHas('appointments', function ($query) {
            $query->where('user_id', Auth::id());
        });

        $patients = (new FilterPaginatedResultService($patient_builder))
            ->setSearchableColumns(['dni', 'lastname', 'names'])
            ->apply($validated);

        return new PatientCollection($patients);
    }
}
