"use client";

import Breadcrumb from '@/components/Breadcrumb'
import { Grid2x2, Grid3x3, Logs } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Product } from "@/type/Product";
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import LongCard from '@/components/LongCard';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


const ShopClient = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"" | "high" | "low">("");

  const [data, setData] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"small" | "mid" | "large">("mid");

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setData);
  }, []);

  /* ---------------- URL → STATE ---------------- */
  useEffect(() => {
    setSearch(searchFromUrl);
    setCurrentPage(1);
  }, [searchFromUrl]);

  const uniqueCategories = Array.from(
    new Set(data.map(item => item.category))
  );

  const filteredData = data.filter((item) => {
    const matchesCategory =
      activeIndex !== null
        ? item.category === uniqueCategories[activeIndex]
        : true;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === "high") return b.price - a.price;
    if (sortOrder === "low") return a.price - b.price;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <>
      <Breadcrumb />

      <div className='m-1 md:mx-auto p-2 md:p-10 '>

        {modal && (
          <Modal
            product={selectedProduct}
            open={modal}
            onClose={() => setModal(false)}
          />
        )}

        <div className='grid grid-cols-1 md:grid-cols-[20%_70%] justify-center gap-4'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-lg'>Search</h1>

            <div className="bg-white border border-gray-200 items-center p-2 flex">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                  router.push(`/shop?search=${encodeURIComponent(e.target.value)}`);
                }}
                className="grow min-w-0 outline-none bg-transparent"
                placeholder="Search by name or category..."
              />
            </div>

            <div className='flex flex-col mt-8'>
              <h1>Categories</h1>

              <div className='flex gap-3 my-1 text-lg'>
                <button
                  className={`border border-gray-400 px-3 py-2 rounded-md ${activeIndex === null ? "bg-purple-600" : ""
                    }`}
                  onClick={() => setActiveIndex(null)}
                />
                <span>All</span>
              </div>

              {uniqueCategories.map((category, index) => (
                <div className='flex gap-3 my-2 text-lg' key={category}>
                  <button
                    className={`border border-gray-400 px-3 py-2 rounded-md ${activeIndex === index ? "bg-purple-600" : ""
                      }`}
                    onClick={() => setActiveIndex(index)}
                  />
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className='flex justify-around items-center'>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value as "" | "high" | "low");
                  setCurrentPage(1);
                }}
                className="border px-3 py-1 rounded"
              >
                <option value="">Default</option>
                <option value="high">Price - High to Low</option>
                <option value="low">Price - Low to High</option>
              </select>

              <div className='flex gap-3'>
                <button onClick={() => setActiveTab("large")} className={`${activeTab === "large" ?  " text-purple-600": "" }`}><Grid2x2 /></button>
                <button onClick={() => setActiveTab("mid")} className={`${activeTab === "mid" ?  " text-purple-600": "" }`}><Grid3x3 /></button>
                <button onClick={() => setActiveTab("small")} className={`${activeTab === "small" ?  " text-purple-600": "" }`}><Logs /></button>
              </div>
            </div>

            {activeTab === "large" && (
              <>
                {paginatedData.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    <h2 className="text-2xl font-semibold">Product not found</h2>
                    <p className="mt-2">Try searching with a different keyword.</p>
                  </div>
                ) : (
                  <div className='grid grid-cols-2'>
                    {paginatedData.map(item => (
                      <Card key={item.id} product={item} onOpen={() => {
                        setSelectedProduct(item);
                        setModal(true);
                      }} />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "mid" && (
              <>
                {paginatedData.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    <h2 className="text-2xl font-semibold">Product not found</h2>
                    <p className="mt-2">Try searching with a different keyword.</p>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {paginatedData.map(item => (
                      <Card key={item.id} product={item} onOpen={() => {
                        setSelectedProduct(item);
                        setModal(true);
                      }} />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "small" && (
              <>
                {paginatedData.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    <h2 className="text-2xl font-semibold">Product not found</h2>
                    <p className="mt-2">Try searching with a different keyword.</p>
                  </div>
                ) : (
                  <div>
                    {paginatedData.map(item => (
                      <LongCard key={item.id} product={item} onOpen={() => {
                        setSelectedProduct(item);
                        setModal(true);
                      }} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 rounded-full ${currentPage === page
                  ? "bg-purple-600 text-white"
                  : "bg-white border text-purple-600"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShopClient;
