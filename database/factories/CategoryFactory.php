<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'image' => $this->dummyImageUrl(),
        ];
    }

    /**
     * Generate a dummy image URL for the category.
     *
     * @return string
     */
    private function dummyImageUrl(): string
    {
        $imageProviders = [
            fn() => 'https://placehold.co/640x480?text=' . urlencode(fake()->word()),
            fn() => 'https://picsum.photos/640/480?random=' . fake()->numberBetween(1, 10000),
            fn() => 'https://dummyimage.com/640x480/009988/ffffff&text=' . urlencode(fake()->word()),
            fn() => 'https://placehold.jp/640x480.png?text=' . urlencode(fake()->word()),
            fn() => 'https://loremflickr.com/640/480/product?lock=' . fake()->numberBetween(1, 10000),
        ];

        return fake()->randomElement($imageProviders)();
    }
}
