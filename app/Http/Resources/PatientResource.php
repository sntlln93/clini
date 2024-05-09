<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * The resource instance.
     *
     * @var \App\Models\Patient
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
            'dni' => $this->resource->dni,
            'names' => $this->resource->names,
            'lastname' => $this->resource->lastname,
            'fullName' => $this->resource->lastname.', '.$this->resource->names,
            'dateOfBirth' => $this->resource->date_of_birth,
            'sex' => strtoupper($this->resource->sex),
            'healthcare' => $this->resource->healthcare,
        ];
    }
}
