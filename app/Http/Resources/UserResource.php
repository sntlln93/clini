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
     * @return array<string>
     */
    public function toArray(Request $request): array
    {
        return [
            'username' => $this->username,
            'name' => $this->name,
        ];
    }
}
