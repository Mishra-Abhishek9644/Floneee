"use client";
import Breadcrumb from '@/components/Breadcrumb'
import { Product } from '@/type/Product';
import { Check, Facebook, Instagram, MoveLeft, Search, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const BlogLeftSidebar = () => {

    const [data, setData] = useState<Product[]>([])
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setData(data));
    }, [])

    const categories = Array.from(
        new Set(data.map(item => item.category))
    );

    const selectedCategory =
        activeIndex !== null ? categories[activeIndex] : null;

    const filteredData = selectedCategory
        ? data.filter(item => item.category === selectedCategory)
        : data;

    const pathname = usePathname();

    return (
        <>

            <div>
                <div className='flex flex-col gap-4'>
                    {pathname === "/blog" ? (
                        <>
                            <h1 className="text-lg">Search</h1>
                            <div className="bg-white border border-gray-200 items-center p-2 flex col-span-1/3">
                                <input
                                    type="text"
                                    className="grow min-w-0 outline-none bg-transparent px-2"
                                    placeholder="Search here..."
                                />
                                <button className="hover:text-purple-500 hover:scale-105 p-1 border-l pl-4">
                                    <Search size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className=" border w-fit py-1 px-3 hover:text-purple-600 ">
                            <Link href="/blog" className="flex items-center gap-2">
                                <MoveLeft size={18} />
                                Back
                            </Link>
                        </div>
                    )}


                    <div className='flex flex-col mt-8'>
                        <h1 className='text-lg font-semibold'>Recents Projects</h1>
                        <div>
                            {filteredData.slice(1, 5).map((item) => (
                                <div key={item.id} className='flex items-center gap-3 my-2 text-lg border-b border-gray-400 py-2' >
                                    <img src={item.image} className="h-10 object-contain bg-gray-300 p-2" />
                                    <h3 className="text-sm line-clamp-1 my-2">{item.title}</h3>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className='flex flex-col mt-8'>
                        <h1>Categories</h1>
                        <div className='flex gap-3 my-1 text-lg'>
                            <button className={`border border-gray-400 px-3 py-2  rounded-md ${activeIndex === null ? "bg-purple-600" : ""}`}
                                onClick={() => setActiveIndex(null)}
                            />
                            <span>All</span>
                        </div>


                        <div>
                            {categories.map((category, index) => (
                                <div className='flex gap-3 my-2 text-lg' key={category}>
                                    <button className={`border border-gray-400 px-3 py-2  rounded-md ${activeIndex === index ? "bg-purple-600" : ""}`}
                                        onClick={() => setActiveIndex(index)}
                                    />
                                    <span>{category}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>



        </>
    )
}

export default BlogLeftSidebar
