<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_code',
        'product_name',
        'unit_price',
        'quantity',
        'batch_number',
        'manufacture_date',
    ];
}
