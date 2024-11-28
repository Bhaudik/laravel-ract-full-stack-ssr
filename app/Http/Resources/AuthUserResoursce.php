<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResoursce extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'email_verified_at' => $this->email_verified_at,
            'permissions' => $this->getAllPermissions()->map(function ($permission) {
                return $permission->name;
            }),
            'roles' => $this->getRoleNames()

        ];
    }
}
