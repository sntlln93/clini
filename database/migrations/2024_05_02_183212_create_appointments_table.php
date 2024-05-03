<?php

use App\Enums\AppointmentType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $appointment_types = Arr::map(AppointmentType::cases(), fn ($case) => $case->name);

        Schema::create('appointments', function (Blueprint $table) use ($appointment_types) {
            $table->id();

            $table->date('date');
            $table->time('time');
            $table->enum('type', $appointment_types)->default(AppointmentType::Practice->name);
            $table->foreignId('patient_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->string('phone');
            $table->string('reason')->nullable();
            $table->string('notes')->nullable();
            $table->integer('duration')->default(30);
            $table->string('healthcare')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
