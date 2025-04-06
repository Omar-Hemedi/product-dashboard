export const downloadCSV = (orders) => {
    if (orders.length === 0) {
        alert("No orders available to download.");
        return;
    }

    const headers = ["Order ID", "Order Date", "Product Name", "Price", "Quantity", "Total"];
    const rows = [];
    let grandTotal = 0;

    orders.forEach((order) => {
        order.items.forEach((item) => {
            const total = item.price * item.quantity;
            grandTotal += total;

            rows.push([
                order.id,
                order.date,
                item.title,
                item.price.toFixed(2),
                item.quantity,
                total.toFixed(2),
            ]);
        });
    });

    // Function to escape and quote CSV values safely
    const escapeCSV = (value) => {
        if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`;
        }
        return `"${value}"`;
    };

    const title = `Order History Report`;
    const timestamp = `Generated on: ${new Date().toLocaleString()}`;
    const spacer = ""; // empty row

    const csvContent = [
        escapeCSV(title),
        escapeCSV(timestamp),
        spacer,
        headers.map(escapeCSV).join(","),
        ...rows.map((row) => row.map(escapeCSV).join(",")),
        spacer,
        `,,,,,"${grandTotal.toFixed(2)}"`
    ].join("\n");

    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "order_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
