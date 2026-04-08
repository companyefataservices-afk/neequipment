<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Product;

class ProductPendingApproval extends Notification
{
    use Queueable;

    protected $product;
    protected $creator;

    /**
     * Create a new notification instance.
     */
    public function __construct(Product $product)
    {
        $this->product = $product;
        $this->creator = $product->creator;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'creator_name' => $this->creator ? $this->creator->name : 'Desconhecido',
            'message' => 'Novo produto aguardando aprovação: ' . $this->product->name,
            'action_url' => '/admin/products/' . $this->product->id,
            'type' => 'product_pending'
        ];
    }
}
