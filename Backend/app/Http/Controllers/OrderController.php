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
        // Eager load items and their associated stock details
        $orders = Order::with(['items.stock', 'shop', 'rep'])->get();

        return response()->json([
            'message' => 'Orders retrieved successfully',
            'count'   => $orders->count(),
            'data'    => $orders
        ], 200);
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

                // 1. Credit Check
                if ($shop->credit_limit < $request->total_amount) {
                    throw new \Exception('Insufficient credit limit for this shop.');
                }

                // 2. Create the Order
                // Use $request->only() to prevent issues with nested arrays in create()
                $order = Order::create($request->only([
                    'shop_id', 'rep_id', 'order_date', 'total_amount', 'status', 'discount_rate', 'discount'
                ]));

                // 3. Save Items and Update Inventory
                foreach ($request->order_items as $item) {
                    $order->items()->create([
                        'product_id' => $item['product_id'],
                        'quantity'   => $item['quantity'],
                        'price'      => $item['price'],
                    ]);
                    
                    // Optional: Reduce stock here if desired
                    // $stock = Stock::find($item['product_id']);
                    // $stock->decrement('quantity', $item['quantity']);
                }

                // 4. Update Shop Credit
                $shop->credit_limit -= $request->total_amount; 
                $shop->save();

                return $order;
            });

            // Load 'items' and the 'stock' info for each item before returning
            return response()->json([
                'message' => 'Order placed successfully', 
                'order' => $order->load('items.stock') 
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    //get a specific order
    public function show($id)
    {
        $order = Order::with(['items.stock', 'shop', 'rep'])->find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json(['message' => 'Order found successfully', 'order' => $order]);
    }

    //delete an order
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }
}
