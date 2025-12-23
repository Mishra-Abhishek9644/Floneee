"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "@/components/Breadcrumb";
import { RootState } from "@/Store";

const UserDashboard = () => {
  const user = useSelector((state: RootState) => state.login.currentUser);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    const loadDashboard = async () => {
      try {
        const res = await fetch("/api/user/dashboard");
        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  if (!user || loading) return null;

  return (
    <>
      <Breadcrumb />

      <div className="max-w-6xl mx-auto py-20">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>

        {/* ================= PROFILE ================= */}
        <div className="bg-gray-100 p-6 rounded-md mb-8">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="text-purple-600 font-semibold">Role: USER</p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <Stat title="Cart Items" value={dashboard.cartCount} />
          <Stat title="Wishlist" value={dashboard.wishlistCount} />
          <Stat title="Compare" value={dashboard.compareCount} />
          <Stat title="Orders" value={dashboard.ordersCount} />
        </div>

        {/* ================= RECENT ORDERS ================= */}
        <div className="bg-white shadow p-6 rounded-md">
          <h2 className="font-semibold mb-4">Recent Orders</h2>

          {dashboard.recentOrders.length === 0 ? (
            <p className="text-gray-500">No orders yet</p>
          ) : (
            dashboard.recentOrders.map((order: any) => (
              <div
                key={order._id}
                className="border-b py-3 flex justify-between"
              >
                <div>
                  <p className="font-medium">₹{order.totalAmount}</p>
                  <p className="text-sm text-gray-500">
                    {order.items.length} item(s)
                  </p>
                </div>

                <span className="text-sm text-purple-600">
                  {order.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const Stat = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-gray-100 p-5 rounded-md text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default UserDashboard;
