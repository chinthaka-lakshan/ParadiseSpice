<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Use env vars if provided, otherwise fallback to defaults
        $name = env('ADMIN_NAME', 'Master Admin');
        $email = env('ADMIN_EMAIL', 'master@example.com');
        $password = env('ADMIN_PASSWORD', 'Masteradmin@123');

        // Ensure role exists
        $role = Role::firstOrCreate(['name' => 'Master Admin']);

        // Create or fetch user
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'status' => 'active',
            ]
        );

        // Attach role if not already attached
        if (!$user->roles()->where('name', $role->name)->exists()) {
            $user->roles()->attach($role->id);
        }

        // Optionally create & display a personal access token (helpful for testing)
        $token = $user->createToken('master-admin-seed-token')->plainTextToken;

        // Print useful info to the console
        $this->command->info('Master Admin seeded:');
        $this->command->line("  email: {$email}");
        $this->command->line("  password: {$password}");
        $this->command->line("  token: {$token}");
    }
}
