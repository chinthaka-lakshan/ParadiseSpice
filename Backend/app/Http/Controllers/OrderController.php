<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Shop;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    //get all orders
    public function index()
    {
        $orders = Order::all();
        return response()->json(['message' => 'Orders retrieved successfully', 'data' => $orders]);
    }   

    //place a new order
    public function store(Request $request)
    {
        $request->validate([
            'shop_id' => 'required|integer|exists:shops,id',
            'rep_id' => 'required|integer|exists:users,id',
            'order_date' => 'required|date|before_or_equal:today',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,approved,rejected,delivered',
        ]);

        // Use DB transaction to keep data safe
        DB::transaction(function () use ($request, &$order) {
            $shop = Shop::findOrFail($request->shop_id);
            if ($shop->credit_limit < $request->total_amount) {
                abort(422, 'Insufficient credit limit for this shop.');
            }
            $order = Order::create($request->all());
            $shop->credit_balance = $shop->credit_limit - $request->total_amount;
            $shop->save();
        });
        $order = Order::create($request->all());
        return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);
    }
}
