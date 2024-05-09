<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'address_line',
        'state',
        'country',
        'zip_code',
        'patient_id',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Patient, self>
     */
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function __toString()
    {
        return Str::title("$this->address_line, $this->state, $this->country. $this->zip_code");
    }
}
