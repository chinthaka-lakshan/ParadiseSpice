<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{

    protected $fillable = [
        'vehicle_owner_name',
        'vehicle_reg_no',
        'make_model',
        'contact_number',
    ];

}
