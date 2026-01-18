<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewUserNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $user;
    public $password;

    public function __construct($user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Your Account Credentials - Paradise Spice')
            ->greeting('Hello ' . $this->user->name . '!')
            ->line('Your account has been created successfully.')
            ->line('Here are your login credentials:')
            ->line('Email: ' . $this->user->email)
            ->line('Password: ' . $this->password)
            ->line('Please login and change your password immediately.')
            ->action('Login to System', url('/'))
            ->line('Thank you for using our system!');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}