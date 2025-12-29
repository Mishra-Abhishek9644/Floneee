"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  clearCartList,
} from "@/Store/Slices/cartSlice";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import type { AppDispatch, RootState } from "@/Store";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(
    (state: RootState) => state.login.currentUser
  );

  const cartListItems = useSelector(
    (state: RootState) => state.cartList.items
  );

  useEffect(() => {
    if (!currentUser) return;
    dispatch(fetchCart());
  }, [currentUser, dispatch]);

  return (
    <div className="">
      <Breadcrumb />

      {cartListItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 my-22">
          <ShoppingCart size={150} strokeWidth={0.75} />

          <h2 className="text-md md:text-xl">No Items Found in Cart</h2>

          <Link
            href="/shop"
            className="bg-gray-800 px-8 rounded-md text-sm text-white py-3.5 uppercase font-bold hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
          >
            Add Items
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto my-20 ">
          <h1 className="text-xl font-semibold mb-6">Your Cart items</h1>

          <div className="border border-gray-200 rounded-md">
            <div className="hidden md:grid grid-cols-8 text-sm place-content-center bg-gray-100 text-gray-800 px-6 py-6">
              <div className="flex justify-center">IMAGE</div>
              <div className="col-span-2 flex justify-center">
                PRODUCT NAME
              </div>
              <div className="flex justify-center">UNIT PRICE</div>
              <div className="flex justify-center">COLOR</div>
              <div className="flex justify-center">SIZE</div>
              <div className="flex justify-center">QTY</div>
              <div className="flex justify-center">ACTION</div>
            </div>

            {cartListItems.map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="grid grid-cols-1 md:grid-cols-8 place-content-center items-center px-6 py-6 border-y border-gray-200 relative gap-3 md:gap-0"
              >
                <div className="flex justify-center bg-gray-100 h-30 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-24 object-contain"
                  />
                </div>

                <div className="md:col-span-2 truncate flex justify-center text-center">
                  {item.title}
                </div>

                <div className="flex justify-center">
                  ₹{item.price}
                </div>
                <div className="flex justify-center">{item.color}</div>
                <div className="flex justify-center">{item.size}</div>
                <div className="flex justify-center">
                  {item.quantity}
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(index))}
                  className="hidden md:flex justify-center text-black rounded-xl px-1 hover:scale-110 hover:text-purple-500"
                >
                  <X />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-10 text-gray-800">
            <Link
              href="/shop"
              className="px-10 py-4 rounded-full flex justify-center bg-gray-100 text-sm font-semibold my-2 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
            >
              CONTINUE SHOPPING
            </Link>

            <button
              onClick={() => dispatch(clearCartList())}
              className="px-10 py-4 rounded-full flex justify-center bg-gray-100 text-sm font-semibold my-2 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
            >
              CLEAR CartList
            </button>
          </div>

          <Link href="/checkout">
            <button className="px-10 py-4 rounded-full flex justify-center w-full hover:bg-black text-lg font-semibold my-2 bg-purple-600 text-white hover:scale-95 m-1 transition-all duration-300">
              Check Out
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
