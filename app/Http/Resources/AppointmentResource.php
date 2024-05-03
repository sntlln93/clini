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
        return [
            'id' => $this->resource->id,
            'date' => $this->resource->date,
            'time' => $this->resource->time,
            'type' => $this->resource->type,
            'status' => $this->resource->status,
            'patient' => new PatientResource($this->resource->patient),
            'phone' => $this->resource->phone,
            'reason' => $this->resource->reason,
            'notes' => $this->resource->notes,
            'duration' => $this->resource->duration,
            'healthcare' => $this->resource->healthcare,
        ];
    }
}
