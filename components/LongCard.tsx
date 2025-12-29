"use client";

import React, { useRef } from "react";
import { Eye, Heart } from "lucide-react";
import { Product } from "../type/Product";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistDebounced } from "@/Store/Slices/wishlistSlice";
import type { AppDispatch, RootState } from "@/Store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CardProps {
  product: Product;
  onOpen: () => void;
}

const LongCard: React.FC<CardProps> = ({ product, onOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const debounceRef = useRef(false);
  const displayPrice = product.finalPrice ?? product.price;


  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const currentUser = useSelector(
    (state: RootState) => state.login.currentUser
  );

  const isInWishlist = wishlistItems.some(
    (i) => i._id === product._id
  );

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
    dispatch(toggleWishlistDebounced(currentUser._id, product));

    setTimeout(() => {
      debounceRef.current = false;
    }, 300);
  };

  return (
    <div className="m-1 my-2 md:my-4">
      <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-2">
        <div className="flex justify-center items-center p-4 xl:h-60 xl:w-60 lg:h-40 lg:w-40 md:h-40 md:w-40">
          <img
            src={product.image}
            className="object-contain w-full h-full flex justify-center items-center"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-2xl truncate ">{product.title}</div>
          <p className="text-gray-600">
           
                <span className="font-semibold text-purple-600">
                  ₹{displayPrice}
                </span>

          </p>
          <div className="text-gray-500 my-4 truncate">{product.description}</div>

          <div className="flex items-center gap-2">
            <Link href={`/shop/product/${product._id}`}>
              <div className="bg-purple-500 text-white h-full w-40 p-2 hover:bg-black cursor-pointer">
                Select Option
              </div>
            </Link>

            <button
              type="button"
              onClick={handleWishlistToggle}
              className={`${isInWishlist ? "bg-black" : "bg-purple-500"} text-white h-full w-10 flex items-center justify-center hover:bg-black`}
            >
              <Heart
                size={20}
                className={isInWishlist ? "fill-white" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongCard;
