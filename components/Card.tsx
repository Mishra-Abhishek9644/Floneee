"use client";
import { Eye, Heart } from "lucide-react";
import React, { useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/Store/Slices/wishlistSlice";
import toast from "react-hot-toast";
import { login } from "@/Store/Slices/loginSlice";
import { useRouter } from "next/navigation"; 

interface cardProp {
  product: any;
  onOpen: any;
}

const Card = ({ product, onOpen }: cardProp) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist.items);

  const isInWishlist = wishlistItems.some(
    (item: any) => item.id === product.id
  );
  
  const currentUser  = useSelector((state: any) => state.login.currentUser)
  const isLoggedIn = Boolean(currentUser);
  const router = useRouter();


  // ⏳ debounce ref (3 seconds)
  const debounceRef = useRef(false);

  const handleWishlistToggle = () => {
    if (debounceRef.current) return;
    
        if(!isLoggedIn){
          toast.error("Login To Continue")
          router.push("/login");
          return;
        }

    debounceRef.current = true;

    if (isInWishlist ) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist 💔");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist ❤️");
    }

    setTimeout(() => {
      debounceRef.current = false;
    }, 3000); // 3 seconds debounce
  };

  return (
    <>
      <div className="p-4 flex flex-col mt-3 justify-center group relative z-0">
        <div className="overflow-hidden border border-gray-100 bg-[#f6f6f6] shadow-md p-5">
          <Link href={`/shop/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-70 p-8 object-contain scale-100 hover:scale-110 duration-700 transition"
            />
          </Link>
        </div>
          <h2 className="font-semibold mt-2 truncate">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>

        {/* Hover overlay */}
        <div
          className="
          absolute inset-x-0 bottom-18 h-12 mx-4
          hidden items-center
          bg-purple-500
          opacity-0 group-hover:opacity-100
          translate-y-3 group-hover:translate-y-0
          transition-all duration-700 ease-out
          md:flex 
          z-10
        "
        >
          {/* ❤️ Wishlist */}
          <button
            onClick={handleWishlistToggle}
            className={`
            w-12 h-full
            flex items-center justify-center
            text-white
            opacity-0 group-hover:opacity-100
            translate-y-2 group-hover:translate-y-0
            transition-all duration-300 ease-out delay-100
            hover:bg-black ${isInWishlist ? "bg-black " : ""}
          `}
          >
            <Heart
              size={18}
              className={isInWishlist ? "fill-white " : ""}
            />
          </button>

          {/* Select Option */}
          <Link
            href={`/shop/product/${product.id}`}
            className="
            flex-1 h-full
            flex items-center justify-center
            text-white text-sm
            opacity-0 group-hover:opacity-100
            translate-y-2 group-hover:translate-y-0
            transition-all duration-300 ease-out delay-200
            hover:bg-black border-x border-white/60
          "
          >
            Select Option
          </Link>

          {/* Eye */}
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

    </>

  );
};

export default Card;
