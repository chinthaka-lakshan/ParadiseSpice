<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'vehicle_id',
        'order_date',
        'total_amount',
        'status',
        'payment_status',
        'cheque_number',
        'bank_name',
        'rep_id',
        'driver_id',
        'delivery_date',
        'discount',
        'discount_rate'
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
    public function rep()
    {
        return $this->belongsTo(User::class, 'rep_id');
    }
    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
}