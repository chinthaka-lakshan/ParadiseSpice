<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderReturn;
use App\Models\Shop;
use App\Models\Stock;
use Illuminate\Support\Facades\DB;

class OrderReturnController extends Controller
{
    //get all order returns
    public function index()
    {
        $orderReturns = OrderReturn::with('shop', 'rep', 'driver', 'items.stock')->get();
        return response()->json($orderReturns);
    }


    //store order return
    public function store(Request $request)
    {
        $request->validate([
            'shop_id' => 'required|exists:shops,id',
            'rep_id' => 'required|exists:users,id',
            'return_date' => 'required|date',
            'total' => 'required|numeric',
            'return_items' => 'required|array',
            'return_items.*.product_id' => 'required|exists:stocks,id',
            'return_items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            $orderReturn = DB::transaction(function () use ($request) {
                // 1. Create the Main Return Record
                $orderReturn = OrderReturn::create([
                    'shop_id' => $request->shop_id,
                    'rep_id' => $request->rep_id,
                    'return_date' => $request->return_date,
                    'total' => $request->total,
                    'status' => 'completed'
                ]);

                // 2. Loop through items to update Stock and Save items
                foreach ($request->return_items as $item) {
                    $orderReturn->items()->create([
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                    ]);

                    // Update Stock: Increase quantity because item is returned
                    $stock = Stock::find($item['product_id']);
                    $stock->increment('quantity', $item['quantity']);
                }

                // 3. Update Shop Return Balance
                $shop = Shop::findOrFail($request->shop_id);
                $shop->increment('return_balance', $request->total);

                return $orderReturn;
            });

            return response()->json([
                'message' => 'Return processed and shop balance updated',
                'data' => $orderReturn->load('items')
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    //get single order return
    public function show($id)
    {
        $orderReturn = OrderReturn::with('shop', 'rep', 'driver', 'items.stock')->findOrFail($id);
        return response()->json($orderReturn);
    }

    //delete order return
    public function destroy($id)
    {
        $orderReturn = OrderReturn::findOrFail($id);
        $orderReturn->delete();
        return response()->json(['message' => 'Order return deleted successfully']);;
    }
}