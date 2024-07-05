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
        'city',
        // 'state',
        // 'country',
        // 'zip_code',
        'patient_id',
        'addressable_id',
        'addressable_type',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo<Model, self>
     */
    public function addressable()
    {
        return $this->morphTo();
    }

    public function __toString()
    {
        // return Str::title("$this->address_line, $this->state, $this->country. $this->zip_code");
        return Str::title("$this->address_line, $this->city");
    }
}
