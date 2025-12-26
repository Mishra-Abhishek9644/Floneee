"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "@/components/Breadcrumb";
import { RootState } from "@/Store";
import { logout } from "@/Store/Slices/loginSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loadCartList } from "@/Store/Slices/cartSlice";
import { clearCompareList } from "@/Store/Slices/compareSlice";
import { clearWishlist } from "@/Store/Slices/wishlistSlice";


const UserDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user:any = useSelector((state: RootState) => state.login.currentUser);

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);
   const currentUser = useSelector(
            (state: any) => state.login.currentUser
        );

  useEffect(() => {
    if (!user) return;

    const loadDashboard = async () => {
      try {
        const res = await fetch("/api/user/dashboard", {
          credentials: "include",
        });
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

  // 🔥 LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());          // Redux clear
      toast.success("Logged out");
      dispatch(loadCartList([]));
      dispatch(clearCompareList({ userId:user._id }));
      dispatch(clearWishlist({ userId:currentUser._id }));

      router.replace("/login");    // Redirect
    } catch {
      toast.error("Logout failed");
    }
  };

  if (!user || loading || !dashboard) return null;

  return (
    <>
      <Breadcrumb />

      <div className="max-w-6xl mx-auto py-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Account</h1>

          {/* 🔥 LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-red-600 hover:text-white px-4 py-2 text-sm uppercase duration-500"
          >
            Logout
          </button>
        </div>

        {/* PROFILE */}
        <div className="bg-gray-100 p-6 rounded-md mb-8">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="text-purple-600 font-semibold">Role: {user.role}</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <Stat title="Cart Items" value={dashboard.cartCount} />
          <Stat title="Wishlist" value={dashboard.wishlistCount} />
          <Stat title="Compare" value={dashboard.compareCount} />
          <Stat title="Orders" value={dashboard.ordersCount} />
        </div>

        {/* RECENT ORDERS */}
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
