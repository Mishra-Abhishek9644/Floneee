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
    
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-12 text-center">
                Loading...
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
