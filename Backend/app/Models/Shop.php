<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;
    protected $fillable = [
        'shop_name',
        'owner_name',
        'owner_dob',
        'contact_number',
        'address',
        'map_location',
        'credit_limit',
        'credit_balance',
        'return_balance',
    ];
}
