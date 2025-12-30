"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { RootState } from "@/Store";
import { logout } from "@/Store/Slices/loginSlice";
import toast from "react-hot-toast";

import AdminProducts from "./products/page";
import AdminContacts from "./contacts/page";
import AdminCategories from "./categories/page";
import AdminOrdersPage from "./orders/page";

/*  SKELETON  */
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const AdminDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.currentUser);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [addOption, setAddOption] = useState("product");
  const [storeCat, setStoreCat] = useState<any[]>([]);
  const [addingProduct, setAddingProduct] = useState(false);

  const [category, setCategory] = useState({ name: "" });
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: null as File | null,
    description: "",
    categoryId: "",
    stock: "",
    sizes: "",
    colors: "",
    discount: "" as number | "",
  });

  /*  LOAD CATEGORY  */
  useEffect(() => {
    const loadCat = async () => {
      try {
        const res = await fetch("/api/admin/category", {
          credentials: "include",
        });
        const data = await res.json();
        setStoreCat(data.storeCat || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCat();
  }, []);

  /*  LOGOUT  */
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

  /*  ADD CATEGORY  */
  const addCategory = async () => {
    try {
      await fetch("/api/admin/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(category),
      });
      toast.success("Category added");
      setCategory({ name: "" });
    } catch {
      toast.error("Failed to add category");
    }
  };

  /*  ADD PRODUCT  */
  const addProduct = async () => {
    if (addingProduct) return;
    setAddingProduct(true);

    try {
      if (!product.title || !product.image || !product.categoryId)
        return toast.error("Missing fields");

      const formData = new FormData();
      Object.entries(product).forEach(([k, v]) => {
        if (k !== "image") formData.append(k, String(v));
      });
      formData.append("image", product.image);

      const res = await fetch("/api/admin/product", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success("Product added");
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      toast.error("Failed to add product");
    } finally {
      setAddingProduct(false);
    }
  };

  /*  SKELETON  */
  if (!user || loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <>
      <Breadcrumb />

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 text-sm rounded transition"
          >
            Logout
          </button>
        </div>

        {/* USER INFO */}
        <div className="bg-gray-100 p-6 rounded mb-8">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p className="text-purple-600 font-semibold">
            Role: {user.role}
          </p>
        </div>

      
        {/* TABS */}
        <div className="flex gap-3 mb-8">
          {["product", "category", "contact", "order"].map((tab) => (
            <button
              key={tab}
              onClick={() => setAddOption(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  addOption === tab
                    ? "bg-purple-600 text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CATEGORY */}
        {addOption === "category" && (
          <>
            <div className="bg-white p-6 shadow rounded mb-8">
              <h2 className="font-semibold mb-4">Add Category</h2>
              <input
                className="border p-2 w-full mb-3"
                placeholder="Category Name"
                value={category.name}
                onChange={(e) => setCategory({ name: e.target.value })}
              />
              <button
                onClick={addCategory}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Add Category
              </button>
            </div>
            <AdminCategories />
          </>
        )}

        {/* PRODUCT */}
        {addOption === "product" && (
          <>
            <div className="bg-white p-6 shadow rounded mb-8">
              <h2 className="font-semibold mb-4">Add Product</h2>

              <input
                className="border p-2 w-full mb-2"
                placeholder="Title"
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />

              <input
                type="file"
                ref={fileRef}
                className="border p-2 w-full mb-2"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    image: e.target.files?.[0] || null,
                  })
                }
              />

              <select
                className="border p-2 w-full mb-3"
                onChange={(e) =>
                  setProduct({ ...product, categoryId: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {storeCat.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <button
                onClick={addProduct}
                disabled={addingProduct}
                className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {addingProduct ? "Adding..." : "Add Product"}
              </button>
            </div>

            <AdminProducts />
          </>
        )}

        {addOption === "contact" && <AdminContacts />}

        {/* ORDERS */}
        {addOption === "order" && <AdminOrdersPage />}
      </div>
    </>
  );
};

export default AdminDashboard;
