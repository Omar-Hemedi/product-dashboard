import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    const fetchProduct = useCallback(async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    if (!product) {
        return (
            <AuthenticatedLayout>
                <div className="p-6">
                    <p>Loading product details...</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <section className="py-8 bg-red-50 rounded-lg md:py-16">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="bg-red-50 shrink-0 max-w-md lg:max-w-lg mx-auto">
                            <img
                                className="w-full max-h-64 object-contain rounded-lg"
                                src={product.image}
                                alt={product.title}
                            />
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                {product.title}
                            </h1>
                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                    ${product.price.toFixed(2)}
                                </p>

                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <svg
                                                key={index}
                                                className={`w-4 h-4 ${
                                                    index < Math.floor(product.rating.rate)
                                                        ? "text-yellow-300"
                                                        : "text-gray-300"
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-sm font-medium leading-none text-gray-500">
                                        ({product.rating.rate})
                                    </p>
                                    <button
                                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                                    >
                                        {product.rating.count} Reviews
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <button
                                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                                >
                                    Add to Favorites
                                </button>

                                <button
                                    onClick={() => addToCart(product)}
                                    className="text-white mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
                                >
                                    <FaShoppingCart />
                                    Cart
                                </button>
                            </div>

                            <hr className="my-6 md:my-8 border-red-500" />

                            <p className="mb-6 text-gray-500">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}