<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $role = Arr::random(['doctor', 'secretary']);
        $meta = [
            'doctor' => ['mp' => '547', 'dni' => '37415820'],
            'secretary' => ['dni' => '37415820'],
        ];

        return [
            'username' => fake()->userName(),
            'role' => $role,
            'names' => fake()->name(),
            'lastname' => fake()->lastName(),
            'password' => static::$password ??= Hash::make('1234'),
            'meta' => json_encode($meta[$role]),
        ];
    }
}
