"use client";

import { Product } from "@/type/Product";
import { Facebook, Instagram, Twitter } from "lucide-react";
import React, { useEffect, useState } from "react";
import BlogLeftSidebar from "./BlogLeftSidebar";

interface BlogPostProps {
  id: number;
}

const BlogPost: React.FC<BlogPostProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  /* ---------------- SKELETON ---------------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto md:px-20 px-5 w-full md:py-20 py-5 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
          {/* Left Sidebar Skeleton */}
          <div className="flex flex-col gap-6 animate-pulse">
        {/* Search */}
        <div>
          <div className="h-5 w-24 bg-gray-300 rounded mb-3" />
          <div className="h-10 bg-gray-300 rounded" />
        </div>

        {/* Recent */}
        <div>
          <div className="h-5 w-40 bg-gray-300 rounded mb-4" />
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-gray-300 rounded" />
              <div className="h-4 w-40 bg-gray-300 rounded" />
            </div>
          ))}
        </div>

        {/* Categories */}
        <div>
          <div className="h-5 w-24 bg-gray-300 rounded mb-4" />
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 bg-gray-300 rounded" />
              <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>

          {/* Right Content Skeleton */}
          <div>
            <div className="md:h-[70vh] h-60 bg-gray-300 rounded mb-6" />

            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
            </div>

            <div className="grid grid-cols-2 gap-4 py-10">
              <div className="md:h-96 h-44 bg-gray-300 rounded" />
              <div className="md:h-96 h-44 bg-gray-300 rounded" />
            </div>

            <div className="h-4 bg-gray-300 rounded w-full mb-6" />

            <div className="flex justify-between items-center pt-5">
              <div className="h-4 bg-gray-300 rounded w-24" />
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-gray-300 rounded-full" />
                <div className="w-6 h-6 bg-gray-300 rounded-full" />
                <div className="w-6 h-6 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) return null;

  /* ---------------- REAL CONTENT ---------------- */
  return (
    <div className="max-w-7xl mx-auto md:px-20 px-5 w-full md:py-20 py-5">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
        {/* Left Sidebar */}
        <BlogLeftSidebar />

        {/* Right Content */}
        <div>
          <div className="md:h-[70vh] p-10 bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-3xl mb-4">{product.title}</h3>

            <p className="mb-4">{product.description}</p>
            <p className="mb-4">{product.description}</p>
            <p>{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-10">
            <img
              className="md:h-96 h-44 p-10 bg-gray-300 object-contain"
              src={product.image}
              alt={product.title}
            />
            <img
              className="md:h-96 h-44 p-10 bg-gray-300 object-contain"
              src={product.image}
              alt={product.title}
            />
          </div>

          <p className="mb-6">{product.description}</p>

          <div className="flex justify-between items-center px-2 pt-5 pb-3">
            <button className="text-sm text-gray-600">
              {product.categoryId.name}
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm">Share:</span>

              <Facebook className="bg-blue-700 p-1 text-white rounded-full hover:bg-white hover:text-blue-700 border border-blue-700 cursor-pointer" />
              <Twitter className="bg-sky-600 p-1 text-white rounded-full hover:bg-white hover:text-sky-600 border border-sky-600 cursor-pointer" />
              <Instagram className="bg-pink-600 p-1 text-white rounded-full hover:bg-white hover:text-pink-600 border border-pink-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
