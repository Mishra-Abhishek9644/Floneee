"use client";

import { Circle, GitCompareArrows, Heart, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import type { AppDispatch, RootState } from "@/Store";
import { toggleWishlistDebounced } from "@/Store/Slices/wishlistSlice";
import {
    addToCompareList,
    removeFromCompareList,
} from "@/Store/Slices/compareSlice";
import { addToCartList } from "@/Store/Slices/cartSlice";
import { Product } from "../type/Product";

interface ModalProps {
    open: boolean;
    onClose: (value: boolean) => void;
    product: Product;
}

const Modal = ({ open, onClose, product }: ModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [qty, setQty] = useState(1);
    const [selectedColor, setSelectedColor] = useState(
        product?.colors?.[0] ?? "white"
    );
    const [selectedSize, setSelectedSize] = useState(
        product?.sizes?.[0] ?? "M"
    );

    const wishlistItems = useSelector(
        (state: RootState) => state.wishlist.items
    );
    const compareItems = useSelector(
        (state: RootState) => state.compareList.items
    );
    const currentUser = useSelector(
        (state: RootState) => state.login.currentUser
    );

    const isInWishlist = wishlistItems.some(
        (i) => i._id === product?._id
    );
    const isInCompare = compareItems.some(
        (i) => i._id === product?._id
    );

    const debounceRef = useRef(false);
    const isLoggedIn = Boolean(currentUser);

    if (!open || !product) return null;

    const increase = () => qty < 9 && setQty(qty + 1);
    const decrease = () => qty > 1 && setQty(qty - 1);

    /* ---------------- WISHLIST ---------------- */
    const handleWishlistToggle = () => {
        if (debounceRef.current) return;

        if (!isLoggedIn) {
            toast.error("Login To Continue");
            router.push("/login");
            return;
        }

        debounceRef.current = true;

        // ✅ API-based toggle (no TS error)
        dispatch(toggleWishlistDebounced(currentUser!._id, product));

        toast.success(
            isInWishlist
                ? "Removed from wishlist 💔"
                : "Added to wishlist ❤️"
        );

        setTimeout(() => {
            debounceRef.current = false;
        }, 300);
    };

    /* ---------------- COMPARE ---------------- */
    const handleCompareToggle = () => {
        if (debounceRef.current) return;

        if (!isLoggedIn) {
            toast.error("Login To Continue");
            router.push("/login");
            return;
        }

        debounceRef.current = true;

        if (isInCompare) {
            dispatch(
                removeFromCompareList({
                    userId: currentUser!._id,
                    _id: product._id,
                })
            );
            toast.success("Removed from Compare 💔");
        } else {
            dispatch(
                addToCompareList({
                    userId: currentUser!._id,
                    product,
                })
            );
            toast.success("Added to Compare ❤️");
        }

        setTimeout(() => {
            debounceRef.current = false;
        }, 300);
    };

    /* ---------------- CART ---------------- */
    const handleAddToCart = () => {
        if (debounceRef.current) return;

        if (!currentUser) {
            toast.error("Login to continue");
            router.push("/login");
            return;
        }

        debounceRef.current = true;

        dispatch(
            addToCartList({
                userId: currentUser._id,
                product,
                quantity: qty,
                color: selectedColor,
                size: selectedSize,
            })
        );
        toast.success("Added to Cart ❤️");
        router.push("/cart");

        setTimeout(() => {
            debounceRef.current = false;
        }, 300);
    };

    // normalize colors & sizes (SAFE)
    const colors = Array.isArray(product?.colors)
        ? product.colors
        : typeof product?.colors === "string"
            ? product.colors.split(",")
            : [];

    const sizes = Array.isArray(product?.sizes)
        ? product.sizes
        : typeof product?.sizes === "string"
            ? product.sizes.split(",")
            : [];


    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-[95vw] lg:w-[65vw] rounded-2xl p-4 max-h-[95vh] overflow-y-auto">
                {/* Close */}
                <div className="flex justify-end">
                    <button onClick={() => onClose(false)}>
                        <X />
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* IMAGE */}
                    <div className="bg-gray-100 rounded-xl flex items-center justify-center">
                        <img
                            src={product.image}
                            className="h-[60%] object-contain"
                            alt={product.title}
                        />
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl">{product.title}</h2>
                        <p className="text-2xl text-red-600">${product.price}</p>
                        <p className="text-gray-500">{product.description}</p>

                        {/* COLORS */}
                        {colors.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-2">Color</h3>
                                <div className="flex gap-2">
                                    {colors.map((c: string) => (
                                        <button
                                            key={c}
                                            onClick={() => setSelectedColor(c)}
                                            className={`border rounded-full p-1 ${selectedColor === c
                                                ? "border-purple-600"
                                                : "border-white"
                                                }`}
                                        >
                                            <Circle size={16} fill={c} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* SIZES */}
                        {sizes.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-2">Size</h3>
                                <div className="flex gap-2">
                                    {sizes.map((s: string) => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`px-3 py-2 text-xs border ${selectedSize === s
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-gray-200"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* ACTIONS */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex border px-3 py-2">
                                <button onClick={decrease}>-</button>
                                <span className="px-4">{qty}</span>
                                <button onClick={increase}>+</button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="bg-gray-800 text-white px-6 py-3 hover:bg-purple-600"
                            >
                                Add To Cart
                            </button>

                            <button onClick={handleWishlistToggle}>
                                <Heart
                                    className={isInWishlist ? "fill-purple-500" : ""}
                                />
                            </button>

                            <button onClick={handleCompareToggle}>
                                <GitCompareArrows
                                    className={isInCompare ? "text-purple-500" : ""}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
