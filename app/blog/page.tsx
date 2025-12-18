"use client";
import Breadcrumb from '@/components/Breadcrumb'
import { Product } from '@/type/Product';
import { Check, Facebook, Instagram, Search, Twitter } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = () => {

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
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

  const filteredData = data.filter((item) => {
    const matchesCategory =
      activeIndex !== null
        ? item.category === categories[activeIndex]
        : true;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });



  return (
    <>
      <Breadcrumb />

      <div className=' container md:px-20 px-5 w-full md:py-20 py-5'>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">

          <div>
            <div className='flex flex-col gap-4'>
              <h1 className='text-lg'>Search</h1>
              <div className="bg-white border border-gray-200 items-center p-2  flex col-span-1/3 ">
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); }}
                  className="grow min-w-0 outline-none bg-transparent"
                  placeholder="Search by name or category..."
                />

              </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.slice(1, 5).map(item => (
              <div
                key={item.id}
                className="cursor-pointer shadow-md"
                onClick={() => {
                  setSelectedProduct(item)
                }}
              >
                <div className=' overflow-hidden'>
                  <img src={item.image} className="h-60 bg-gray-300 w-full p-2 mx-auto object-contain scale-100 hover:scale-105 duration-500" />
                </div>
                <div className='py-5 px-3'>
                  <p className='text-sm text-gray-600'>22 April, 2024 - 4 </p>
                  <h3 className="text-lg font-bold line-clamp-1 my-2">{item.title}</h3>
                  <p className="line-clamp-3">{item.description}</p>
                  <div className='flex justify-between px-2 pt-5 pb-3'>
                    <Link href={`/blog/post/${item.id}`} className='font-semibold'>Read More</Link>
                    <button className='flex'> Share : &nbsp;
                      <span className='grid grid-cols-3 gap-2'>
                        <Facebook className='bg-blue-700 p-1 fill-white rounded-full hover:bg-white hover:fill-blue-700 border hover:border hover:border-blue-700 ' />
                        <Twitter className='bg-sky-600 p-1 fill-white rounded-full hover:bg-white hover:fill-sky-600 border hover:border hover:border-sky-600 ' />
                        <Instagram className='bg-pink-600 p-1 fill-white rounded-full hover:bg-white hover:fill-pink-600 border hover:border hover:border-pink-600 ' />
                      </span>
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div >
    </>
  )
}

export default Page
