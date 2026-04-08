<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Administrador Principal (NE Equipment)
        User::updateOrCreate(
            ['email' => 'admin@neequipment.co.mz'],
            [
                'name' => 'Administrador NE Equipment',
                'password' => Hash::make('admin@neequipment'), // Altere esta palavra-passe
                'role' => 'admin',
                'is_superadmin' => true,
                'is_active' => true,
                'phone' => '+258 80 000 0000',
            ]
        );
    }
}
