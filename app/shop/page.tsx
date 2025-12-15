"use client";
import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar'
import { Grid2x2, Grid3x3, Logs, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Product } from "@/type/Product";
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import LongCard from '@/components/LongCard';


const page = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [data, setData] = useState<Product[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [modal, setModal] = useState(false)

  const [activeTab, setActiveTab] = useState<"small" | "mid" | "large">("mid");
  


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

      <div className='m-1 md:mx-auto p-2 md:p-10 '>

        {modal && (
          <div>
            <Modal product={selectedProduct} open={modal} onClose={() => setModal(false)} />
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-[20%_70%] justify-center gap-4'>
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
          <div>
            <div className='flex justify-around items-center'>
              <div className=''>
                <select name="" id="" className=''>
                  <option value="">Default</option>
                  <option value="">Price - Hight to Low</option>
                  <option value="">Price - Low to High</option>
                </select>
              </div>

              <div className='flex gap-3'>
                <button className={activeTab === 'large' ? "text-purple-600 font-bold" : "text-gray-500 hover:text-purple-600"} onClick={() => setActiveTab("large")}><Grid2x2 /></button>
                <button className={activeTab === 'mid' ? "text-purple-600 font-bold" : "text-gray-500 hover:text-purple-600"} onClick={() => setActiveTab("mid")}><Grid3x3 /></button>
                <button className={activeTab === 'small' ? "text-purple-600 font-bold" : "text-gray-500 hover:text-purple-600"} onClick={() => setActiveTab("small")}><Logs /></button>
              </div>
            </div>
             {activeTab === "large" && ( 
            <div className='grid grid-cols-2 '>
              {filteredData.slice(0,12).map((item) => (
                <Card key={item.id} product={item} onOpen={() => (setSelectedProduct(item), setModal(true))} />
              ))}
            </div>)}


            {activeTab === "mid" && ( 
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
              {filteredData.slice(0,12).map((item) => (
                <Card key={item.id} product={item} onOpen={() => (setSelectedProduct(item), setModal(true))} />
              ))}
            </div>)}

            {activeTab === "small" && ( 
            <div className=' '>
              {filteredData.slice(0,12).map((item) => (
                <LongCard key={item.id} product={item} onOpen={() => (setSelectedProduct(item), setModal(true))} />
              ))}
            </div>)}
          </div>
        </div>

      </div>
    </>
  )
}

export default page