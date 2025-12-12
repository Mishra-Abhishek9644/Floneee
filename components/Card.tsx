"use client";
import { Eye, Heart } from "lucide-react";
import React from "react";
import { Product } from "../type/Product";
import Link from "next/link";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product,onOpen }) => {

  
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
        <div className="absolute z-10 bottom-19 right-0 left-5 w-60  rounded-2xl flex items-center justify-around bg-purple-500 text-white h-10  opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-400 ease-out:">
            <button><Heart size={20} className="hover:scale-95 rounded-2xl hover:bg-black  hover:text-white h-full w-10 p-2 transition-all duration-100 delay-200" /></button>
            <Link href={`/shop/product/${product.id}`}><button className=" hover:bg-black  hover:scale-95 rounded-2xl hover:text-white h-full w-40 transition-all duration-100 delay-300">Select Option</button></Link>
            <button> <Eye size={20} onClick={onOpen} className="hover:scale-95 rounded-2xl hover:bg-black  hover:text-white h-full w-10 p-2 transition-all duration-100 delay-400" /></button>
        </div>
    </div>
  );
};

export default Card;
