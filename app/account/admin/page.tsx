"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { RootState } from "@/Store";
import { logout } from "@/Store/Slices/loginSlice";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.currentUser);

  const [category, setCategory] = useState({ name: "", slug: "" });
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    categoryId: "",
    stock: "",
    sizes: "",
    colors: "",
  });

  if (!user) return null;

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());
      toast.success("Logged out");
      router.replace("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  /* ---------------- ADD CATEGORY ---------------- */
  const addCategory = async () => {
    try {
      await fetch("/api/admin/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(category),
      });

      toast.success("Category added");
      setCategory({ name: "", slug: "" });
    } catch {
      toast.error("Failed to add category");
    }
  };

  /* ---------------- ADD PRODUCT ---------------- */
  const addProduct = async () => {
    try {
      await fetch("/api/admin/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
          sizes: product.sizes.split(","),
          colors: product.colors.split(","),
        }),
      });

      toast.success("Product added");
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <>
      <Breadcrumb />

      <div className="max-w-6xl mx-auto py-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-red-600 hover:text-white px-4 py-2 text-sm uppercase duration-500"
          >
            Logout
          </button>
        </div>

        {/* ADMIN INFO */}
        <div className="bg-gray-100 p-6 rounded-md mb-8">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="text-purple-600 font-semibold">Role: {user.role}</p>
        </div>

        {/* ADD CATEGORY */}
        <div className="bg-white p-6 shadow rounded mb-10">
          <h2 className="font-semibold mb-4">Add Category</h2>
          <input
            placeholder="Category Name"
            className="border p-2 w-full mb-2"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <input
            placeholder="Slug"
            className="border p-2 w-full mb-2"
            value={category.slug}
            onChange={(e) => setCategory({ ...category, slug: e.target.value })}
          />
          <button
            onClick={addCategory}
            className="bg-purple-600 text-white px-4 py-2"
          >
            Add Category
          </button>
        </div>

        {/* ADD PRODUCT */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="font-semibold mb-4">Add Product</h2>
          <input className="border p-2 w-full mb-2" placeholder="Title" onChange={(e) => setProduct({ ...product, title: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Image URL" onChange={(e) => setProduct({ ...product, image: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Category ID" onChange={(e) => setProduct({ ...product, categoryId: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Stock" onChange={(e) => setProduct({ ...product, stock: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Sizes (S,M,L)" onChange={(e) => setProduct({ ...product, sizes: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Colors (Red,Blue)" onChange={(e) => setProduct({ ...product, colors: e.target.value })} />
          <textarea className="border p-2 w-full mb-2" placeholder="Description" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          <button
            onClick={addProduct}
            className="bg-purple-600 text-white px-4 py-2"
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
