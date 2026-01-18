<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Notifications\NewUserNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class UserController extends Controller
{
    //get all users
    public function getAllUsers()
    {
        $users = User::with('roles')->get();
        return response()->json($users, 200);
    }
    // Create a new user with role assignment and send email
    public function createUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nic' => 'required|string|unique:users',
            'mobile' => 'nullable|string',
            'address' => 'nullable|string',
            'commission_rate' => 'nullable|string',
            'commission_amount' => 'nullable|string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|exists:roles,name',
        ]);

        // Generate a random password if not provided
        $password = $request->password ?? Str::random(8);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'nic' => $request->nic,
            'mobile' => $request->mobile,
            'address' => $request->address,
            'commission_rate' => $request->commission_rate ?? '0.00',
            'commission_amount' => $request->commission_amount ?? '0.00',
            'password' => Hash::make($password),
            'status' => 'active',
        ]);

        // Attach the role to the user
        $role = Role::where('name', $request->role)->first();
        $user->roles()->attach($role->id);

        // Send email notification with credentials
        try {
            Notification::send($user, new NewUserNotification($user, $password));
        } catch (\Exception $e) {
            \Log::error('Failed to send email: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'User created successfully and email sent',
            'user' => $user->load('roles'),
            'temporary_password' => $password // Return for testing purposes
        ], 201);
    }

    // User Update Method
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'nic' => 'sometimes|required|string|unique:users,nic,' . $user->id,
            'mobile' => 'sometimes|nullable|string',
            'address' => 'sometimes|nullable|string',
            'commission_rate' => 'sometimes|nullable|string',
            'commission_amount' => 'sometimes|nullable|string',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:8',
            'role' => 'sometimes|required|string|exists:roles,name',
        ]);

        // Update user fields if provided
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('nic')) {
            $user->nic = $request->nic;
        }
        if ($request->has('mobile')) {
            $user->mobile = $request->mobile;
        }
        if ($request->has('address')) {
            $user->address = $request->address;
        }
        if ($request->has('commission_rate')) {
            $user->commission_rate = $request->commission_rate;
        }
        if ($request->has('commission_amount')) {
            $user->commission_amount = $request->commission_amount;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        // Update role if provided
        if ($request->has('role')) {
            $role = Role::where('name', $request->role)->first();
            $user->roles()->sync([$role->id]);
        }

        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
    }
    
    // Get user by ID
    public function getUser($id)
    {
        $user = User::with('roles')->findOrFail($id);
        return response()->json($user, 200);
    }

    // Delete user by ID
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}

