<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * The resource instance.
     *
     * @var \App\Models\Appointment
     */
    public $resource;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        $digits = str_split($this->resource->phone, 1);
        $area_code = implode('', array_slice($digits, 0, 3));
        $first_segment = implode('', array_slice($digits, 3, 3));
        $last_segment = implode('', array_slice($digits, 6));
        $formatted_phone_number = "$area_code $first_segment $last_segment";

        return [
            'id' => $this->resource->id,
            'date' => $this->resource->date,
            'time' => $this->resource->time,
            'type' => $this->resource->type,
            'status' => $this->resource->status,
            'patient' => new PatientResource($this->resource->patient),
            'doctor' => new UserResource($this->resource->doctor),
            'phone' => $formatted_phone_number,
            'reason' => $this->resource->reason,
            'notes' => $this->resource->notes,
            'duration' => $this->resource->duration,
        ];
    }
}
