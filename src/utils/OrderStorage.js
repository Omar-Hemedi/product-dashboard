export const saveOrderToLocalStorage = (order) => {
    const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    existingOrders.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(existingOrders));
};

export const getOrderHistoryFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("orderHistory")) || [];
};