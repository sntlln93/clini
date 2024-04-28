<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PatientCollection extends ResourceCollection
{
    /**
     * The resource that this resource collects.
     *
     * @var string
     */
    public $collects = PatientResource::class;

    /**
     * Transform the resource collection into an array.
     *
     * @return array<string,string|int>
     */
    public function toArray(Request $request): array
    {
        /** @var array<string,string|int> $results */
        $results = parent::toArray($request);

        return $results;
    }
}
