<?php

namespace App\Http\Controllers\Clini\Appointments;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;

class UpdateAppointmentController extends Controller
{
    public function __invoke(UpdateAppointmentRequest $request, Appointment $appointment): AppointmentResource
    {
        /** @var array<string,array<string,string>> $validated */
        $validated = $request->validated()['appointment'];

        $appointment->update($validated);

        return new AppointmentResource($appointment);
    }
}
