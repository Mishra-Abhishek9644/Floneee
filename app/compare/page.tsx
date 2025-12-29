"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompareDebounced,
  clearCompare,
} from "@/Store/Slices/compareSlice";
import { GitCompareArrows, X } from "lucide-react";
import Link from "next/link";
import type { AppDispatch, RootState } from "@/Store";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const compareList = useSelector(
    (state: RootState) => state.compareList.items
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

  /* ===== SKELETON UI (DESIGN SAME STRUCTURE) ===== */
  if (loading) {
    return (
      <div className="lg:px-20 animate-pulse">
        <Breadcrumb />

        <div className="overflow-x-auto my-10">
          <table className="w-full border border-gray-300">
            <tbody>
              {[1, 2, 3, 4].map((row) => (
                <tr key={row} className="bg-gray-200">
                  <th className="bg-gray-200 sm:flex justify-start p-4 text-left px-4 md:w-xs hidden">
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                  </th>

                  {[1, 2].map((col) => (
                    <td
                      key={col}
                      className="p-6 bg-white text-center min-w-70"
                    >
                      <div className="h-40 bg-gray-300 mb-4 rounded" />
                      <div className="h-4 w-32 bg-gray-300 mx-auto rounded mb-2" />
                      <div className="h-10 w-36 bg-gray-300 mx-auto rounded-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="h-12 bg-gray-300 rounded-full mt-4" />
        </div>
      </div>
    );
  }

  /* ===== REAL PAGE (UNCHANGED) ===== */
  return (
    <div className="lg:px-20">
      <Breadcrumb />

      {compareList.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 my-22">
          <GitCompareArrows size={150} strokeWidth={0.75} />
          <h2 className="text-md md:text-xl">
            No Items Found in Compare
          </h2>
          <Link
            href="/shop"
            className="bg-gray-800 px-8 rounded-md text-sm text-white py-3.5 uppercase font-bold hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
          >
            Add Items
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto my-10">
          <table className="w-full border border-gray-300">
            <tbody>
              {/* PRODUCT ROW */}
              <tr className="bg-gray-200">
                <th className="bg-gray-200 sm:flex justify-start p-4 text-left px-4 md:w-xs hidden">
                  Product Info
                </th>

                {compareList.map((product) => (
                  <td
                    key={product._id}
                    className="p-6 bg-white text-center relative min-w-70"
                  >
                    <button
                      onClick={() =>
                        dispatch(
                          toggleCompareDebounced(currentUser!._id, product)
                        )
                      }
                      className="absolute top-3 right-3"
                    >
                      <X size={18} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-40 mx-auto object-contain"
                    />

                    <h3 className="max-w-55 text-center mx-auto truncate">
                      {product.title}
                    </h3>

                    <Link href={`/shop/product/${product._id}`}>
                      <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-black hover:scale-105">
                        Select Option
                      </button>
                    </Link>
                  </td>
                ))}
              </tr>

              {/* PRICE ROW */}
              <tr className="bg-gray-200">
                <th className="bg-gray-200 sm:flex justify-start p-4 text-left px-4 md:w-xs hidden">
                  Price
                </th>

                {compareList.map((product) => (
                  <td
                    key={product._id}
                    className="p-6 bg-white text-center min-w-70"
                  >
                    ₹{product.price}
                  </td>
                ))}
              </tr>

              {/* DESCRIPTION ROW */}
              <tr className="bg-gray-200">
                <th className="bg-gray-200 sm:flex justify-start p-4 text-left px-4 md:w-xs hidden">
                  Description
                </th>

                {compareList.map((product) => (
                  <td
                    key={product._id}
                    className="p-6 bg-white text-center min-w-70"
                  >
                    {product.description}
                  </td>
                ))}
              </tr>

              {/* RATING ROW */}
              <tr className="bg-gray-200">
                <th className="bg-gray-200 sm:flex justify-start p-4 text-left px-4 md:w-xs hidden">
                  Rating
                </th>

                {compareList.map((product) => (
                  <td
                    key={product._id}
                    className="p-6 bg-white text-center min-w-70"
                  >
                    ⭐ {product.rating ?? "N/A"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <button
            onClick={() => dispatch(clearCompare())}
            className="px-10 py-4 w-full rounded-full flex justify-center bg-gray-100 text-sm font-semibold my-4 hover:bg-purple-600 hover:text-white hover:scale-95 transition-all duration-300"
          >
            CLEAR COMPARE
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
