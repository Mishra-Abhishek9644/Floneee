"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWishlistDebounced,
  clearWishlist,
} from "@/Store/Slices/wishlistSlice";
import { Heart, X } from "lucide-react";
import Link from "next/link";
import type { AppDispatch, RootState } from "@/Store";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const currentUser = useSelector(
    (state: RootState) => state.login.currentUser
  );

  /* ===== skeleton loader ===== */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleRemove = (item: any) => {
    if (!currentUser) return;
    dispatch(toggleWishlistDebounced(currentUser._id, item));
  };

  if (loading) {
    return (
      <div>
        <Breadcrumb />

        <div className="max-w-6xl mx-auto my-20 animate-pulse">
          <div className="h-6 w-48 bg-gray-300 rounded mb-6" />

          <div className="border border-gray-200 rounded-md">
            <div className="hidden md:grid grid-cols-6 bg-gray-100 px-6 py-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded" />
              ))}
            </div>

            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-6 items-center px-6 py-6 border-y border-gray-200 gap-3 md:gap-4"
              >
                <div className="h-24 bg-gray-300 rounded" />
                <div className="md:col-span-2 h-4 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded" />
                <div className="h-8 bg-gray-300 rounded" />
                <div className="h-6 w-6 bg-gray-300 rounded-full mx-auto hidden md:block" />
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-10 gap-4">
            <div className="h-12 w-60 bg-gray-300 rounded-full" />
            <div className="h-12 w-60 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Breadcrumb />

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 my-22">
          <Heart size={150} strokeWidth={0.75} />
          <h2 className="text-md md:text-xl">
            No Items Found in Wishlist
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
            Your wishlist items
          </h1>

          <div className="border border-gray-200 rounded-md">
            <div className="hidden md:grid grid-cols-6 text-sm bg-gray-100 text-gray-800 px-6 py-6">
              <div className="flex justify-center">IMAGE</div>
              <div className="col-span-2 flex justify-center">PRODUCT NAME</div>
              <div className="flex justify-center">UNIT PRICE</div>
              <div className="flex justify-center">ADD TO CART</div>
              <div className="flex justify-center">ACTION</div>
            </div>

            {wishlistItems.map((item: any) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-6 items-center px-6 py-6 border-y border-gray-200 relative gap-3 md:gap-0"
              >
                <div className="flex justify-center bg-gray-100 h-30 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-24 object-contain"
                  />
                </div>

                <div className="md:col-span-2 truncate flex justify-center text-wrap text-center">
                  {item.title}
                </div>

                <div className="flex justify-center">₹{item.price}</div>

                <Link href={`/shop/product/${item._id}`}>
                  <button className="bg-purple-600 flex justify-center rounded-2xl w-[90%] hover:bg-gray-800 text-white px-3 py-2 text-xs md:text-sm font-semibold">
                    SELECT OPTION
                  </button>
                </Link>

                {/* Desktop remove */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item);
                  }}
                  className="hidden md:flex justify-center text-black rounded-xl px-1 hover:scale-110 hover:text-purple-500"
                >
                  <X />
                </button>

                {/* Mobile remove */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item);
                  }}
                  className="absolute top-0 p-2 right-0 md:hidden text-black rounded-xl px-1 hover:scale-110 hover:text-purple-500"
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
              type="button"
              onClick={() => dispatch(clearWishlist())}
              className="px-10 py-4 rounded-full flex justify-center bg-gray-100 text-sm font-semibold my-2 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
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
