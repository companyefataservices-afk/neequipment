<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Quote;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // 1. KPIs
        $startOfCurrentMonth = Carbon::now()->startOfMonth();
        $startOfPreviousMonth = Carbon::now()->subMonth()->startOfMonth();

        // Receita Confirmada Atual (Paid, Delivered)
        $confirmedRevenueCurrent = Order::whereIn('status', ['paid', 'delivered'])
            ->where('created_at', '>=', $startOfCurrentMonth)
            ->sum('total_amount');

        // Receita em Pipeline (Processing, Shipped + Approved Quotes)
        $pendingOrdersRevenue = Order::whereIn('status', ['processing', 'shipped'])
            ->where('created_at', '>=', $startOfCurrentMonth)
            ->sum('total_amount');

        $approvedQuotesRevenue = Quote::whereIn('status', ['approved', 'payment_reported'])
            ->where('created_at', '>=', $startOfCurrentMonth)
            ->sum('total_estimated_value');

        $pipelineRevenueCurrent = $pendingOrdersRevenue + $approvedQuotesRevenue;

        // Receita Total Ganha (Confirmada + Pipeline)
        $totalEarnedCurrent = $confirmedRevenueCurrent + $pipelineRevenueCurrent;

        // Receita Total Anterior (para comparação)
        $totalRevenuePrevious = Order::whereIn('status', ['paid', 'processing', 'shipped', 'delivered'])
            ->whereBetween('created_at', [$startOfPreviousMonth, clone $startOfCurrentMonth])
            ->sum('total_amount') + 
            Quote::whereIn('status', ['approved', 'payment_reported', 'converted', 'completed'])
            ->whereBetween('created_at', [$startOfPreviousMonth, clone $startOfCurrentMonth])
            ->sum('total_estimated_value');

        $revenueChange = $totalRevenuePrevious > 0 
            ? (($totalEarnedCurrent - $totalRevenuePrevious) / $totalRevenuePrevious) * 100 
            : 0;

        $quotesCountCurrent = Quote::where('created_at', '>=', $startOfCurrentMonth)->count();
        $quotesCountPrevious = Quote::whereBetween('created_at', [$startOfPreviousMonth, clone $startOfCurrentMonth])->count();
        $quotesChange = $quotesCountPrevious > 0 
            ? (($quotesCountCurrent - $quotesCountPrevious) / $quotesCountPrevious) * 100 
            : 0;

        $activeProductsCount = Product::count();
        $totalOrdersCount = Order::whereIn('status', ['paid', 'processing', 'shipped', 'delivered'])->count();
        $averageOrderValue = $totalOrdersCount > 0 ? $confirmedRevenueCurrent / $totalOrdersCount : 0;
        
        $kpis = [
            [
                'label' => 'Receita Realizada (Paga)',
                'value' => number_format($confirmedRevenueCurrent, 0, ',', '.') . ' MT',
                'change' => ($revenueChange >= 0 ? '+' : '') . number_format($revenueChange, 1) . '%',
                'trend' => $revenueChange >= 0 ? 'up' : 'down',
                'icon' => 'DollarSign',
                'color' => 'text-whatsapp',
            ],
            [
                'label' => 'Pipeline (Ganhos Potenciais)',
                'value' => number_format($pipelineRevenueCurrent, 0, ',', '.') . ' MT',
                'change' => 'Expectativa',
                'trend' => 'up',
                'icon' => 'Clock',
                'color' => 'text-primary',
            ],
            [
                'label' => 'Ticket Médio (Vendas)',
                'value' => number_format($averageOrderValue, 0, ',', '.') . ' MT',
                'change' => 'Eficiência',
                'trend' => 'up',
                'icon' => 'ShoppingCart',
                'color' => 'text-accent',
            ],
            [
                'label' => 'Produtos Activos',
                'value' => (string)$activeProductsCount,
                'change' => 'Catálogo',
                'trend' => 'up',
                'icon' => 'Package',
                'color' => 'text-orange',
            ],
        ];

        // 2. Revenue Data (Last 6 months) - Including both realized and potential
        $revenueData = [];
        for ($i = 5; $i >= 0; $i--) {
            $currentDate = Carbon::now()->subMonths($i);
            $monthName = $currentDate->translatedFormat('M'); // Localized month name
            
            $monthOrderRevenue = Order::whereIn('status', ['paid', 'processing', 'shipped', 'delivered'])
                ->whereMonth('created_at', $currentDate->month)
                ->whereYear('created_at', $currentDate->year)
                ->sum('total_amount');

            $monthQuoteRevenue = Quote::whereIn('status', ['approved', 'payment_reported'])
                ->whereMonth('created_at', $currentDate->month)
                ->whereYear('created_at', $currentDate->year)
                ->sum('total_estimated_value');

            $totalMonthRevenue = $monthOrderRevenue + $monthQuoteRevenue;

            // Simple projection for "anterior" line
            $previousDate = $currentDate->copy()->subMonth();
            $prevMonthRevenue = Order::whereIn('status', ['paid', 'processing', 'shipped', 'delivered'])
                ->whereMonth('created_at', $previousDate->month)
                ->whereYear('created_at', $previousDate->year)
                ->sum('total_amount') +
                Quote::whereIn('status', ['approved', 'payment_reported'])
                ->whereMonth('created_at', $previousDate->month)
                ->whereYear('created_at', $previousDate->year)
                ->sum('total_estimated_value');
            
            $revenueData[] = [
                'month' => ucfirst($monthName),
                'atual' => (float)$totalMonthRevenue,
                'anterior' => (float)$prevMonthRevenue
            ];
        }

        // 3. Status Distribution
        $statusCounts = Order::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get();
        
        $statusLabels = [
            'pending_payment' => 'Pag. Pendente',
            'paid' => 'Pago',
            'processing' => 'Processando',
            'shipped' => 'Enviado',
            'delivered' => 'Entregue',
            'cancelled' => 'Cancelado'
        ];

        $statusColors = [
            'pending_payment' => 'hsl(0, 84%, 60%)',
            'paid' => 'hsl(142, 70%, 45%)',
            'processing' => 'hsl(24, 95%, 53%)',
            'shipped' => 'hsl(210, 100%, 20%)',
            'delivered' => 'hsl(142, 70%, 30%)',
            'cancelled' => 'hsl(0, 0%, 50%)'
        ];

        $statusDistribution = $statusCounts->map(function($item) use ($statusLabels, $statusColors) {
            return [
                'name' => $statusLabels[$item->status] ?? $item->status,
                'value' => $item->total,
                'color' => $statusColors[$item->status] ?? 'hsl(0,0%,80%)'
            ];
        });

        // 4. Statistics by Category
        $categoryRevenue = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->whereIn('orders.status', ['paid', 'processing', 'shipped', 'delivered'])
            ->select('categories.name', DB::raw('SUM(order_items.quantity * order_items.price_at_time) as revenue'))
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('revenue')
            ->limit(5)
            ->get();

        // 5. Top Selling Products
        $topProducts = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->whereIn('orders.status', ['paid', 'processing', 'shipped', 'delivered'])
            ->select('products.name', DB::raw('SUM(order_items.quantity) as total_sold'))
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        // 6. Funnel Data
        $funnelData = [
            ['stage' => 'RFQs Enviadas', 'value' => Quote::count()],
            ['stage' => 'Aprovadas / Negociação', 'value' => Quote::where('status', 'approved')->count()],
            ['stage' => 'Pedidos Convertidos', 'value' => Order::count()],
        ];

        // 5. Recent Orders
        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function($order) {
                return [
                    'id' => $order->order_number,
                    'client' => $order->user->name,
                    'nuit' => $order->user->nuit ?? 'N/A',
                    'value' => number_format($order->total_amount, 0, ',', '.'),
                    'status' => $order->status,
                ];
            });

        // 6. Alerts
        $alerts = $request->user()->unreadNotifications()->limit(5)->get()->map(function($notif) {
            $type = 'info';
            if (isset($notif->data['type'])) {
                if ($notif->data['type'] === 'new_quote') $type = 'warning';
                if ($notif->data['type'] === 'order_paid') $type = 'success';
            }
            return [
                'type' => $type,
                'message' => $notif->data['message'] ?? 'Nova notificação',
                'time' => $notif->created_at->diffForHumans()
            ];
        });

        return response()->json([
            'kpis' => $kpis,
            'revenueData' => $revenueData,
            'statusDistribution' => $statusDistribution,
            'categoryRevenue' => $categoryRevenue,
            'topProducts' => $topProducts,
            'funnelData' => $funnelData,
            'recentOrders' => $recentOrders,
            'alerts' => $alerts
        ]);
    }
}
