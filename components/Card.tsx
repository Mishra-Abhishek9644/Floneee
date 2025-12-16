"use client";
import { Eye, Heart } from "lucide-react";
import React from "react";
import { Product } from "../type/Product";
import Link from "next/link";
import { UseSelector, useDispatch } from "react-redux";
import { addToWishlist } from "@/Store/Slices/wishlistSlice";
import toast from "react-hot-toast";


interface CardProps {
  product: Product;
  onOpen: () => void;
}

const Card: React.FC<CardProps> = ({ product, onOpen }) => {

  const dispatch = useDispatch()

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist ❤️");
  };

  return (
    <div className="p-4 flex flex-col mt-3 justify-center group relative z-0 hover:scale-95">
      <Link href={`/shop/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-70 p-8 object-contain shadow-sm hover:shadow-md transition"
        /></Link>

      <h2 className="font-semibold mt-2 truncate">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>

      {/* Hover overlay */}
      <div
        className="
    absolute inset-x-0 bottom-0 h-12  {/* Changed: full width left/right, adjust h-12 or whatever height you want; removed bottom-19 left-5 w-full */}
    flex items-center justify-center   {/* Added: flex row, center vertically, some gap between buttons */}
    bg-transparent
    opacity-0 group-hover:opacity-100
    translate-y-3 group-hover:translate-y-0
    transition-all duration-300 ease-out z-10
    md:flex hidden  {/* Kept your md:flex and hidden */}
  "
      >
        {/* BTN 1 - Heart (fixed small width) */}
        <button
          className="
      opacity-0 group-hover:opacity-100 
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-100
      flex-none  {/* Prevents it from growing/shrinking unnecessarily */}
    "
        >
          <Heart
            size={20}
            onClick={handleAddToWishlist}
            className="bg-purple-500 text-white h-10 w-10 p-2  hover:bg-black"  
          />
        </button>

        {/* BTN 2 - Select Option (takes ~60% + remaining) */}
        <button
          className="
      opacity-0 group-hover:opacity-100 
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-200
      basis-3/5 grow  {/* Key: starts at 60% of container, then grows to fill any extra space */}
      min-w-0  
    "
        >
          <Link href={`/shop/product/${product.id}`} className="block w-full">
            <div className="bg-purple-500 text-white h-10 px-4 flex items-center justify-center  hover:bg-black">
              Select Option
            </div>
          </Link>
        </button>

        {/* BTN 3 - Eye (fixed small width) */}
        <button
          className="
      opacity-0 group-hover:opacity-100 
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-300
      flex-none
    "
        >
          <Eye
            size={20}
            className="bg-purple-500 text-white h-10 w-10 p-2  hover:bg-black"
            onClick={onOpen}
          />
        </button>
      </div>

    </div>
  );
};

export default Card;
