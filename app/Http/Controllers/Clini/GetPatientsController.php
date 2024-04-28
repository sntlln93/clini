<?php

namespace App\Http\Controllers\Clini;

use App\Http\Controllers\Controller;
use App\Http\Requests\Paginated\PaginatedPatientRequest;
use App\Http\Resources\PatientCollection;
use App\Models\Patient;
use App\Services\FilterPaginatedResultService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class GetPatientsController extends Controller
{
    public function __invoke(PaginatedPatientRequest $request): PatientCollection
    {
        /** @var array<string,string> $validated */
        $validated = $request->validated();

        /** @var Builder<Model> $patient_builder */
        $patient_builder = Patient::query();

        $patients = (new FilterPaginatedResultService($patient_builder))
            ->setSearchableColumns(['dni', 'lastname', 'names'])
            ->apply($validated);

        return new PatientCollection($patients);
    }
}
