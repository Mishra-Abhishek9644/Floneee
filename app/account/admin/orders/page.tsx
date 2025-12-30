"use client";

import { useEffect, useState } from "react";

type ViewType = "card" | "table";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<ViewType>("table");

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await fetch("/api/admin/orders", {
                    credentials: "include",
                });
                const data = await res.json();
                setOrders(data.orders || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return <p className="p-6">Loading orders...</p>;

    return (
        <div className="p-6 border-gray-300 border rounded-md shadow-md">
            {/*  HEADER  */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">All Orders</h1>

                <div className="flex gap-2">
                    <button
                        onClick={() => setView("table")}
                        className={`px-4 py-2 text-sm border-gray-300 border rounded ${view === "table" ? "bg-purple-600 text-white" : "bg-white"
                            }`}
                    >
                        Table View
                    </button>

                    <button
                        onClick={() => setView("card")}
                        className={`px-4 py-2 text-sm border-gray-300 border rounded ${view === "card" ? "bg-purple-600 text-white" : "bg-white"
                            }`}
                    >
                        Card View
                    </button>
                </div>
            </div>

            {/*  CONTENT  */}
            {view === "table" ? (
                <OrdersTable orders={orders} />
            ) : (
                <OrdersCards orders={orders} />
            )}
        </div>
    );
};

export default AdminOrdersPage;

// TABLE VIEW
const OrdersTable = ({ orders }: { orders: any[] }) => (
    <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                </tr>
            </thead>

            <tbody>
                {orders.map((order) => (
                    <tr key={order._id} className="border-gray-300 border-t">
                        <td className="p-3 font-medium">
                            #{order._id.slice(-6)}
                        </td>
                        <td className="p-3">
                            {order.userId?.email || "User"}
                        </td>
                        <td className="p-3">
                            {order.items.length}
                        </td>
                        <td className="p-3 font-semibold">
                            ₹{order.totalAmount}
                        </td>
                        <td className="p-3">
                            <StatusBadge status={order.status} />
                        </td>
                        <td className="p-3 text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// CARD VIEW
const OrdersCards = ({ orders }: { orders: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
            <div
                key={order._id}
                className="border-gray-300 border rounded-lg p-5 bg-white hover:shadow-md transition flex flex-col"
            >
                {/*  HEADER  */}
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-semibold text-gray-800">
                            #{order._id.slice(-6)}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <StatusBadge status={order.status} />
                </div>

                {/*  USER  */}
                <div className="text-sm text-gray-600 mb-3">
                    <p className="font-medium text-gray-800">
                        {order.userId?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {order.userId?.email}
                    </p>
                </div>

                {/*  ITEMS  */}
                <div className="space-y-3 border-gray-300 border-t border-b py-3 mb-3">
                    {order.items.map((item: any) => (
                        <div
                            key={item.productId}
                            className="flex items-center gap-3"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded border-gray-300 border"
                            />

                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                                    {item.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Qty: {item.quantity} • {item.color} • {item.size}
                                </p>
                            </div>

                            <p className="text-sm font-semibold text-gray-800">
                                ₹{item.subtotal}
                            </p>
                        </div>
                    ))}
                </div>

                {/*  FOOTER  */}
                <div className="flex justify-between items-center mt-auto">
                    <p className="text-sm text-gray-500">
                        {order.items.length} item(s)
                    </p>

                    <p className="text-lg font-bold text-gray-900">
                        ₹{order.totalAmount}
                    </p>
                </div>
            </div>
        ))}
    </div>
);

// STATUS BADGE
const StatusBadge = ({ status }: { status: string }) => (
    <span
        className={`text-xs px-3 py-1 rounded-full font-semibold
      ${status === "PENDING" && "bg-yellow-100 text-yellow-700"}
      ${status === "PAID" && "bg-blue-100 text-blue-700"}
      ${status === "SHIPPED" && "bg-purple-100 text-purple-700"}
      ${status === "DELIVERED" && "bg-green-100 text-green-700"}
      ${status === "CANCELLED" && "bg-red-100 text-red-700"}
    `}
    >
        {status}
    </span>
);
