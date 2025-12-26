"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { RootState } from "@/Store";
import { logout } from "@/Store/Slices/loginSlice";
import toast from "react-hot-toast";
import AdminProducts from "./products/page";

const AdminDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.currentUser);

  const [addingProduct, setAddingProduct] = useState(false);
  const [addOption, setAddOption] = useState("product");
  const [storeCat, setStoreCat] = useState<any[]>([]);

  const [category, setCategory] = useState({ name: "" });
  const [product, setProduct] = useState<{
    title: string;
    price: string;
    image: File | null;
    description: string;
    categoryId: string;
    stock: string;
    sizes: string;
    colors: string;
  }>({
    title: "",
    price: "",
    image: null,
    description: "",
    categoryId: "",
    stock: "",
    sizes: "",
    colors: "",
  });

  useEffect(() => {
    const loadCat = async () => {
      const res = await fetch("/api/admin/category", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setStoreCat(data.storeCat || data);
      }
    };
    loadCat();
  }, [])


  console.log(user?.name);
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
      const res = await fetch("/api/admin/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(category),
      });
      console.log(res);
      toast.success("Category added");
      setCategory({ name: "" });
    } catch {
      toast.error("Failed to add category");
    }
  };

  /* ---------------- ADD PRODUCT ---------------- */
  const addProduct = async () => {

    if (addingProduct) return;
    setAddingProduct(true);

    try {

      if (!product.title.trim()) {
        toast.error("Title requierd");
        return;
      }

      if (!product.image) {
        toast.error("Please select an image");
        return;
      }

      if (!product.categoryId) {
        toast.error("Select Category");
        return;
      }

      if (Number(product.price) <= 0) {
        toast.error("Invalid Price");
        return;
      }

      if (Number(product.stock) < 0) {
        toast.error("Invalid stock");
        return;
      }

      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);
      formData.append("categoryId", product.categoryId);
      formData.append("sizes", product.sizes);
      formData.append("colors", product.colors);
      formData.append("image", product.image);

      const res = await fetch("/api/admin/product", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Failed to add product");
        return;
      }

      toast.success("Product added");

      setProduct({
        title: "",
        price: "",
        image: null,
        description: "",
        categoryId: "",
        stock: "",
        sizes: "",
        colors: "",
      });

    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setAddingProduct(false);
    }
  };


  return (
    <>
      <Breadcrumb />

      <div className="max-w-6xl mx-auto md:px-20 px-5 py-20">
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

        <div className="my-5">
          <div className="flex gap-4 border-b border-gray-500 w-fit">
            <button className={`${addOption === "product" ? "border-b font-bold text-purple-600" : "border-none"}  pb-2 cursor-pointer`} onClick={() => setAddOption("product")}>Add Products</button>
            <button className={`${addOption === "category" ? "border-b font-bold text-purple-600" : "border-none"} pb-2 cursor-pointer`} onClick={() => setAddOption("category")}>Add Categories</button>
          </div>
        </div>

        {addOption === "category" && (
          <>
            <div className="bg-white p-6 shadow rounded mb-10">
              <h2 className="font-semibold mb-4">Add Category</h2>
              <input
                placeholder="Category Name"
                className="border border-gray-300 outline-hidden p-2 w-full mb-2"
                value={category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                required
              />

              <button
                onClick={addCategory}
                className="bg-purple-600 text-white px-4 py-2"
              >
                Add Category
              </button>
            </div>
          </>
        )}

        {addOption === "product" && (
          <>
            <div className="bg-white p-6 shadow rounded">
              <h2 className="font-semibold mb-4">Add Product</h2>
              <div className="grid grid-cols-2 gap-8">
                <input className="border border-gray-400 outline-hidden p-2 w-full mb-2" placeholder="Title" onChange={(e) => setProduct({ ...product, title: e.target.value })} />
                <input className="border border-gray-400 outline-hidden p-2 w-full mb-2" placeholder="Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <input type="file" accept="image/*" className="border border-gray-400 outline-hidden p-2 w-full mb-2" onChange={(e) => setProduct({ ...product, image: e.target.files?.[0] || null })} />
                <select
                  className="border p-2 w-full mb-2"
                  value={product.categoryId}
                  onChange={(e) =>
                    setProduct({ ...product, categoryId: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {storeCat.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <input className="border border-gray-400 outline-hidden p-2 w-full mb-2" placeholder="Stock" onChange={(e) => setProduct({ ...product, stock: e.target.value })} />
                <input className="border border-gray-400 outline-hidden p-2 w-full mb-2" placeholder="Sizes (S,M,L)" onChange={(e) => setProduct({ ...product, sizes: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <input className="border border-gray-400 outline-hidden p-2 w-full mb-2" placeholder="Colors (Red,Blue)" onChange={(e) => setProduct({ ...product, colors: e.target.value })} />
                <textarea className="border border-gray-400 outline-hidden p-2 w-full mb-2" placeholder="Description" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
              </div>
              <button
                onClick={addProduct}
                disabled={addingProduct}
                className="bg-purple-600 text-white px-4 py-2 disabled:opacity-50"
              >
                {addingProduct ? "Adding..." : "Add Product"}
              </button>

            </div>
            <AdminProducts />
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
