<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'dni',
        'names',
        'lastname',
        'date_of_birth',
        'sex',
        'healthcare',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne<Address>
     */
    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Appointment>
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
