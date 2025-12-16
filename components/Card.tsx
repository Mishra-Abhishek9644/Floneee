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

const Card: React.FC<CardProps> = ({ product, onOpen, }) => {

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
      {/* Hover overlay */}
      <div
        className="
    absolute inset-x-0 bottom-4 h-12
    hidden items-center
    bg-purple-500
    opacity-0 group-hover:opacity-100
    translate-y-3 group-hover:translate-y-0
    transition-all duration-300 ease-out
    md:flex 
    z-10
  "
      >
        {/* BTN 1 - Heart */}
        <button
          onClick={handleAddToWishlist}
          className="
      w-12 h-full
      flex items-center justify-center
      text-white
      opacity-0 group-hover:opacity-100
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-100
      hover:bg-black
    "
        >
          <Heart size={18} />
        </button>

        {/* BTN 2 - Select Option */}
        <Link
          href={`/shop/product/${product.id}`}
          className="
      flex-1 h-full
      flex items-center justify-center
      text-white text-sm
      opacity-0 group-hover:opacity-100
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-200
      hover:bg-black
    "
        >
          Select Option
        </Link>

        {/* BTN 3 - Eye */}
        <button
          onClick={onOpen}
          className="
      w-12 h-full
      flex items-center justify-center
      text-white
      opacity-0 group-hover:opacity-100
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-300
      hover:bg-black
    "
        >
          <Eye size={18} />
        </button>
      </div>


    </div>
  );
};

export default Card;
