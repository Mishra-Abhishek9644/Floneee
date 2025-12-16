"use client";
import Breadcrumb from '@/components/Breadcrumb'
import { Product } from '@/type/Product';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Page = () => {

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [data, setData] = useState<Product[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setData(data));
  }, [])

  const uniqueCategories = Array.from(
    new Set(data.map(item => item.category))
  );

  const selectedCategory =
    activeIndex !== null ? uniqueCategories[activeIndex] : null;

  const filteredData = selectedCategory
    ? data.filter(item => item.category === selectedCategory)
    : data;

  return (
    <>
      <Breadcrumb />

      <div className='max-w-7xl mx-auto md:px-20 px-5 w-full md:py-20 py-5'>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
          <div>
            <div className='flex flex-col gap-4'>
              <h1 className='text-lg'>Search</h1>
              <div className="bg-white border border-gray-200 items-center p-2  flex col-span-1/3 ">
                <input type="text" className="grow min-w-0 outline-none bg-transparent" placeholder="Search here..." />
                <button className="hover:text-purple-500 hover:scale-105 p-1"><Search size={18} /></button>
              </div>
              <div className='flex flex-col mt-8'>
                <h1>Categories</h1>
                <div className='flex gap-3 my-1 text-lg'>
                  <button
                    className={`border border-gray-400 px-3 py-2  rounded-md ${activeIndex === null ? "bg-purple-600" : ""
                      }`}
                    onClick={() => setActiveIndex(null)}
                  />
                  <span>All</span>
                </div>
                <div>
                  {uniqueCategories.map((category, index) => (
                    <div className='flex gap-3 my-2 text-lg' key={category}>
                      <button
                        className={`border border-gray-400 px-3 py-2  rounded-md ${activeIndex === index ? "bg-purple-600" : ""
                          }`}
                        onClick={() => setActiveIndex(index)}
                      />                    <span>{category}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.slice(0, 4).map(item => (
              <div
                key={item.id}
                className="border cursor-pointer"
                onClick={() => {
                  setSelectedProduct(item)
                }}
              >
                <img src={item.image} className="h-60 bg-gray-300 w-full mx-auto object-contain scale-100 hover:scale-105" />
                <div className='p-2'>
                  <h3 className="text-sm mt-2">{item.title}</h3>
                  <p className="font-bold line-clamp-5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default Page
