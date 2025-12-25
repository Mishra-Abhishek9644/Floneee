import React, { useRef } from 'react'
import { Eye, Heart } from "lucide-react";
import { Product } from "../type/Product";
import Link from "next/link";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/Store/Slices/wishlistSlice";
import toast from "react-hot-toast";

interface CardProps {
  product: Product;
  onOpen: () => void;
}
const LongCard: React.FC<CardProps> = ({ product, onOpen }) => {

  const dispatch = useDispatch();

  const wishlistItems = useSelector((state: any) => state.wishlist.items || []);
  const isInWishlist = wishlistItems.some((i: any) => i.id === product?._id);
  const debounceRef = useRef(false);

  const handleWishlistToggle = () => {
    if (debounceRef.current) return;
    debounceRef.current = true;

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success("Removed from wishlist 💔");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist ❤️");
    }

    setTimeout(() => (debounceRef.current = false), 3000);
  };

  return (
    <div className='m-1 my-2  md:my-4'>
      <div className='grid grid-cols-1 lg:grid-cols-[25%_75%] gap-2'>
        <div className="flex justify-center items-center p-4 xl:h-60 xl:w-60 lg:h-40 lg:w-40 md:h-40 md:w-40">
          <img
            src={product.image}
            className="object-contain w-full h-full flex justify-center items-center "
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl truncate ">{product.title}</div>
          <div className="text-red-600 text-2xl ">${product.price}</div>
          <div className="text-gray-500 my-4 truncate">{product.description}</div>

          <div className='flex items-center gap-2 '>
            <button
              className=" "
            >
              <Link href={`/shop/product/${product._id}`}>
                <div className="bg-purple-500 text-white h-full w-40 p-2  hover:bg-black">
                  Select Option
                </div>
              </Link>
            </button>

            <button
              className={isInWishlist ? " bg-black" : "" }
            >
              <Heart
                size={20}
                onClick={handleWishlistToggle}
                className={`${isInWishlist ?  "fill-white" : "" }bg-purple-500 text-white h-full w-10 p-2 hover:bg-black`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LongCard