"use client";

import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { Product } from "../type/Product";
import { Circle, GitCompareArrows, Heart, MoveLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/Store/Slices/cartSlice";
import { toggleWishlistDebounced } from "@/Store/Slices/wishlistSlice";
import { toggleCompareDebounced } from "@/Store/Slices/compareSlice";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { AppDispatch, RootState } from "@/Store";

interface ProductDetailsProps {
  id: string;
}

const ProductDetails = ({ id }: ProductDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [productLoading, setProductLoading] = useState(true);


  const debounceRef = useRef(false);

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


  /* FETCH PRODUCT */
  useEffect(() => {
    if (!id) return;

    setProductLoading(true);

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setProductLoading(false));
  }, [id]);


  const displayPrice =
    product?.finalPrice ?? product?.price ?? 0;

  /* DEFAULT VARIANTS */
  useEffect(() => {
    if (!product) return;

    if (Array.isArray(product.colors)) {
      setSelectedColor(product.colors[0] ?? null);
    }

    if (Array.isArray(product.sizes)) {
      setSelectedSize(product.sizes[0] ?? null);
    }
  }, [product]);

  /* RELATED PRODUCTS */
  useEffect(() => {
    if (
      !product ||
      !product.categoryId ||
      typeof product.categoryId === "string"
    )
      return;

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

  
  
  const increase = () => qty < 9 && setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);
  
  /* WISHLIST */
  const handleWishlistToggle = () => {
     if (!product) return; 
    if (debounceRef.current) return;

    if (!currentUser) {
      toast.error("Login To Continue");
      router.push("/login");
      return;
    }

    debounceRef.current = true;
    dispatch(toggleWishlistDebounced(currentUser._id, product));
    
    setTimeout(() => (debounceRef.current = false), 300);
  };
  
  /* COMPARE */
  const handleCompareToggle = () => {
     if (!product) return; 
    if (debounceRef.current) return;
    
    if (!currentUser) {
      toast.error("Login To Continue");
      router.push("/login");
      return;
    }
    
    debounceRef.current = true;
    dispatch(toggleCompareDebounced(currentUser._id, product));
    
    setTimeout(() => (debounceRef.current = false), 300);
  };
  
  const handleAddToCart = () => {
     if (!product) return; 
    if (debounceRef.current) return;
    
    if (!currentUser) {
      toast.error("Login to continue");
      router.push("/login");
      return;
    }
    
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color");
      return;
    }
    
    debounceRef.current = true;
    
    dispatch(
      addToCart({
        productId: product._id,
        quantity: qty,
        color: selectedColor,
        size: selectedSize,
      })
    );
    
    router.push("/cart");
    
    setTimeout(() => (debounceRef.current = false), 300);
  };
  
  if (productLoading) {
    return (
      <section className="my-10 lg:mx-44 md:mx-28 sm:mx-10 animate-pulse">
        <div className="grid md:grid-cols-2 gap-4 py-16">
          {/* Image skeleton */}
          <div className="bg-gray-200 h-105 w-full rounded" />

          {/* Content skeleton */}
          <div className="lg:px-20 md:px-12 px-5 space-y-4">
            <div className="h-6 w-3/4 bg-gray-300 rounded" />
            <div className="h-8 w-32 bg-gray-300 rounded" />
            <div className="h-20 w-full bg-gray-300 rounded" />

            <div className="flex gap-2 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 bg-gray-300 rounded-full" />
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-12 bg-gray-300 rounded" />
              ))}
            </div>

            <div className="h-12 w-40 bg-gray-300 rounded mt-6" />
          </div>
        </div>
      </section>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found
      </div>
    );
  }


  return (
    <section className="my-10 lg:mx-44 md:mx-28 sm:mx-10">
      {pathname.startsWith("/shop/product/") && (
        <div className="border w-fit py-1 px-3 hover:text-purple-600">
          <Link href="/shop" className="flex items-center gap-2">
            <MoveLeft size={18} /> Back
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 py-16">
        <div>
          <img
            src={product.image}
            className="bg-[#f6f6f6] w-full md:p-28 p-10"
            alt="product"
          />
        </div>

        <div className="lg:px-20 md:px-12 px-5">
          <h1 className="lg:text-2xl">{product.title}</h1>
          <p className="text-2xl text-red-500 py-2">₹{displayPrice}</p>
          <p className="border-b pb-8">{product.description}</p>

          {Array.isArray(product.colors) && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((c) => (
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

          {Array.isArray(product.sizes) && (
            <div className="mt-4">
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

          <div className="flex gap-4 mt-6 items-center">
            <div className="flex border px-2 md:py-3 py-1">
              <button onClick={decrease}>-</button>
              <span className="px-4">{qty}</span>
              <button onClick={increase}>+</button>
            </div>

            <button
              className="bg-gray-800 text-white md:px-10 px-5 md:py-4 py-2 hover:bg-purple-600"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

            <Heart
              onClick={handleWishlistToggle}
              className={`cursor-pointer hover:text-purple-600 ${isInWishlist ? "fill-purple-600 text-purple-600" : ""
                }`}
            />

            <GitCompareArrows
              onClick={handleCompareToggle}
              className={`cursor-pointer hover:text-purple-600 ${isInCompare ? "text-purple-600" : ""
                }`}
            />
          </div>
        </div>
      </div>

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
  );
};

export default ProductDetails;
