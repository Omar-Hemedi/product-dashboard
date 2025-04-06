import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import axios from "axios";
import Pagination from "../components/Pagination";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductDashboard() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOption, setSortOption] = useState("");
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }

        filtered = filtered.filter(
            (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        if (sortOption === "price-asc") {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            filtered = filtered.sort((a, b) => b.price - a.price);
        } else if (sortOption === "rating") {
            filtered = filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        }

        setFilteredProducts(filtered);
    }, [category, priceRange, sortOption, products]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <AuthenticatedLayout>
            <section className="bg-red-50 rounded-lg p-4">
                <div className="p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                        <h2 className="text-lg font-semibold">
                            Products: <span className="text-red-500">{filteredProducts.length}</span>
                        </h2>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2"
                            >
                                <option value="">All Categories</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="women's clothing">Women's Clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">Electronics</option>
                            </select>

                            <div className="flex items-center gap-2">
                                <span>Price:</span>
                                <input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                    className="border border-gray-300 rounded px-2 py-1 w-20"
                                    placeholder="Min"
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                    className="border border-gray-300 rounded px-2 py-1 w-20"
                                    placeholder="Max"
                                />
                            </div>

                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2"
                            >
                                <option value="">Sort By</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4">Image</th>
                                    <th className="py-2 px-4">Title</th>
                                    <th className="py-2 px-4">Category</th>
                                    <th className="py-2 px-4">Price</th>
                                    <th className="py-2 px-4">Rating</th>
                                    <th className="py-2 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            {product.title.length > 30
                                                ? `${product.title.substring(0, 30)}...`
                                                : product.title}
                                        </td>
                                        <td className="py-2 px-4">{product.category}</td>
                                        <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                                        <td className="py-2 px-4">
                                            {product.rating.rate} ({product.rating.count} reviews)
                                        </td>
                                        <td className="py-4 px-6 flex gap-2">
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="inline-flex items-center text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                                <FaShoppingCart className="mr-1" />
                                                Cart
                                            </button>

                                            <button
                                                onClick={() => navigate(`/products/${product.id}`)}
                                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </section>
        </AuthenticatedLayout>
    );
}