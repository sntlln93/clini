<?php

namespace App\Http\Controllers\Clini\Appointments;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;

class StoreAppointmentController extends Controller
{
    public function __invoke(StoreAppointmentRequest $request): AppointmentResource
    {
        /** @var array<string,string> $validated */
        $validated = $request->validated();

        /** @var \App\Models\User $user */
        $user = $request->user();

        $appointment = Appointment::create([...$validated, 'user_id' => $user->id]);

        return new AppointmentResource($appointment);
    }
}
