<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

print_r(array_values(App\Models\Product::orderBy('id', 'desc')->take(2)->get(['id','name','created_by'])->toArray()));
