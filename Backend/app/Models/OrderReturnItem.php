<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderReturnItem extends Model
{
    use HasFactory;
    protected $table = 'order_return_items';
    protected $fillable = [
        'order_return_id',
        'product_id',
        'quantity',
    ];
    public function stock()
    {
        return $this->belongsTo(Stock::class, 'product_id');
    }
}
