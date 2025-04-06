import { useState } from "react";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { getOrderHistoryFromLocalStorage } from "../utils/OrderStorage";
import { downloadCSV } from "../utils/downloadCSV";
import Pagination from "../components/Pagination";

export default function OrderHistory() {
    const orderHistory = getOrderHistoryFromLocalStorage();
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const totalPages = Math.ceil(orderHistory.length / ordersPerPage);

    const currentOrders = orderHistory.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDownload = () => {
        downloadCSV(orderHistory); 
    };

    return (
        <AuthenticatedLayout>
            <section className="bg-red-50 rounded-lg p-6">
                <div className="mx-auto max-w-screen-xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            Order History
                        </h2>
                        <button
                            onClick={handleDownload}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Download Report
                        </button>
                    </div>

                    {orderHistory.length === 0 ? (
                        <p className="mt-4 text-gray-500">No orders found.</p>
                    ) : (
                        <div className="mt-6 space-y-4">
                            {currentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <p className="text-sm text-gray-500">
                                        Order Date: {order.date}
                                    </p>
                                    <ul className="mt-2 space-y-2">
                                        {order.items.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex justify-between text-gray-900"
                                            >
                                                <span>{item.title}</span>
                                                <span>
                                                    ${item.price} x {item.quantity}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-2 font-bold text-gray-900">
                                        Total: ${order.total}
                                    </p>
                                </div>
                            ))}

                            {/* Pagination Component */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}