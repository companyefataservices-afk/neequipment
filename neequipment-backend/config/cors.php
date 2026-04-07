<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://b2b.neequipment.co.mz',
        'http://localhost:5173', // Para desenvolvimento local (Vite)
        'http://localhost:3000'   // Alternativa local
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    
    
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
