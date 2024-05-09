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
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<Address>
     */
    public function address()
    {
        return $this->hasOne(Address::class);
    }
}
