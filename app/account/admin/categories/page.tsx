"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/category", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    };
    load();
  }, []);

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/admin/category?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.status === 409) {
      toast.error("Category has products. Remove them first.");
      return;
    }

    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Category deleted");
    setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div className="max-w-full mx-auto py-5">
      <h1 className="text-xl font-bold mb-6">Manage Categories</h1>

      {categories.map((c) => (
        <div
          key={c._id}
          className="flex justify-between items-center border border-gray-400 rounded-md p-3 mb-2"
        >
          <p className="font-semibold">{c.name}</p>

          <button
            onClick={() => deleteCategory(c._id)}
            className="text-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
