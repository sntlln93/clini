<?php

namespace App\Http\Controllers\Clini\Patients;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Address;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;

class StorePatientController extends Controller
{
    public function __invoke(StorePatientRequest $request): PatientResource
    {

        /** @var array<string,string> $validated */
        $validated = $request->validated();

        /**
         * @var array<string,string> $patient_payload
         * @var array<string,string> $address_payload
         **/
        ['patient' => $patient_payload, 'address' => $address_payload] = $validated;

        $patient = DB::transaction(function () use ($patient_payload, $address_payload) {

            $patient = Patient::create($patient_payload);
            Address::create([...$address_payload, 'patient_id' => $patient->id]);

            return $patient;
        });

        return new PatientResource($patient);

    }
}
