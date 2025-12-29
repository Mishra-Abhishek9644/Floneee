"use client";
import Breadcrumb from '@/components/Breadcrumb'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { removeFromCompareList } from "@/Store/Slices/compareSlice";
import { GitCompareArrows, Heart, X } from "lucide-react";
import Link from "next/link";
import { clearCompareList } from '@/Store/Slices/compareSlice';



const page = () => {

  const dispatch = useDispatch();
  const CompareList = useSelector(
    (state: any) => state.compareList.items
  );
  const currentUser = useSelector(
          (state: any) => state.login.currentUser
      );
  return (
    <div className='lg:px-20'>
      <Breadcrumb />

      {CompareList.length === 0 ? (
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
              <tr className='bg-gray-200'>
                <th className="bg-gray-200 sm:flex justify-start  p-4 text-left px-4 md:w-xs  whitespace-nowrap overflow-hidden text-ellipsis hidden">Product Info</th>
                {CompareList.map((product: any) => (
                  <td key={product._id} className="p-6 bg-white text-center relative min-w-70">

                    {/* REMOVE */}
                    <button
                      onClick={() => dispatch(removeFromCompareList({userId:currentUser._id,_id:product._id}))}
                      className="absolute top-3 right-3"
                    >
                      <X size={18} />
                    </button>

                    <img src={product.image} alt={product.title} className='h-40 mx-auto object-contain' />

                    {/* TITLE */}
                    <h3 className="md:col-span-2 max-w-55 text-center mx-auto truncate">
                      {product.title}
                    </h3>

                    {/* BUTTON */}
                    <Link href={`/shop/product/${product._id}`}>
                      <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-black hover:scale-105">
                        Select Option
                      </button>
                    </Link>
                  </td>
                ))}
              </tr>

              {/* ================= PRICE ROW ================= */}
              <tr className='bg-gray-200'>
                <th className="bg-gray-200 sm:flex justify-start  p-4 text-left px-4 md:w-xs  whitespace-nowrap overflow-hidden text-ellipsis hidden">
                  Price
                </th>

                {CompareList.map((product: any) => (
                  <td key={product._id} className="p-6 bg-white text-center relative min-w-70">
                    ₹{product.finalPrice}
                  </td>
                ))}
              </tr>

              {/* ================= DESCRIPTION ROW ================= */}
              <tr className='bg-gray-200'>
                <th className="bg-gray-200 sm:flex justify-start  p-4 text-left px-4 md:w-xs  whitespace-nowrap overflow-hidden text-ellipsis hidden">
                  Description
                </th>

                {CompareList.map((product: any) => (
                  <td key={product._id} className="p-6 bg-white text-center relative min-w-70">
                    {product.description}
                  </td>
                ))}
              </tr>

              {/* ================= RATING ROW ================= */}
              <tr className='bg-gray-200'>
                <th className="bg-gray-200 sm:flex justify-start  p-4 text-left px-4 md:w-xs  whitespace-nowrap overflow-hidden text-ellipsis hidden">
                  Rating
                </th>

                {CompareList.map((product: any) => (
                  <td key={product._id} className="p-6 bg-white text-center relative min-w-70">
                    ⭐ {product.rating?.rate}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => dispatch(clearCompareList({userId:currentUser._id}))}
            className=" px-10 py-4 w-full rounded-full flex justify-center  bg-gray-100 text-sm font-semibold my-4 hover:bg-purple-600 hover:text-white hover:scale-95 transition-all duration-300 "
          >
            CLEAR CartList
          </button>
        </div>)}

    </div>
  )
}

export default page