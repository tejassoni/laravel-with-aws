import FlashMessage from '@/components/flash-message';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react'; // https://lucide.dev/icons/
import { route } from 'ziggy-js';

// Define TypeScript interfaces for the product data and pagination links
interface Product {
    id: number;
    image: string | null;
    name: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
}

// Define TypeScript interfaces for the product data and pagination links
interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

// Define TypeScript interfaces for the product data and pagination links
interface Products {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

// Define TypeScript interfaces for the product data and pagination links
interface Props {
    products: Products;
}

// Define the ProductList component that takes in the products prop and renders the product list with pagination and search functionality
function ProductList({ products }: Props) {
    // Function to format the date in a more readable format
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Delete product function that confirms the deletion and sends a delete request to the server
    const deleteProduct = (productId: number) => {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        router.delete(
            route('products.destroy', {
                product: productId,
            }),
        );
    };

    // Render the product list with pagination and search functionality
    return (
        <div className="space-y-6 p-6">

           {/* Flash message starts */}
            <FlashMessage />
           {/* Flash message ends */}

            {/* Product Nav Header Starts */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Products
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage your products and inventory.
                    </p>
                </div>

                <Link
                    href={route('products.create')}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Add Product
                </Link>
            </div>
            {/* Product Nav Header Ends */}

            {/* Search Section Starts */}
            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-md border bg-background py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="text-sm text-muted-foreground">
                    {products.total} products
                </div>
            </div>
            {/* Search Section Ends */}

            {/* Table Body Section Starts */}
            <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
                <table className="w-full text-sm">
                    <thead className="border-b bg-muted/50">
                        <tr>
                            <th className="px-6 py-3 text-center font-medium">
                                Image
                            </th>

                            <th className="px-6 py-3 text-center font-medium">
                                Product
                            </th>

                            <th className="px-6 py-3 text-center font-medium">
                                Description
                            </th>

                            <th className="px-6 py-3 text-center font-medium">
                                Price
                            </th>

                            <th className="px-6 py-3 text-center font-medium">
                                Created
                            </th>

                            <th className="px-6 py-3 text-center font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {products.data.length > 0 ? (
                            products.data.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-muted/30"
                                >
                                    {/* Image */}
                                    <td className="px-6 py-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-16 w-16 rounded-md object-cover"
                                        />
                                    </td>

                                    {/* Product */}
                                    <td className="px-6 py-4">
                                        <div className="font-medium">
                                            {product.name}
                                        </div>

                                        <div className="text-xs text-muted-foreground">
                                            #{product.id}
                                        </div>
                                    </td>

                                    {/* Description */}
                                    <td className="max-w-xs px-6 py-4">
                                        <p className="truncate text-muted-foreground">
                                            {product.description || '-'}
                                        </p>
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4 font-medium">
                                        $ &nbsp;
                                        {Number(product.price).toFixed(2)}
                                    </td>

                                    {/* Created */}
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {formatDate(product.created_at)}
                                    </td>

                                    {/* Actions Starts */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            {/* Show Starts */}
                                            <Link
                                                href={route('products.show', {
                                                    id: product.id,
                                                })}
                                                className="rounded-md p-2 hover:bg-muted"
                                                title="Show"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            {/* Show Ends */}

                                            {/* Edit Starts */}
                                            <Link
                                                href={route('products.edit', {
                                                    id: product.id,
                                                })}
                                                className="rounded-md p-2 hover:bg-muted"
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            {/* Edit Ends */}

                                            {/* Delete Starts */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteProduct(product.id)
                                                }
                                                className="rounded-md p-2 text-destructive hover:bg-muted"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            {/* Delete Ends */}
                                        </div>
                                    </td>
                                    {/* Actions Ends */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-12 text-center text-muted-foreground"
                                >
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Table Body Section Ends */}

            {/* Pagination Section Starts */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Showing {products.from ?? 0} to {products.to ?? 0} of{' '}
                    {products.total} products
                </p>

                <div className="flex gap-2">
                    {products.prev_page_url && (
                        <Link
                            href={route('products.index', {
                                page: products.current_page - 1,
                            })}
                            className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
                        >
                            Previous
                        </Link>
                    )}

                    {products.next_page_url && (
                        <Link
                            href={route('products.index', {
                                page: products.current_page + 1,
                            })}
                            className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
                        >
                            Next
                        </Link>
                    )}
                </div>
            </div>
            {/* Pagination Section Ends */}
        </div>
    );
}

export default ProductList;
