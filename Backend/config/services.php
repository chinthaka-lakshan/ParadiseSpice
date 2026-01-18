<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Reset Configuration
    |--------------------------------------------------------------------------
    |
    | Configure the frontend URL for password reset links. This URL is used
    | in the password reset notification to redirect users to your React app.
    |
    */

    'password_reset' => [
        'frontend_url' => env('FRONTEND_URL', 'http://localhost:5173'),
        'reset_url' => env('FRONTEND_URL', 'http://localhost:5173') . '/reset-password',
        'expire' => 60, // Password reset link expiration in minutes
    ],

    /*
    |--------------------------------------------------------------------------
    | Application URLs
    |--------------------------------------------------------------------------
    |
    | URLs used throughout the application for notifications, emails, etc.
    |
    */

    'app' => [
        'name' => env('APP_NAME', 'Paradise Spice'),
        'url' => env('APP_URL', 'http://localhost:8000'),
        'frontend_url' => env('FRONTEND_URL', 'http://localhost:5173'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Email Configuration
    |--------------------------------------------------------------------------
    |
    | Email settings for different types of notifications
    |
    */

    'email' => [
        'from_address' => env('MAIL_FROM_ADDRESS', 'noreply@paradisespice.com'),
        'from_name' => env('MAIL_FROM_NAME', 'Paradise Spice'),
        'support_email' => env('SUPPORT_EMAIL', 'support@paradisespice.com'),
    ],

];