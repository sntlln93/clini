<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'time',
        'type',
        'status',
        'patient_id',
        'user_id',
        'phone',
        'reason',
        'notes',
        'duration',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, self>
     */
    public function practice()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Patient, self>
     */
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
