"use client";
import { Eye, Heart } from "lucide-react";
import React from "react";
import { Product } from "../type/Product";
import Link from "next/link";
import { UseSelector,useDispatch } from "react-redux";
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
    <div className="p-4 flex flex-col mt-3 justify-center group relative z-0">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-70 p-8 object-contain shadow-sm hover:shadow-md transition"
      />

      <h2 className="font-semibold mt-2 truncate">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>

      {/* Hover overlay */}
      <div
        className="
    absolute bottom-19 right-0 left-5 w-60 h-10
    flex items-center justify-around
    bg-transparent
    opacity-0 group-hover:opacity-100
    translate-y-3 group-hover:translate-y-0
    transition-all duration-300 ease-out z-10
  "
      >
        {/* BTN 1 */}
        <button
          className="
      opacity-0 group-hover:opacity-100 
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-100
    "
        >
          <Heart
            size={20}
            onClick={handleAddToWishlist}
            className="bg-purple-500 text-white h-full w-10 p-2  hover:bg-black"
          />
        </button> 

        {/* BTN 2 */}
        <button
          className="
      opacity-0 group-hover:opacity-100 
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-200
    "
        >
          <Link href={`/shop/product/${product.id}`}>
            <div className="bg-purple-500 text-white h-full w-40 p-2  hover:bg-black">
              Select Option
            </div>
          </Link>
        </button>

        {/* BTN 3 */}
        <button
          className="
      opacity-0 group-hover:opacity-100 
      translate-y-2 group-hover:translate-y-0
      transition-all duration-300 ease-out delay-300
    "
        >
          <Eye
            size={20}
            className="bg-purple-500 text-white h-full w-10 p-2  hover:bg-black"
            onClick={onOpen}
          />
        </button>
      </div>


    </div>
  );
};

export default Card;
