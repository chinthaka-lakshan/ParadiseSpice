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
            'order_items' => 'required|array',
            'order_items.*.product_id' => 'required|integer|exists:stocks,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,approved,rejected,delivered',
        ]);

        try {
            $order = DB::transaction(function () use ($request) {
                $shop = Shop::findOrFail($request->shop_id);

                // Check credit limit (Assuming credit_balance is REMAINING credit)
                if ($shop->credit_limit < $request->total_amount) {
                    throw new \Exception('Insufficient credit limit for this shop.');
                }

                // 1. Create the Order
                $order = Order::create($request->all());

                // 2. Create the Order Items (Important!)
                foreach ($request->order_items as $item) {
                    $order->items()->create([
                        'product_id' => $item['product_id'],
                        'quantity'   => $item['quantity'],
                        'price'      => $item['price'],
                    ]);
                }

                // 3. Update Shop Credit
                $shop->credit_limit -= $request->total_amount; 
                $shop->save();

                return $order;
            });

            return response()->json([
                'message' => 'Order placed successfully', 
                'order' => $order->load('items') // Load items to show in response
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
