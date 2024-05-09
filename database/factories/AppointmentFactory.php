<?php

namespace Database\Factories;

use App\Enums\AppointmentStatus;
use App\Enums\AppointmentType;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = Arr::random(Arr::map(AppointmentType::cases(), fn ($case) => $case->name));
        $status = Arr::random(Arr::map(AppointmentStatus::cases(), fn ($case) => $case->name));

        return [
            'date' => fake()->dateTimeBetween(startDate: '-1 month', endDate: '+1 month'),
            'time' => sprintf('%02d:%02d:00', rand(8, 18), Arr::random([0, 15, 30, 45])),
            'type' => $type,
            'status' => $status,
            'patient_id' => Arr::random((Patient::pluck('id')->all())),
            'user_id' => 1,
            'phone' => fake()->phoneNumber(),
            'reason' => fake()->sentence(),
            'notes' => fake()->sentence(),
            'duration' => Arr::random([30, 60, 90]),
        ];
    }
}
