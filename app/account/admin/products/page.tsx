"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/products");
            if (res.ok) {
                const data = await res.json();
                setProducts(data.products || data);
            }
        };
        load();
    }, []);

    const deleteProduct = async (id: string) => {
        if (!confirm("Delete this product?")) return;

        const res = await fetch(`/api/admin/product?id=${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!res.ok) {
            toast.error("Delete failed");
            return;
        }

        toast.success("Product deleted");
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto py-20">
            <h1 className="text-xl font-bold mb-6">Manage Products</h1>

            {products.map((p) => (
                <div
                    key={p._id}
                    className="flex justify-between items-center border border-gray-400 rounded-md p-3 mb-2"
                >
                    <div>
                        <p className="font-semibold">{p.title}</p>
                        <p className="text-sm text-gray-500">₹{p.price}</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => window.location.href = `/account/admin/products/${p._id}`}
                            className="text-green-600 cursor-pointer border border-gray-500 rounded-sm px-3 hover:bg-green-600 hover:text-white duration-500"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => deleteProduct(p._id)}
                            className="text-red-600 cursor-pointer border border-gray-500 rounded-sm px-3 hover:bg-red-600 hover:text-white duration-500"
                        >
                            Delete
                        </button>
                    </div>


                </div>
            ))}
        </div>
    );
}
