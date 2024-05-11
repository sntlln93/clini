<?php

namespace Database\Seeders;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Appointment::factory(50)->create();
        Appointment::factory(1)->create([
            'date' => Carbon::now(),
            'time' => Carbon::now()->addHour(),
            'status' => AppointmentStatus::Pending,
        ]);
    }
}
