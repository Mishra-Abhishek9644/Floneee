"use client";

import { Eye, Heart } from "lucide-react";
import React, { useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistDebounced } from "@/Store/Slices/wishlistSlice";
import { useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/Store";
import toast from "react-hot-toast";

interface CardProps {
  product: any;
  onOpen: () => void;
}

const Card = ({ product, onOpen }: CardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const currentUser = useSelector(
    (state: RootState) => state.login.currentUser
  );

  const isInWishlist = wishlistItems.some(
    (item) => item._id === product._id
  );

  const router = useRouter();
  const debounceRef = useRef(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (debounceRef.current) return;

    if (!currentUser) {
      toast.error("Login To Continue");
      router.push("/login");
      return;
    }

    debounceRef.current = true;

    // 🔥 SAME API → backend toggles add/remove
    dispatch(toggleWishlistDebounced(currentUser._id, product));

    setTimeout(() => {
      debounceRef.current = false;
    }, 300);
  };

  return (
    <div className="p-4 flex flex-col mt-3 justify-center group relative z-0">
      <div className="overflow-hidden border border-gray-100 bg-[#f6f6f6] shadow-md p-5">
        <Link href={`/shop/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-70 p-8 object-contain scale-100 hover:scale-110 duration-700 transition"
          />
        </Link>
      </div>

      <h2 className="font-semibold mt-2 truncate">{product.title}</h2>
      <p className="text-gray-600">
        {product.discount > 0 ? (
          <>
            <span className="line-through mr-2 text-gray-400">
              ${product.price}
            </span>
            <span className="font-semibold text-purple-600">
              ${product.finalPrice}
            </span>
          </>
        ) : (
          <>${product.price}</>
        )}
      </p>


      <div className="absolute inset-x-0 bottom-18 h-12 mx-4 hidden items-center bg-purple-500 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-700 ease-out md:flex z-10">
        {/* HEART (ADD / REMOVE) */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`w-12 h-full flex items-center justify-center text-white hover:bg-black z-20 ${
            isInWishlist ? "bg-black" : ""
          }`}
        >
          <Heart
            size={18}
            className={isInWishlist ? "fill-purple-500 text-purple-500" : ""}
          />
        </button>

        {/* PRODUCT LINK */}
        <Link
          href={`/shop/product/${product._id}`}
          className="flex-1 h-full flex items-center justify-center text-white text-sm hover:bg-black border-x border-white/60 z-10"
        >
          Select Option
        </Link>

        {/* QUICK VIEW */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpen();
          }}
          className="w-12 h-full flex items-center justify-center text-white hover:bg-black z-20"
        >
          <Eye size={18} />
        </button>
      </div>
    </div>
  );
};

export default Card;
