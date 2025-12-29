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

/* ---------------- SKELETON BOX ---------------- */
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const generateDescription = (product: {
  title: string;
  sizes: string;
  colors: string;
}) => {
  return `${product.title} is made from premium quality fabric, designed for everyday comfort and style.
  Available in sizes ${product.sizes || "standard"} and colors ${product.colors || "multiple"}.
  Perfect for casual wear, daily use, and all-day comfort.`;
};

const AdminDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.currentUser);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true); // 🔹 SKELETON
  const [addingProduct, setAddingProduct] = useState(false);
  const [addOption, setAddOption] = useState("product");
  const [storeCat, setStoreCat] = useState<any[]>([]);

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

  /* ---------------- LOAD CATEGORY ---------------- */
  useEffect(() => {
    const loadCat = async () => {
      try {
        const res = await fetch("/api/admin/category", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setStoreCat(data.storeCat || data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // 🔹 SKELETON END
      }
    };
    loadCat();
  }, []);

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
      if (!product.title.trim()) return toast.error("Title required");
      if (!product.image) return toast.error("Select image");
      if (!product.categoryId) return toast.error("Select category");

      const discountValue = product.discount === "" ? 0 : product.discount;

      const finalDescription =
        product.description.trim() || generateDescription(product);

      const formData = new FormData();
      Object.entries({
        title: product.title,
        price: product.price,
        stock: product.stock,
        description: finalDescription,
        categoryId: product.categoryId,
        sizes: product.sizes,
        colors: product.colors,
        discount: String(discountValue),
      }).forEach(([k, v]) => formData.append(k, v));

      formData.append("image", product.image);

      const res = await fetch("/api/admin/product", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) return toast.error("Failed to add product");

      toast.success("Product added");
      if (fileRef.current) fileRef.current.value = "";

      setProduct({
        title: "",
        price: "",
        image: null,
        description: "",
        categoryId: "",
        stock: "",
        sizes: "",
        colors: "",
        discount: 0,
      });
    } catch {
      toast.error("Failed to add product");
    } finally {
      setAddingProduct(false);
    }
  };

  /* ---------------- SKELETON SCREEN ---------------- */
  if (!user || loading) {
    return (
      <div className="max-w-6xl mx-auto md:px-20 px-5 py-20 space-y-8">
        <Skeleton className="h-8 w-40" />
        <div className="bg-gray-100 p-6 rounded space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-5 w-28" />
          ))}
        </div>
        <div className="bg-white p-6 shadow rounded space-y-4">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <>
      <Breadcrumb />

      <div className="max-w-6xl mx-auto md:px-20 px-5 py-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-red-600 hover:text-white px-4 py-2 text-sm uppercase duration-500"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-md mb-8">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="text-purple-600 font-semibold">Role: {user.role}</p>
        </div>

        <div className="flex gap-4 border-b border-gray-500 w-fit mb-6">
          {["product", "category", "contact", "order"].map((tab) => (
            <button
              key={tab}
              onClick={() => setAddOption(tab)}
              className={`pb-2 ${addOption === tab
                  ? "border-b font-bold text-purple-600"
                  : ""
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {addOption === "category" && (
          <>
            <div className="bg-white p-6 shadow rounded mb-10">
              <input
                className="border p-2 w-full mb-2"
                placeholder="Category Name"
                value={category.name}
                onChange={(e) =>
                  setCategory({ name: e.target.value })
                }
              />
              <button
                onClick={addCategory}
                className="bg-purple-600 text-white px-4 py-2"
              >
                Add Category
              </button>
            </div>
            <AdminCategories />
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
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  className="border border-gray-400 p-2 mb-2"
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.files?.[0] || null })
                  }
                />
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

              <button
                onClick={() => addProduct()}
                disabled={addingProduct}
                className="bg-purple-600 text-white px-4 py-2 disabled:opacity-50 cursor-pointer"
              >
                {addingProduct ? "Adding..." : "Add Product"}
              </button>

            </div>
            <AdminProducts />
          </>
        )}

        {addOption === "contact" && <AdminContacts />}
        {addOption === "order" && <div>All orders here...</div>}
      </div>
    </>
  );
};

export default AdminDashboard;
