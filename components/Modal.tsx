"use client";

import { Circle, GitCompareArrows, Heart, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { addToWishlist, removeFromWishlist } from "@/Store/Slices/wishlistSlice";
import { addToCompareList, removeFromCompareList } from "@/Store/Slices/compareSlice";
import { addToCartList, removeFromCartList } from "@/Store/Slices/cartSlice";
import { useRouter } from "next/navigation";


interface ModalProps {
    open: boolean;
    onClose: (value: boolean) => void;
    product: any; // 🔥 simplest & safest (no TS issues)
}

const colors = ["white", "black", "red"];
const sizes = ["X", "M", "XL", "XXL"];

const Modal = ({ open, onClose, product }: ModalProps) => {
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    const wishlistItems = useSelector((state: any) => state.wishlist.items || []);
    const compareItems = useSelector((state: any) => state.compareList.items || []);

    const isInWishlist = wishlistItems.some((i: any) => i.id === product?.id);
    const isInCompare = compareItems.some((i: any) => i.id === product?.id);

    const debounceRef = useRef(false);
    const currentUser = useSelector((state: any) => state.login.currentUser)
    const isLoggedIn = Boolean(currentUser);
    const router = useRouter();

    if (!open || !product) return null;

    const increase = () => qty < 9 && setQty(qty + 1);
    const decrease = () => qty > 1 && setQty(qty - 1);

    /* ---------------- WISHLIST ---------------- */
    const handleWishlistToggle = () => {
        if (debounceRef.current) return;
        if (!isLoggedIn) {
            toast.error("Login To Continue")
            router.push("/login");
            return;
        }

        debounceRef.current = true;

        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
            toast.success("Removed from wishlist 💔");
        } else {
            dispatch(addToWishlist(product));
            toast.success("Added to wishlist ❤️");
        }

        setTimeout(() => (debounceRef.current = false), 300);
    };

    /* ---------------- COMPARE ---------------- */
    const handleCompareToggle = () => {
        if (debounceRef.current) return;

        if (!isLoggedIn) {
            toast.error("Login To Continue")
            router.push("/login");
            return;
        }

        debounceRef.current = true;

        if (isInCompare) {
            dispatch(removeFromCompareList(product.id));
            toast.success("Removed from Compare 💔");
        } else {
            dispatch(addToCompareList(product));
            toast.success("Added to Compare ❤️");
        }

        setTimeout(() => (debounceRef.current = false), 300);
    };

    /* ---------------- CART (WITH QTY + COLOR + SIZE) ---------------- */
    const handleAddToCart = () => {
        if (debounceRef.current) return;
        if (!isLoggedIn) {
            toast.error("Login To Continue")
            router.push("/login");
            return;
        }
        debounceRef.current = true;

        dispatch(
            addToCartList({
                product,
                quantity: qty,
                color: selectedColor,
                size : selectedSize,
            })
        );

        toast.success("Added to Cart ❤️");
        router.push("/cart");
        setTimeout(() => (debounceRef.current = false), 300);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-[95vw] lg:w-[65vw] rounded-2xl p-4 max-h-[95vh] overflow-y-auto">
                {/* Close */}
                <div className="flex justify-end ">
                    <button className="cursor-pointer" onClick={() => onClose(false)}>
                        <X />
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* IMAGE */}
                    <div className="bg-gray-100 rounded-xl flex items-center justify-center">
                        <img src={product.image} className="h-[60%] object-contain" />
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl">{product.title}</h2>
                        <p className="text-2xl text-red-600">${product.price}</p>
                        <p className="text-gray-500">{product.description}</p>


                        {/* COLOR */}
                        <div>
                            <h3 className="font-semibold mb-2">Color</h3>
                            <div className="flex gap-2">
                                {colors.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setSelectedColor(c)}
                                        className={`cursor-pointer border  rounded-full p-1 ${selectedColor === c ? "border-purple-600" : "border-white"
                                            }`}
                                    >
                                        <Circle size={16} fill={c} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SIZE */}
                        <div>
                            <h3 className="font-semibold mb-2">Size</h3>
                            <div className="flex gap-2">
                                {sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`px-3 py-2 cursor-pointer text-xs border ${selectedSize === s
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>


                        {/* QTY + ACTIONS */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex border cursor-pointer px-3 py-2">
                                <button onClick={decrease}>-</button>
                                <span className="px-4">{qty}</span>
                                <button onClick={increase}>+</button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="bg-gray-800 text-white px-6 py-3 hover:bg-purple-600 transition cursor-pointer"
                            >
                                Add To Cart
                            </button>

                            <button className="cursor-pointer" onClick={handleWishlistToggle}>
                                <Heart className={isInWishlist ? "fill-purple-500" : ""} />
                            </button>

                            <button className="cursor-pointer" onClick={handleCompareToggle}>
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
