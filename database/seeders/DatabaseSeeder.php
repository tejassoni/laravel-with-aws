<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        // calls the Seeders
        $this->call([
            CategorySeeder::class, // Call the CategorySeeder to seed categories
            ProductSeeder::class, // Call the ProductSeeder to seed products
        ]);
    }
}
