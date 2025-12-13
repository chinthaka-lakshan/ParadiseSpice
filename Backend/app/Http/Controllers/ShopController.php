<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;

class ShopController extends Controller
{
    //get all shops
    public function index()
    {
        $shops = Shop::all();
        return response()->json($shops);
    }

    //add a shop
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shop_name' => 'required|string',
            'owner_name' => 'nullable|string',
            'owner_dob' => 'nullable|date',
            'contact_number' => 'required|string',
            'address' => 'required|string',
            'map_location' => 'nullable|string',
            'credit_limit' => 'nullable|numeric|min:0',
            'return_balance' => 'nullable|numeric|min:0',
        ]);

        // Set credit_balance equal to credit_limit
        $validated['credit_balance'] = $validated['credit_limit'] ?? 0;

        $shop = Shop::create($validated);

        return response()->json([
            'message' => 'Shop created successfully',
            'shop' => $shop
        ], 201);
    }


    //get a single shop
    public function show($id)
    {
        $shop = Shop::find($id);
        if ($shop) {
            return response()->json(['message' => 'Shop found successfully', 'shop' => $shop]);
        } else {
            return response()->json(['message' => 'Shop not found'], 404);
        }
    }

    //update a shop
    public function update(Request $request, $id)
    {
        $shop = Shop::find($id);
        $request->validate([
            'shop_name' => 'sometimes|required|string',
            'owner_name' => 'sometimes|nullable|string',
            'owner_dob' => 'sometimes|nullable|string',
            'contact_number' => 'sometimes|required|string',
            'address' => 'sometimes|required|string',
            'map_location' => 'sometimes|nullable|string',
            'credit_limit' => 'sometimes|nullable|string',
            'credit_balance' => 'sometimes|nullable|string',
            'return_balance' => 'sometimes|nullable|string',
        ]);
        if (!$shop) {
            return response()->json(['message' => 'Shop not found'], 404);
        }
        $shop->update($request->all());
        return response()->json(['message' => 'Shop updated successfully', 'shop' => $shop]);
    }

    //delete a shop
    public function destroy($id)
    {
        $shop = Shop::find($id);
        if (!$shop) {
            return response()->json(['message' => 'Shop not found'], 404);
        }
        $shop->delete();
        return response()->json(['message' => 'Shop deleted successfully']);
    }
}