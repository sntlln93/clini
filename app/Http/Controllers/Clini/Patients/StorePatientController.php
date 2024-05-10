<?php

namespace App\Http\Controllers\Clini\Patients;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Address;
use App\Models\Patient;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class StorePatientController extends Controller
{
    public function __invoke(StorePatientRequest $request): PatientResource
    {

        /** @var array<string,array<string,string>> $validated */
        $validated = $request->validated();

        $patient = DB::transaction(function () use ($validated) {

            $patient = Patient::create($validated['patient']);

            if (isset($validated['address'])) {
                $validated_address = Arr::where($validated['address'], fn ($property) => $property !== null);
                Address::create([...$validated_address, 'patient_id' => $patient->id]);
            }

            return $patient;
        });

        return new PatientResource($patient);

    }
}
