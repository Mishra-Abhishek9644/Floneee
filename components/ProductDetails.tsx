"use client";
import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { Product } from "../type/Product";
import {
    Circle,
    Dribbble,
    Facebook,
    GitCompareArrows,
    Heart,
    Instagram,
    Linkedin,
    MoveLeft,
    Star,
    Twitter,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCompareList,
    removeFromCompareList,
} from "@/Store/Slices/compareSlice";
import { addToCartList } from "@/Store/Slices/cartSlice";
import toast from "react-hot-toast";
import {
    addToWishlist,
    removeFromWishlist,
} from "@/Store/Slices/wishlistSlice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface ProductDetailsProps {
    id: string;
}

const ProductDetails = ({ id }: ProductDetailsProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [qty, setQty] = useState(1);
    const [show, setShow] = useState("1st");

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const debounceRef = useRef(false);

    const wishlistItems = useSelector(
        (state: any) => state.wishlist.items || []
    );
    const compareItems = useSelector(
        (state: any) => state.compareList.items || []
    );
    const currentUser = useSelector(
        (state: any) => state.login.currentUser
    );
    const isLoggedIn = Boolean(currentUser);

    const isInWishlist = wishlistItems.some(
        (i: any) => i._id === product?._id
    );
    const isInCompare = compareItems.some(
        (i: any) => i._id === product?._id
    );

    /* ================= FETCH PRODUCT ================= */
    useEffect(() => {
        if (!id) return;

        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then(setProduct)
            .catch(() => setProduct(null));
    }, [id]);

    /* ================= DEFAULT VARIANTS ================= */
    useEffect(() => {
        if (!product) return;

        setSelectedColor(product.colors?.[0] ?? null);
        setSelectedSize(product.sizes?.[0] ?? null);
    }, [product]);

    /* ================= RELATED PRODUCTS ================= */
    useEffect(() => {
        if (!product || !product.categoryId || typeof product.categoryId === "string") return;

        const params = new URLSearchParams({
            category: product.categoryId.slug,
            exclude: product._id,
            limit: "4",
        });

        fetch(`/api/products?${params.toString()}`)
            .then((res) => res.json())
            .then((res) => setRelatedProducts(res.products))
            .catch(() => setRelatedProducts([]));
    }, [product]);

    if (!product) return null;

    const increase = () => qty < 9 && setQty(qty + 1);
    const decrease = () => qty > 1 && setQty(qty - 1);

    /* ================= WISHLIST ================= */
    const handleWishlistToggle = () => {
        if (debounceRef.current) return;
        if (!isLoggedIn) {
            toast.error("Login To Continue");
            router.push("/login");
            return;
        }
        debounceRef.current = true;

        if (isInWishlist) {
            dispatch(removeFromWishlist(product._id));
            toast.success("Removed from wishlist 💔");
        } else {
            dispatch(addToWishlist(product));
            toast.success("Added to wishlist ❤️");
        }

        setTimeout(() => (debounceRef.current = false), 300);
    };

    /* ================= COMPARE ================= */
    const handleCompareToggle = () => {
        if (debounceRef.current) return;
        if (!isLoggedIn) {
            toast.error("Login To Continue");
            router.push("/login");
            return;
        }
        debounceRef.current = true;

        if (isInCompare) {
            dispatch(removeFromCompareList(product._id));
            toast.success("Removed from Compare 💔");
        } else {
            dispatch(addToCompareList(product));
            toast.success("Added to Compare ❤️");
        }

        setTimeout(() => (debounceRef.current = false), 300);
    };

    /* ================= CART ================= */
    const handleAddToCart = () => {
        if (debounceRef.current) return;
        if (!isLoggedIn) {
            toast.error("Login To Continue");
            router.push("/login");
            return;
        }

        if (!selectedColor || !selectedSize) {
            toast.error("Please select size and color");
            return;
        }

        debounceRef.current = true;

        dispatch(
            addToCartList({
                product,
                quantity: qty,
                color: selectedColor,
                size: selectedSize,
            })
        );

        toast.success("Added to Cart ❤️");
        router.push("/cart");
        setTimeout(() => (debounceRef.current = false), 300);
    };

    return (
        <>
            <section className="my-10 lg:mx-44 md:mx-28 sm:mx-10">
                {pathname.startsWith("/shop/product/") && (
                    <div className="border w-fit py-1 px-3 hover:text-purple-600">
                        <Link href="/shop" className="flex items-center gap-2">
                            <MoveLeft size={18} /> Back
                        </Link>
                    </div>
                )}

                {/* ================= PRODUCT ================= */}
                <div className="grid md:grid-cols-2 gap-4 py-16">
                    <div>
                        <img
                            src={product.image}
                            className="bg-[#f6f6f6] w-full p-28"
                            alt="product"
                        />
                    </div>

                    <div className="lg:px-20 md:px-12 px-5">
                        <h1 className="lg:text-2xl">{product.title}</h1>
                        <p className="text-2xl text-red-500 py-2">${product.price}</p>
                        <p className="border-b pb-8">{product.description}</p>

                        {/* COLORS */}
                        <div className="mt-6">
                            {product.colors?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-2">Color</h3>
                                    <div className="flex gap-2">
                                        {product.colors.map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setSelectedColor(c)}
                                                className={`cursor-pointer border rounded-full p-1 ${selectedColor === c ? "border-purple-600" : "border-white"
                                                    }`}
                                            >
                                                <Circle size={16} fill={c} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* SIZES */}
                        <div className="mt-4">
                            {product.sizes?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-2">Size</h3>
                                    <div className="flex gap-2">
                                        {product.sizes.map((s) => (
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
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-4 mt-6 items-center">
                            <div className="flex border px-2 py-3">
                                <button onClick={decrease}>-</button>
                                <span className="px-4">{qty}</span>
                                <button onClick={increase}>+</button>
                            </div>

                            <button
                                className="bg-gray-800 text-white px-10 py-4 hover:bg-purple-600"
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>

                            <Heart
                                className="cursor-pointer hover:text-purple-600"
                                onClick={handleWishlistToggle}
                            />
                            <GitCompareArrows
                                className="cursor-pointer hover:text-purple-600"
                                onClick={handleCompareToggle}
                            />
                        </div>
                    </div>
                </div>

                {/* ================= RELATED PRODUCTS ================= */}
                <div className="py-10">
                    <h2 className="text-center text-3xl font-semibold mb-6">
                        Related Products
                    </h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {relatedProducts.map((item) => (
                            <Card key={item._id} product={item} onOpen={() => { }} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;
