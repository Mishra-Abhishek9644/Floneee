"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "@/components/Breadcrumb";
import { AppDispatch, RootState } from "@/Store";
import { logout } from "@/Store/Slices/loginSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCartList, fetchCart } from "@/Store/Slices/cartSlice";
import { clearCompareLocal, fetchCompare } from "@/Store/Slices/compareSlice";
import { clearWishlist, clearWishlistLocal } from "@/Store/Slices/wishlistSlice";
import { ShoppingCart, Heart, GitCompare, Package } from "lucide-react";


const UserDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user: any = useSelector(
    (state: RootState) => state.login.currentUser
  );

  const [show, setShow] = useState("orders");
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);

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

  useEffect(() => {
    dispatch(fetchCompare());
  }, []);

  const handleLogout = async () => {
    try {
      
      dispatch(clearCartList());
      dispatch(clearCompareLocal());
      dispatch(clearWishlistLocal());

      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());
      toast.success("Logged out");
      
      router.replace("/login");
    } catch {
      toast.error("Logout failed");
    }
  };


  /*  SKELETON  */
  if (loading) {
    return (
      <>
        <Breadcrumb />

        <div className="max-w-6xl mx-auto py-20 animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 w-40 bg-gray-300 rounded" />
            <div className="h-9 w-24 bg-gray-300 rounded" />
          </div>

          <div className="bg-gray-100 p-6 rounded-md mb-8 space-y-3">
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 p-5 rounded-md text-center"
              >
                <div className="h-4 w-20 bg-gray-300 rounded mx-auto mb-3" />
                <div className="h-6 w-12 bg-gray-300 rounded mx-auto" />
              </div>
            ))}
          </div>

          <div className="bg-white shadow p-6 rounded-md">
            <div className="h-5 w-40 bg-gray-300 rounded mb-4" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-b py-3 flex justify-between"
              >
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                  <div className="h-3 w-16 bg-gray-300 rounded" />
                </div>
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!user || !dashboard) return null;

  return (
    <>
      <Breadcrumb />

      <div className="max-w-6xl lg:mx-auto py-20 mx-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Account</h1>

          <button
            onClick={handleLogout}
            className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-sm cursor-pointer capitalize duration-500"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-md mb-8">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-purple-600 font-semibold">
            Role: {user.role}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <button
            onClick={() => router.push("/cart")}
            className="bg-gray-200 p-5 rounded-md text-center hover:bg-gray-300 transition text-gray-600"
          >
            <ShoppingCart className="mx-auto mb-2" size={22} />
            <p className="text-sm">Cart Items</p>
            <p className="text-2xl font-bold">{dashboard.cartCount}</p>
          </button>

          <button
            onClick={() => router.push("/wishlist")}
            className="bg-gray-200 p-5 rounded-md text-center hover:bg-gray-300 transition text-gray-600"
          >
            <Heart className="mx-auto mb-2" size={22} />
            <p className="text-sm">Wishlist</p>
            <p className="text-2xl font-bold">{dashboard.wishlistCount}</p>
          </button>

          <button
            onClick={() => router.push("/compare")}
            className="bg-gray-200 p-5 rounded-md text-center hover:bg-gray-300 transition text-gray-600"
          >
            <GitCompare className="mx-auto mb-2" size={22} />
            <p className="text-sm">Compare</p>
            <p className="text-2xl font-bold">{dashboard.compareCount}</p>
          </button>

          <button
            onClick={() => setShow("orders")}
            className={`p-5 rounded-md text-center bg-gray-300 transition text-gray-600`}
          >
            <Package className="mx-auto mb-2" size={22} />
            <p className="text-sm">Orders</p>
            <p className="text-2xl font-bold">{dashboard.ordersCount}</p>
          </button>
        </div>


        {show === "orders" && (
          <>
            <div className="bg-white shadow p-6 rounded-md">
              <h2 className="font-semibold mb-6">Recent Orders</h2>

              {dashboard.recentOrders.length === 0 ? (
                <p className="text-gray-500">No orders yet</p>
              ) : (
                /*  ORDERS GRID  */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboard.recentOrders.map((order: any) => (
                    <div
                      key={order._id}
                      className="border border-gray-300 rounded-lg p-5 bg-white hover:shadow-md transition"
                    >
                      {/*  ORDER HEADER  */}
                      <div className="grid grid-cols-1 gap-4 border-b border-gray-300 pb-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">ORDER ID</p>
                          <p className="font-semibold text-gray-800">
                            #{order._id.slice(-6)}
                          </p>
                          <p className="text-xs text-gray-400">
                            Placed on{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 items-center">
                          <p className="text-lg font-semibold text-gray-900">
                            ₹{order.totalAmount}
                          </p>

                          <span
                            className={`justify-self-end text-xs font-semibold px-3 py-1 rounded-full uppercase
                  ${order.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                  ${order.status === "PAID" && "bg-blue-100 text-blue-700"}
                  ${order.status === "SHIPPED" && "bg-purple-100 text-purple-700"}
                  ${order.status === "DELIVERED" && "bg-green-100 text-green-700"}
                  ${order.status === "CANCELLED" && "bg-red-100 text-red-700"}
                `}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/*  ORDER ITEMS  */}
                      <div className="space-y-4">
                        {order.items.map((item: any) => (
                          <div
                            key={item.productId}
                            className="grid grid-cols-[64px_1fr_auto] gap-4 items-center"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded border"
                            />

                            <div>
                              <p className="font-medium text-gray-800 line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.color} • {item.size}
                              </p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>

                            <p className="font-semibold text-gray-900">
                              ₹{item.subtotal}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </>
  );
};



export default UserDashboard;
