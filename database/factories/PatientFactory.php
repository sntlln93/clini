<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dni' => (string) fake()->numberBetween(10_000, 999_999_999),
            'names' => fake()->name(),
            'lastname' => fake()->lastName(),
            'date_of_birth' => fake()->dateTimeBetween(startDate: 90),
            'sex' => Arr::random(['F', 'M', 'U']),
            'healthcare' => fake()->word(),
        ];
    }
}
