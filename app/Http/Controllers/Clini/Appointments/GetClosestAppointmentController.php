<?php

namespace App\Http\Controllers\Clini\Appointments;

use App\Enums\AppointmentStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;

class GetClosestAppointmentController extends Controller
{
    public function __invoke(Request $request): HttpResponse|AppointmentResource
    {
        /** @var \App\Models\User $practice */
        $practice = $request->user();
        $now = new Carbon('now', 'America/Argentina/La_Rioja');

        $appointment = Appointment::query()
            ->where('user_id', $practice->id)
            ->where('status', AppointmentStatus::Pending)
            ->where(function ($q) use ($now) {
                return $q->whereDate('date', '>=', $now)
                    ->whereDate('date', '<', $now->copy()->addDay());
            })
            ->where(function ($q) use ($now) {
                return $q->whereTime('time', '>=', $now);
            })
            ->orderBy('time')
            ->first();

        if (! $appointment) {
            return new HttpResponse([], Response::HTTP_NO_CONTENT);
        }

        return new AppointmentResource($appointment);
    }
}
