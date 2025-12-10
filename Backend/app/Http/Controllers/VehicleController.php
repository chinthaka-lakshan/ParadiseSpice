<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    //get all vehicles
    public function index()
    {
        $vehicles = Vehicle::all();
        return response()->json($vehicles);
    }

    //add a vehicle
    public function store(Request $request)
    {
        $request->validate([
            'vehicle_owner_name' => 'required|string',
            'vehicle_reg_no' => 'required|string',
            'make_model' => 'required|string',
            'contact_number' => 'required|string',
        ]);

        $vehicle = Vehicle::create([
            'vehicle_owner_name' => $request->vehicle_owner_name,
            'vehicle_reg_no' => $request->vehicle_reg_no,
            'make_model' => $request->make_model,
            'contact_number' => $request->contact_number,
        ]);

        return response()->json([
            'message' => 'Vehicle added successfully',
            'vehicle' => $vehicle
        ], 201);
    }

    //get a single vehicle
    public function show($id)
    {
        $vehicle = Vehicle::find($id);
        if ($vehicle) {
            return response()->json($vehicle);
        } else {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }
    }

    //update a vehicle
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        $request->validate([
            'vehicle_owner_name' => 'sometimes|required|string',
            'vehicle_reg_no' => 'sometimes|required|string',
            'make_model' => 'sometimes|required|string',
            'contact_number' => 'sometimes|required|string',
        ]);

        $vehicle->update($request->only([
            'vehicle_owner_name',
            'vehicle_reg_no',
            'make_model',
            'contact_number',
        ]));

        return response()->json([
            'message' => 'Vehicle updated successfully',
            'vehicle' => $vehicle
        ]);
    }

    //delete a vehicle
    public function destroy($id)
    {
        $vehicle = Vehicle::find($id);
        if ($vehicle) {
            $vehicle->delete();
            return response()->json(['message' => 'Vehicle deleted']);
        } else {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }
    }
}