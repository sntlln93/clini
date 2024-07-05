<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1)->create([
            'names' => 'Matías Oscar',
            'lastname' => 'Santillán',
            'username' => 'Matias',
        ]);

        User::factory(10)->create();

        $this->call([
            PatientSeeder::class,
            AppointmentSeeder::class,
        ]);
    }
}
