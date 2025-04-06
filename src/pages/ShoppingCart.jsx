import { useState } from "react";
import { useCart } from "../context/CartContext";
import { saveOrderToLocalStorage } from "../utils/OrderStorage";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import Alert from "../components/Alert";
import PrimaryButton from "../components/PrimaryButton";

export default function ShoppingCart() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            setAlert({ show: true, type: "error", message: "Your cart is empty!" });
            return;
        }

        const order = {
            id: Date.now(),
            items: cart,
            total: calculateTotal(),
            date: new Date().toLocaleString(),
        };

        saveOrderToLocalStorage(order);

        clearCart();

        setAlert({ show: true, type: "success", message: "Order placed successfully!" });
    };

    return (
        <AuthenticatedLayout>
            <section className="bg-red-50 rounded-lg pr-6 mr-8 py-8">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                        Shopping Cart
                    </h2>

                    {alert.show && <Alert type={alert.type} message={alert.message} />}

                    {cart.length === 0 ? (
                        <p className="mt-4 text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                                        >
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <img
                                                    className="h-20 w-20"
                                                    src={item.image}
                                                    alt={item.title}
                                                />
                                                <div className="w-full min-w-0 flex-1 space-y-4 md:max-w-md">
                                                    <p className="text-base font-medium text-gray-900">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-base font-bold text-gray-900">
                                                        ${item.price} x {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900">Order Summary</p>
                                    <div className="space-y-4">
                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-gray-900">
                                                ${calculateTotal()}
                                            </dd>
                                        </dl>
                                    </div>
                                    <PrimaryButton
                                        onClick={handleCheckout}
                                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
                                    >
                                        Proceed to Checkout
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}