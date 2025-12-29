<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderReturn extends Model
{
    use HasFactory;
    protected $table = 'order_return';
    protected $fillable = [
        'shop_id',
        'rep_id',
        'driver_id',
        'return_date',
        'delivery_date',
        'reason',
        'discount',
        'discount_rate',
        'total',
        'status'
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }
    public function rep()
    {
        return $this->belongsTo(User::class, 'rep_id');
    }
    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
    public function items()
    {
        return $this->hasMany(OrderReturnItem::class, 'order_return_id');
    }
}
