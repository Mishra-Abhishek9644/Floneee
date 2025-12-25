"use client";
import React, { useEffect, useMemo, useState } from 'react'
import Card from './Card';
import { Product } from "../type/Product";
import Modal from './Modal';

const ITEMS_LIMIT = 4;

const DailyDeals = () => {

    const [data, setData] = useState<Product[]>([])

    const [activeTab, setActiveTab] = useState<"new" | "best" | "sale">("best");

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [modal, setModal] = useState(false)


    useEffect(() => {
        fetch(`/api/products`)
            .then(response => response.json())
            .then(response => setData(response.products || []))
            .catch(() => setData([]));
    }, [])

    // 🆕 New Arrivals (latest)
    const newArrivals = useMemo(() => {
        return [...data]
            .sort(
                (a, b) =>
                    new Date(b.createdAt ?? "").getTime() -
                    new Date(a.createdAt ?? "").getTime()
            )
            .slice(0, ITEMS_LIMIT);
    }, [data]);

    // ⭐ Best Sellers (rating-based)
    const bestSellers = useMemo(() => {
        return [...data]
            .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
            .slice(0, ITEMS_LIMIT);
    }, [data]);

    // 💸 Sale Items (discount > 0)
    const saleItems = useMemo(() => {
        return data
            .filter((p) => (p.discount ?? 0) > 0)
            .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
            .slice(0, ITEMS_LIMIT);
    }, [data]);

    const activeList =
        activeTab === "new"
            ? newArrivals
            : activeTab === "best"
                ? bestSellers
                : saleItems;


    return (
        <>
            {modal && (
                <div>
                    <Modal product={selectedProduct} open={modal} onClose={() => setModal(false)} />
                </div>
            )}
            <div className='m-1 md:mx-auto md:px-10 '>
                <div className='flex justify-center gap-2 sm:gap-4 md:gap-6 text-lg md:text-3xl font-bold md:my-6 items-center'>
                    <div className='w-10 md:w-20'><hr className='border rounded-2xl' /></div>
                    <div className='flex-nowrap'>DAILY DEALS!</div>
                    <div className='w-10 md:w-20'><hr className='border rounded-2xl' /></div>
                </div>
                <div className='flex justify-center text-sm gap-2 md:w-xl mx-auto my-10 md:text-xl  text-gray-500 md:gap-14'>
                    <button className={activeTab === 'new' ? "text-black font-medium" : "text-gray-500 hover:text-black"} onClick={() => setActiveTab("new")}>New Arrivals</button>
                    <button className={activeTab === 'best' ? "text-black font-medium" : "text-gray-500 hover:text-black"} onClick={() => setActiveTab("best")}>Best Sellers</button>
                    <button className={activeTab === 'sale' ? "text-black font-medium" : "text-gray-500 hover:text-black"} onClick={() => setActiveTab("sale")}>Sale Items</button>
                </div>

                <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 justify-center items-center mx-auto xl:px-40'>
                    {activeList.map((item) => (
                        <Card key={item._id} product={item} onOpen={() => (setSelectedProduct(item), setModal(true))}
                        />

                    ))}
                </div>


            </div>
        </>
    )
}

export default DailyDeals