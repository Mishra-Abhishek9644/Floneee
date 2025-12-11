"use client";
import { Eye, Heart } from "lucide-react";
import React from "react";
import { Product } from "../type/Product";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
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
      <div className="
        absolute z-10 bottom-19 right-0 left-5 w-60 rounded-2xl 
        flex items-center justify-around bg-purple-500 text-white h-10 
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
      ">
        <button>
          <Heart size={20} className="hover:scale-95 rounded-2xl hover:bg-black transition p-2" />
        </button>
        <button className="hover:bg-black hover:scale-95 rounded-2xl h-full w-40 transition">
          Select Option
        </button>
        <button>
          <Eye size={20} className="hover:scale-95 rounded-2xl hover:bg-black transition p-2" />
        </button>
      </div>
    </div>
  );
};

export default Card;
