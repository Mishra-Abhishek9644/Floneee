"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Grid2x2, Grid3x3, Logs } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Product } from "@/type/Product";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import LongCard from "@/components/LongCard";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 6;

interface Category {
  name: string;
  slug: string;
}

const ShopClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ================= UI STATE ================= */
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"small" | "mid" | "large">("mid");

  /* ================= URL STATE ================= */
  const searchFromUrl = searchParams.get("search") || "";
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [search, setSearch] = useState(searchFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl - 1);

  /* ================= DATA STATE ================= */
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  /* ================= CATEGORY STATE ================= */
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);


  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  /* ================= FETCH PRODUCTS (BACKEND DRIVEN) ================= */
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("q", search);
    if (activeCategory) params.append("category", activeCategory);

    params.append("page", String(currentPage + 1));
    params.append("limit", String(ITEMS_PER_PAGE));

    setLoading(true); // 🔥 START skeleton

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setPagination(res.pagination);
      })
      .finally(() => {
        setLoading(false); // 🔥 STOP skeleton
      });
  }, [search, currentPage, activeCategory]);


  /* ================= URL → STATE SYNC ================= */
  useEffect(() => {
    setSearch(searchFromUrl);
    setCurrentPage(pageFromUrl - 1);
  }, [searchFromUrl, pageFromUrl]);

  /* ================= PAGINATION ================= */
  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected;
    setCurrentPage(newPage);

    router.push(
      `/shop?search=${encodeURIComponent(search)}&page=${newPage + 1}`,
      { scroll: false }
    );
  };
  const CardSkeleton = () => (
    <div className="border-4 border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="bg-gray-200 h-40 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
  const LongCardSkeleton = () => (
    <div className="border-2 border-red-500 rounded-lg p-4 animate-pulse">
      <div className="bg-gray-200 w-32 h-24 rounded"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  const CategorySkeleton = () => (
    <div className="flex gap-3 items-center animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </div>
  );

  const AllCategorySkeleton = () => (
    <div className="flex gap-3 items-center animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded w-10"></div>
    </div>
  );


  return (
    <>
      <Breadcrumb />

      <div className="m-1 md:mx-auto p-2 md:p-10">
        {/* ================= MODAL ================= */}
        {modal && selectedProduct && (
          <Modal
            product={selectedProduct}
            open={modal}
            onClose={() => setModal(false)}
          />
        )}


        <div className="grid grid-cols-1 md:grid-cols-[20%_70%] gap-4">
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">Search</h1>

            <div className="bg-white border p-2 flex">
              <input
                type="text"
                value={search}
                disabled={loading}
                className="grow outline-none bg-transparent disabled:opacity-50"
                placeholder={loading ? "Loading products..." : "Search products..."}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(0);
                  router.push(`/shop?search=${encodeURIComponent(e.target.value)}&page=1`);
                }}
              />

            </div>

            {/* ================= CATEGORIES ================= */}
            <div className="flex flex-col mt-8">
              <h1>Categories</h1>

              {/* ================= ALL CATEGORY ================= */}
              {loading ? (
                <AllCategorySkeleton />
              ) : (
                <div className="flex gap-3 my-2 text-lg">
                  <button
                    disabled={loading}
                    className={`border px-3 py-2 rounded-md transition
        ${activeCategory === null ? "bg-purple-600 text-white" : ""}
        disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={() => {
                      setActiveCategory(null);
                      setCurrentPage(0);
                      router.push(`/shop?search=${encodeURIComponent(search)}&page=1`);
                    }}
                  />
                  <span>All</span>
                </div>
              )}


              {categories.length === 0
                ? Array.from({ length: 5 }).map((_, i) => (
                  <CategorySkeleton key={i} />
                ))
                : categories.map((cat) => (
                  <div key={cat.slug} className="flex gap-3 my-2 text-lg">
                    <button
                      className={`border px-3 py-2 rounded-md ${activeCategory === cat.slug ? "bg-purple-600" : ""
                        }`}
                      onClick={() => {
                        setActiveCategory(cat.slug);
                        setCurrentPage(0);
                        router.push(
                          `/shop?search=${encodeURIComponent(search)}&page=1`
                        );
                      }}
                    />
                    <span>{cat.name}</span>
                  </div>
                ))}

            </div>
          </div>

          {/* ================= PRODUCT SECTION ================= */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab("large")}
                  className={activeTab === "large" ? "text-purple-600" : ""}
                >
                  <Grid2x2 />
                </button>
                <button
                  onClick={() => setActiveTab("mid")}
                  className={activeTab === "mid" ? "text-purple-600" : ""}
                >
                  <Grid3x3 />
                </button>
                <button
                  onClick={() => setActiveTab("small")}
                  className={activeTab === "small" ? "text-purple-600" : ""}
                >
                  <Logs />
                </button>
              </div>
            </div>

            {/* ❌ SHOW NOTHING while loading */}
            {!loading && products.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <h2 className="text-2xl font-semibold">Product not found</h2>
              </div>
            )}

            <>
              {activeTab === "large" && (
                <div className="grid grid-cols-2 gap-4">
                  {loading
                    ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <CardSkeleton key={i} />
                    ))
                    : products.map((item) => (
                      <Card
                        key={item._id}
                        product={item}
                        onOpen={() => {
                          setSelectedProduct(item);
                          setModal(true);
                        }}
                      />
                    ))}
                </div>
              )}


              {activeTab === "mid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {loading
                    ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <CardSkeleton key={i} />
                    ))
                    : products.map((item) => (
                      <Card
                        key={item._id}
                        product={item}
                        onOpen={() => {
                          setSelectedProduct(item);
                          setModal(true);
                        }}
                      />
                    ))}
                </div>
              )}


              {activeTab === "small" && (
                <div className="flex flex-col gap-4">
                  {loading
                    ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <LongCardSkeleton key={i} />
                    ))
                    : products.map((item) => (
                      <LongCard
                        key={item._id}
                        product={item}
                        onOpen={() => {
                          setSelectedProduct(item);
                          setModal(true);
                        }}
                      />
                    ))}
                </div>
              )}

            </>
          </div>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center mt-12">
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
            pageCount={pagination?.totalPages || 0}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            containerClassName="flex gap-3"
            pageClassName="border rounded-full"
            pageLinkClassName="w-10 h-10 flex items-center justify-center"
            activeClassName="bg-purple-600 text-white"
            disabledClassName="opacity-50"
          />
        </div>
      </div>
    </>
  );
};

export default ShopClient;
