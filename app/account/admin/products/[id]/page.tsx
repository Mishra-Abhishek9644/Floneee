"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

/* ---------------- SKELETON BOX ---------------- */
const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export default function EditProduct() {
    const { id } = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    const [product, setProduct] = useState<{
        title: string;
        price: string;
        image: File | null;
        description: string;
        categoryId: string;
        stock: string;
        sizes: string;
        colors: string;
        discount: number | "";
    }>({
        title: "",
        price: "",
        image: null,
        description: "",
        categoryId: "",
        stock: "",
        sizes: "",
        colors: "",
        discount: "",
    });

    /* ---------- LOAD PRODUCT + CATEGORIES ---------- */
    useEffect(() => {
        const loadData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    fetch(`/api/products/${id}`),
                    fetch("/api/admin/category", { credentials: "include" }),
                ]);

                if (!prodRes.ok) {
                    toast.error("Product not found");
                    router.back();
                    return;
                }

                const prod = await prodRes.json();
                const cats = catRes.ok ? await catRes.json() : [];

                setCategories(cats);

                setProduct({
                    title: prod.title,
                    price: String(prod.price),
                    image: null,
                    description: prod.description,
                    categoryId: prod.categoryId,
                    stock: String(prod.stock),
                    sizes: prod.sizes.join(","),
                    colors: prod.colors.join(","),
                    discount: Number(prod.discount),
                });
            } catch {
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, router]);

    /* ---------- UPDATE PRODUCT ---------- */
    const updateProduct = async () => {
        if (updating) return;

        if (!product.title.trim()) {
            toast.error("Title required");
            return;
        }

        if (!product.categoryId) {
            toast.error("Select category");
            return;
        }

        const discountValue = product.discount === "" ? 0 : product.discount;
        if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
            toast.error("Invalid Discount");
            return;
        }

        setUpdating(true);

        try {
            const formData = new FormData();
            formData.append("title", product.title);
            formData.append("price", product.price);
            formData.append("stock", product.stock);
            formData.append("description", product.description);
            formData.append("categoryId", product.categoryId);
            formData.append("sizes", product.sizes);
            formData.append("colors", product.colors);
            formData.append("discount", String(discountValue));

            if (product.image) {
                formData.append("image", product.image);
            }

            const res = await fetch(`/api/admin/product?id=${id}`, {
                method: "PUT",
                credentials: "include",
                body: formData,
            });

            if (!res.ok) throw new Error();

            toast.success("Product updated");
            router.push("/account/admin");
        } catch {
            toast.error("Update failed");
        } finally {
            setUpdating(false);
        }
    };

    /* ---------- SKELETON UI ---------- */
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-20 my-10 space-y-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-48" />

                <div className="bg-white shadow p-6 rounded space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-40" />
                </div>
            </div>
        );
    }

    /* ---------- MAIN UI (UNCHANGED) ---------- */
    return (
        <>
            <div className="max-w-4xl mx-auto py-20 my-10">
                <div className="my-5">
                    {pathname.startsWith("/account/admin/products") && (
                        <div className="border w-fit py-1 px-3 hover:text-purple-600">
                            <Link
                                href="/account/admin"
                                className="flex items-center gap-2"
                            >
                                <MoveLeft size={18} /> Back
                            </Link>
                        </div>
                    )}
                </div>

                <h1 className="text-xl font-bold mb-6">Edit Product</h1>

                <div className="bg-white shadow p-6 rounded space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <label htmlFor="">Title
                            <input
                                className="border p-2 w-full"
                                placeholder="Title"
                                value={product.title}
                                onChange={(e) =>
                                    setProduct({ ...product, title: e.target.value })
                                }
                            />
                        </label>

                        <label htmlFor="">Price
                            <input
                                className="border p-2 w-full"
                                placeholder="Price"
                                value={product.price}
                                onChange={(e) =>
                                    setProduct({ ...product, price: e.target.value })
                                }
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <label htmlFor="">Image

                            <input
                                type="file"
                                accept="image/*"
                                className="border p-2 w-full"
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        image: e.target.files?.[0] || null,
                                    })
                                }
                            />
                        </label>

                        <label htmlFor="">Category

                            <select
                                className="border p-2 w-full"
                                value={product.categoryId}
                                onChange={(e) =>
                                    setProduct({ ...product, categoryId: e.target.value })
                                }
                            >
                                <option value="">Select category</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <label htmlFor="">Stock

                            <input
                                className="border p-2 w-full"
                                placeholder="Stock"
                                value={product.stock}
                                onChange={(e) =>
                                    setProduct({ ...product, stock: e.target.value })
                                }
                            />
                        </label>

                        <label htmlFor="">Size

                            <input
                                className="border p-2 w-full"
                                placeholder="Sizes (S,M,L)"
                                value={product.sizes}
                                onChange={(e) =>
                                    setProduct({ ...product, sizes: e.target.value })
                                }
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <label htmlFor="">Color

                            <input
                                className="border p-2 w-full"
                                placeholder="Colors (Red,Blue)"
                                value={product.colors}
                                onChange={(e) =>
                                    setProduct({ ...product, colors: e.target.value })
                                }
                            />
                        </label>
                        <label htmlFor="">Descount
                            <input
                                type="number"
                                className="border border-gray-400 outline-hidden p-2 w-full mb-2"
                                placeholder="Discount (%)"
                                value={product.discount}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        discount: e.target.value === "" ? "" : Number(e.target.value),
                                    })
                                }
                            />
                        </label>

                    </div>

                    <label htmlFor="">Description

                        <textarea
                            className="border p-2 w-full h-36"
                            placeholder="Description"
                            value={product.description}
                            onChange={(e) =>
                                setProduct({ ...product, description: e.target.value })
                            }
                        />
                    </label>
                    <button
                        onClick={updateProduct}
                        disabled={updating}
                        className="bg-purple-600 text-white px-6 py-2 disabled:opacity-50"
                    >
                        {updating ? "Updating..." : "Update Product"}
                    </button>
                </div>
            </div>
        </>
    );
}
