"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Product } from "@/type/Product";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Category {
  name: string;
  slug: string;
}

const Page = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  /* ================= FETCH PRODUCTS (FILTERED) ================= */
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("a", search);
    if (activeCategory) params.append("category", activeCategory);

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => setData(res.products ?? []));
  }, [search, activeCategory]);

  return (
    <>
      <Breadcrumb />

      <div className="container md:px-20 px-5 w-full md:py-20 py-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
          {/* LEFT */}
          <div>
            <div className="flex flex-col gap-4">
              <h1 className="text-lg">Search</h1>

              <div className="bg-white border border-gray-200 p-2 flex">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="grow outline-none bg-transparent"
                  placeholder="Search by name or category..."
                />
              </div>

              {/* RECENT */}
              <div className="flex flex-col mt-8">
                <h1 className="text-lg font-semibold">Recents Projects</h1>
                {data.slice(0, 4).map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 my-2 border-b border-gray-400 py-2"
                  >
                    <img
                      src={item.image}
                      className="h-10 object-contain bg-gray-300 p-2"
                    />
                    <h3 className="text-sm line-clamp-1">{item.title}</h3>
                  </div>
                ))}
              </div>

              {/* CATEGORIES */}
              <div className="flex flex-col mt-8">
                <h1>Categories</h1>

                <div className="flex gap-3 my-1 text-lg">
                  <button
                    className={`border px-3 py-2 rounded-md ${
                      activeCategory === null ? "bg-purple-600" : ""
                    }`}
                    onClick={() => setActiveCategory(null)}
                  />
                  <span>All</span>
                </div>

                {categories.map((cat) => (
                  <div key={cat.slug} className="flex gap-3 my-2 text-lg">
                    <button
                      className={`border px-3 py-2 rounded-md ${
                        activeCategory === cat.slug ? "bg-purple-600" : ""
                      }`}
                      onClick={() => setActiveCategory(cat.slug)}
                    />
                    <span>{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.slice(0, 6).map((item) => (
              <div key={item._id} className="shadow-md">
                <Link href={`/blog/post/${item._id}`}>
                  <img
                    src={item.image}
                    className="h-60 w-full object-contain bg-gray-300 p-2"
                  />
                  <div className="p-3">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="line-clamp-3">{item.description}</p>
                    <p className="text-sm">{item.categoryId.name}</p>

                    <div className="flex justify-between pt-4">
                      <span className="font-semibold">Read More</span>
                      <span className="flex gap-2">
                        <Facebook size={16} />
                        <Twitter size={16} />
                        <Instagram size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
