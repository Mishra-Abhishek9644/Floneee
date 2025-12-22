"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/Store/Slices/loginSlice";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user = useSelector((state: any) => state.login.currentUser);
  const orders = useSelector((state: any) => state.order.orders);

  const [activeMenu, setActiveMenu] = useState<"account" | "orders">("account");

  const userOrders = orders.filter(
    (order: any) => order.billing.email === user.email
  );


  if (!user) {
    return (
      <>
        <Breadcrumb />
        <div className="pt-24 p-10 flex flex-col items-center">
          <p className="text-lg">You are not logged in</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded"
          >
            Go to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb />

      <div className="max-w-6xl mx-auto my-20 grid grid-cols-1 md:grid-cols-[25%_75%] gap-6">

        {/* SIDEBAR */}
        <aside className=" p-4 h-fit">
          <ul className="flex flex-col gap-2 text-sm font-medium">

            <li>
              <button
                onClick={() => setActiveMenu("account")}
                className={`w-full text-left px-4 py-2 rounded ${activeMenu === "account"
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                Account
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveMenu("orders")}
                className={`w-full text-left px-4 py-2 rounded ${activeMenu === "orders"
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                Orders
              </button>
            </li>

            <li>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full text-left px-4 py-2 rounded hover:bg-red-100 text-red-600"
              >
                Logout
              </button>

            </li>

          </ul>
        </aside>

        {/* RIGHT CONTENT */}
        <section className=" border-l border-gray-500 p-6">

          {/* ===== ACCOUNT ===== */}
          {activeMenu === "account" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Details</h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            </div>
          )}

          {/* ===== ORDERS ===== */}

          {activeMenu === "orders" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">My Orders</h2>

              {userOrders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
              ) : (
                <div className="space-y-6">
                  {userOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className="border border-gray-300 rounded-lg p-5 bg-gray-50"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row md:justify-between mb-4 text-sm text-gray-600">
                        <p>
                          <strong>Order ID:</strong> {order.id}
                        </p>
                        <p>
                          <strong>Date:</strong> {order.date}
                        </p>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((item: any, index: number) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="flex justify-between text-sm border-b pb-2"
                          >
                            <p className="w-2/3">
                              {item.title} × {item.quantity}
                            </p>
                            <p>
                              ${item.price * item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="flex justify-between font-semibold mt-4">
                        <p>Total</p>
                        <p className="text-purple-600">${order.total}</p>
                      </div>

                      {/* Billing Info */}
                      <div className="mt-4 text-sm text-gray-600">
                        <p>
                          <strong>Billing Name:</strong>{" "}
                          {order.billing.firstName} {order.billing.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {order.billing.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </section>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-[90%] max-w-sm p-6 shadow-lg">

            <h2 className="text-lg font-semibold mb-2">
              Confirm Logout
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  dispatch(logout());
                  setShowLogoutModal(false);
                  router.push("/login");
                }}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Sure, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
