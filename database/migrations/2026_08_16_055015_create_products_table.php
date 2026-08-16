<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Name of the product');
            $table->text('description')->nullable()->comment('Description of the product');
            $table->decimal('price', 8, 2)->comment('Price of the product');
            $table->unsignedBigInteger('category_id')->comment('ID of the category to which the product belongs');
            $table->string('image')->nullable()->comment('Image of the product');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
