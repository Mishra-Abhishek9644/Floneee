"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCartList,
  clearCartList,
} from "@/Store/Slices/cartSlice";
import { Heart, X } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const dispatch = useDispatch();
  const cartListItems = useSelector(
    (state: any) => state.cartList.items
  );
  const [qty, setQty] = useState(1);
  const increase = () => setQty(qty + 1);
  const decrease = () => { if (qty > 1) setQty(qty - 1); }
  return (
    <div className="">
      <Breadcrumb />

      {cartListItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 my-22">
          <Heart size={150} strokeWidth={0.75} />
          <h2 className="text-md md:text-xl">
            No Items Found in Cart
          </h2>
          <Link
            href="/shop"
            className="bg-gray-800 px-8 rounded-md text-sm text-white py-3.5 uppercase font-bold hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
          >
            Add Items
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto my-20 ">
          <h1 className="text-xl font-semibold mb-6">
            Your Cart items
          </h1>

          <div className="border border-gray-200 rounded-md">
            <div className="hidden md:grid grid-cols-6 text-sm bg-gray-100 text-gray-800  px-6 py-6">
              <div className="flex justify-center">IMAGE</div>
              <div className="col-span-2 flex justify-center">PRODUCT NAME</div>
              <div className="flex justify-center">UNIT PRICE</div>
              <div className="flex justify-center">ADD TO CART</div>
              <div className="flex justify-center">ACTION</div>
            </div>

            {cartListItems.map((item: any) => (
              <div
                key={item.id}
                className="grid grid-cols-1  md:grid-cols-6 items-center px-6 py-6 border-y border-gray-200 relative gap-3 md:gap-0"
              >
                <div className="flex justify-center bg-gray-100 h-30  items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-contain "
                  />
                </div>

                <div className="md:col-span-2 truncate flex justify-center">
                  {item.title}
                </div>

                <div className="flex justify-center">€{item.price}</div>
                <div className="flex justify-center items-center border border-gray-300 px-1 py-3 ">
                  <button onClick={decrease} className="text-xl md:px-2 cursor-pointer">-</button>
                  <span className="px-4 font-mono">{qty}</span>
                  <button onClick={increase} className="text-xl md:px-2 cursor-pointer">+</button>
                </div>
                <button
                  onClick={() =>
                    dispatch(removeFromCartList(item.id))
                  }
                  className="hidden  md:flex justify-center text-black rounded-xl px-1 hover:scale-110 hover:text-purple-500"
                >
                  <X />
                </button>

                {/* <button
                  onClick={() =>
                    dispatch(removeFromCartList(item.id))
                  }
                  className="absolute top-0 p-2 right-0  md:hidden text-black rounded-xl px-1 hover:scale-110 hover:text-purple-500"
                >
                  <X />
                </button> */}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-10 text-gray-800">
            <Link
              href="/shop"
              className="px-10 py-4 rounded-full flex justify-center  bg-gray-100 text-sm font-semibold my-2 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
            >
              CONTINUE SHOPPING
            </Link>

             <button
              className="px-10 py-4 rounded-full flex justify-center  bg-gray-100 text-sm font-semibold my-2 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
            >
              Check Out
            </button>

            <button
              onClick={() => dispatch(clearCartList())}
              className="px-10 py-4 rounded-full flex justify-center  bg-gray-100 text-sm font-semibold my-2 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
            >
              CLEAR WISHLIST
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
