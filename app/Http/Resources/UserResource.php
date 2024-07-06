<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\User
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string,mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'avatar' => null,
            'username' => $this->username,
            'names' => $this->names,
            'lastName' => $this->lastname,
            'fullName' => $this->lastname.', '.$this->names,
            'roles' => json_decode($this->meta ?? '{}'),
            'joinedOn' => $this->created_at?->format('y-m-d'),
        ];
    }
}
