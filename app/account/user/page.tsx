"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "@/components/Breadcrumb";
import { AppDispatch, RootState } from "@/Store";
import { logout } from "@/Store/Slices/loginSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCartList } from "@/Store/Slices/cartSlice";
import { clearCompareLocal } from "@/Store/Slices/compareSlice";
import { clearWishlistLocal } from "@/Store/Slices/wishlistSlice";
import {
  ArrowRight,
  CalendarDays,
  GitCompare,
  Heart,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingCart,
  UserRound,
} from "lucide-react";

type DashboardOrderItem = {
  productId: string;
  title: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  subtotal: number;
};

type DashboardOrder = {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  items: DashboardOrderItem[];
};

type DashboardData = {
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  ordersCount: number;
  recentOrders: DashboardOrder[];
};

const statusStyles: Record<DashboardOrder["status"], string> = {
  PENDING: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  PAID: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  SHIPPED: "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
  DELIVERED: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  CANCELLED: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
};

const formatAmount = (value: number) => `Rs. ${value.toLocaleString("en-IN")}`;


const UserDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.login.currentUser);

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadDashboard = async () => {
      try {
        const res = await fetch("/api/user/dashboard", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = (await res.json()) as DashboardData;
        setDashboard(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

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


  if (loading) {
    return (
      <>
        <Breadcrumb />

        <div className="max-w-6xl mx-auto px-5 py-12 md:py-20 animate-pulse">
          <div className="rounded-[2rem] bg-black p-8 md:p-10 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4">
                <div className="h-4 w-28 rounded-full bg-white/20" />
                <div className="h-10 w-72 rounded-full bg-white/10" />
                <div className="h-4 w-56 rounded-full bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-3 w-full md:w-80">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/8 p-4"
                  >
                    <div className="h-3 w-16 rounded-full bg-white/10 mb-3" />
                    <div className="h-7 w-12 rounded-full bg-white/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="h-10 w-10 rounded-2xl bg-gray-100 mb-4" />
                <div className="h-4 w-24 rounded-full bg-gray-200 mb-3" />
                <div className="h-7 w-12 rounded-full bg-gray-300" />
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="h-5 w-28 rounded-full bg-gray-200 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-14 rounded-2xl bg-gray-100" />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="h-5 w-32 rounded-full bg-gray-200 mb-6" />
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-gray-100 bg-gray-50 p-5"
                  >
                    <div className="h-4 w-24 rounded-full bg-gray-200 mb-4" />
                    <div className="h-16 rounded-2xl bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!user || !dashboard) return null;

  const firstName = user.name?.split(" ")[0] || "Member";

  const quickActions = [
    {
      title: "Cart",
      value: dashboard.cartCount,
      icon: ShoppingCart,
      href: "/cart",
      description: "Items waiting for checkout",
    },
    {
      title: "Wishlist",
      value: dashboard.wishlistCount,
      icon: Heart,
      href: "/wishlist",
      description: "Pieces you saved",
    },
    {
      title: "Compare",
      value: dashboard.compareCount,
      icon: GitCompare,
      href: "/compare",
      description: "Styles side by side",
    },
    {
      title: "Orders",
      value: dashboard.ordersCount,
      icon: Package,
      href: "/account/user",
      description: "Track every order",
    },
  ];

  return (
    <>
      <Breadcrumb />

      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <section className="rounded-[2rem] bg-black px-6 py-8 text-white shadow-sm md:px-8 md:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-200">
                My Account
              </p>
              <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                Welcome back, {firstName}
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-300 md:text-base">
                Manage your profile, saved items, cart, and recent orders from
                one place.
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-200">
                <div className="rounded-full bg-white/10 px-4 py-2">
                  {user.email}
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 capitalize">
                  {user.role}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/shop")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-100"
              >
                Continue Shopping
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickActions.map((item) => (
            <button
              key={item.title}
              onClick={() => router.push(item.href)}
              className="rounded-[1.5rem] border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-black"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-gray-100 p-3 text-black">
                  <item.icon size={20} />
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </div>

              <p className="mt-5 text-sm font-medium text-gray-500">{item.title}</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </button>
          ))}
        </section>


        <section className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-black">
                  <UserRound size={26} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    Account Details
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    {user.name}
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-gray-500">Email</p>
                  <p className="mt-1 break-all font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <div>
                    <p className="text-gray-500">Account Status</p>
                    <p className="mt-1 font-medium text-gray-900">Active</p>
                  </div>
                  <ShieldCheck className="text-purple-600" size={18} />
                </div>

                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-gray-500">Role</p>
                  <p className="mt-1 font-medium text-gray-900 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Quick Links
              </p>

              <div className="mt-4 space-y-3">
                {quickActions.map((item) => (
                  <button
                    key={`link-${item.title}`}
                    onClick={() => router.push(item.href)}
                    className="flex w-full items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                  >
                    <span>{item.title}</span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Recent Orders
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                  Your latest orders
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Track the status of your recent purchases and review what you
                  bought.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                <CalendarDays size={16} className="text-purple-600" />
                {dashboard.ordersCount} total order
                {dashboard.ordersCount === 1 ? "" : "s"}
              </div>
            </div>

            {dashboard.recentOrders.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
                <Package className="mx-auto text-purple-500" size={34} />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  No orders yet
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Start shopping and your first order will appear here.
                </p>
                <button
                  onClick={() => router.push("/shop")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Browse Shop
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                {dashboard.recentOrders.map((order) => (
                  <article
                    key={order._id}
                    className="rounded-[1.5rem] border border-gray-200 p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                          Order ID
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-gray-900">
                          #{order._id.slice(-6)}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Placed on{" "}
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-gray-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                          Total
                        </p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {formatAmount(order.totalAmount)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                          Items
                        </p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {order.items.length}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {order.items.slice(0, 2).map((item) => (
                        <div
                          key={`${item.productId}-${item.size}-${item.color}`}
                          className="grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-2xl bg-gray-50 p-3"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-14 w-14 rounded-xl object-cover"
                          />

                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.color} / {item.size}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <p className="text-sm font-semibold text-gray-900">
                            {formatAmount(item.subtotal)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {order.items.length > 2 && (
                      <p className="mt-4 text-sm text-gray-500">
                        +{order.items.length - 2} more item(s) in this order
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {false && (
          <>
            <div className="bg-white shadow p-6 rounded-md">
              <h2 className="mb-6 font-semibold">Recent Orders</h2>

              {dashboard.recentOrders.length === 0 ? (
                <p className="text-gray-500">No orders yet</p>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {dashboard.recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="rounded-lg border border-gray-300 bg-white p-5 transition hover:shadow-md"
                    >
                      <div className="mb-4 grid grid-cols-1 gap-4 border-b border-gray-300 pb-4">
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
