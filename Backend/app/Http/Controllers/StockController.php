<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class StockController extends Controller
{
    //get all stocks
    public function index()
    {
        $stocks = Stock::all();
        return response()->json($stocks);
    }

    //add a stock
    public function store(Request $request)
    {
        $request->validate([
            'product_code' => 'required|string',
            'product_name' => 'required|string',
            'unit_price' => 'required|string',
            'quantity' => 'required|string',
            'batch_number' => 'nullable|string',
            'manufacture_date' => 'nullable|date',
        ]); 
        $stock = Stock::create($request->all());
        return response()->json(['message' => 'Stock created successfully', 'stock' => $stock], 201);
    }   

    //get a single stock
    public function show($id)
    {
        $stock = Stock::find($id);
        if ($stock) {
            return response()->json(['message' => 'Stock found successfully', 'stock' => $stock]);
        } else {
            return response()->json(['message' => 'Stock not found'], 404); 
        }
    }

    //update a stock
    public function update(Request $request, $id)
    {
        $stock = Stock::find($id);
        $request->validate([
            'product_code' => 'sometimes|required|string',
            'product_name' => 'sometimes|required|string',
            'unit_price' => 'sometimes|required|string',
            'quantity' => 'sometimes|required|string',
            'batch_number' => 'sometimes|nullable|string',
            'manufacture_date' => 'sometimes|nullable|date',
        ]);
        if ($stock) {
            $stock->update($request->all());
            return response()->json(['message' => 'Stock updated successfully', 'stock' => $stock]);
        } else {
            return response()->json(['message' => 'Stock not found'], 404);
        }
    }

    //delete a stock
    public function destroy($id)
    {
        $stock = Stock::find($id);
        if ($stock) {
            $stock->delete();
            return response()->json(['message' => 'Stock deleted successfully']);
        } else {
            return response()->json(['message' => 'Stock not found'], 404);
        }
    }
}   
