<?php

namespace App\Http\Controllers\Clini\Appointments;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentsRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;

class GetAppointmentsController extends Controller
{
    public function __invoke(AppointmentsRequest $request): mixed
    {
        $validated = $request->validated();

        /** @var \App\Models\User $practice */
        $practice = $request->user();

        $appointments = Appointment::query()
            ->where('user_id', $practice->id)
            ->whereMonth('date', $validated['month'])
            ->orderBy('time')
            ->get();

        return AppointmentResource::collection($appointments);
    }
}
