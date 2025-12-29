"use client";

import { Product } from "@/type/Product";
import { MoveLeft, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogLeftSidebar = () => {
  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((res) => res.json()),
      fetch("/api/products").then((res) => res.json()),
    ])
      .then(([cats, prods]) => {
        setCategories(cats || []);
        setData(prods.products ?? []);
        setLoading(false);
      })
      .catch(() => {
        setCategories([]);
        setData([]);
        setLoading(false);
      });
  }, []);

  /* ================= FILTER ================= */
  const filteredData = data.filter((item) => {
    const matchesCategory = activeCategory
      ? item.categoryId.slug === activeCategory
      : true;

    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });


  /* ================= REAL CONTENT ================= */
  return (
    <div>
      <div className="flex flex-col gap-4">
        {/* SEARCH / BACK */}
        {pathname === "/blog" ? (
          <>
            <h1 className="text-lg">Search</h1>
            <div className="bg-white border border-gray-200 items-center p-2 flex">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="grow outline-none bg-transparent px-2"
                placeholder="Search here..."
              />
              <Search size={18} />
            </div>
          </>
        ) : (
          <div className="border w-fit py-1 px-3 hover:text-purple-600">
            <Link href="/blog" className="flex items-center gap-2">
              <MoveLeft size={18} />
              Back
            </Link>
          </div>
        )}

        {/* RECENT */}
        <div className="flex flex-col mt-8">
          <h1 className="text-lg font-semibold">Recents Projects</h1>
          {filteredData.slice(0, 5).map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 my-2 border-b border-gray-400 py-2"
            >
              <img
                src={item.image}
                className="h-10 object-contain bg-gray-300 p-2"
                alt={item.title}
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
              className={`border border-gray-400 px-3 py-2 rounded-md ${activeCategory === null ? "bg-purple-600" : ""
                }`}
              onClick={() => setActiveCategory(null)}
            />
            <span>All</span>
          </div>

          {categories.map((cat) => (
            <div className="flex gap-3 my-2 text-lg" key={cat.slug}>
              <button
                className={`border border-gray-400 px-3 py-2 rounded-md ${activeCategory === cat.slug ? "bg-purple-600" : ""
                  }`}
                onClick={() => setActiveCategory(cat.slug)}
              />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogLeftSidebar;
