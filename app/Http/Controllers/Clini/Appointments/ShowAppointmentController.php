<?php

namespace App\Http\Controllers\Clini\Appointments;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;

class ShowAppointmentController extends Controller
{
    public function __invoke(Appointment $appointment): AppointmentResource
    {
        return new AppointmentResource($appointment);
    }
}
