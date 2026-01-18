<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class ForgotPasswordController extends Controller
{
    // Send password reset link
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);

        try {
            $status = Password::sendResetLink(
                $request->only('email')
            );

            Log::info('Password reset link status: ' . $status);

            return $status === Password::RESET_LINK_SENT
                ? response()->json(['message' => 'Reset link sent to your email.', 'status' => $status])
                : response()->json(['message' => 'Unable to send reset link.', 'status' => $status], 400);
        } catch (\Exception $e) {
            Log::error('Password reset error: ' . $e->getMessage());
            return response()->json(['message' => 'Server error. Please try again later.'], 500);
        }
    }

    // Reset password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        try {
            // In the resetPassword method, add this before returning:
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function (User $user, string $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));

                    $user->save();

                    event(new PasswordReset($user));
                    
                    // Optional: Send password changed notification
                    $user->notify(new \App\Notifications\PasswordChangedNotification());
                }
            );

            Log::info('Password reset status: ' . $status);

            return $status === Password::PASSWORD_RESET
                ? response()->json(['message' => 'Password reset successful.', 'status' => $status])
                : response()->json(['message' => 'Invalid or expired token.', 'status' => $status], 400);
        } catch (\Exception $e) {
            Log::error('Password reset error: ' . $e->getMessage());
            return response()->json(['message' => 'Server error. Please try again later.'], 500);
        }
    }
}