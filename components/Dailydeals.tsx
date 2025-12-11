"use client";
import React, { useEffect, useState } from 'react'
import Card from './Card';

const DailyDeals = () => {

     const [data, setData] = useState([])
   useEffect(() => {
    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => setData(data));
   }, [])
   
    return (
        <>
            <div className='m-1 md:mx-auto md:p-10 '>
                <div className='flex justify-center gap-2 sm:gap-4 md:gap-6 text-lg md:text-3xl font-bold md:my-6 items-center'>
                    <div className='w-10 md:w-20'><hr className='border rounded-2xl' /></div>
                    <div className='flex-nowrap'>DAILY DEALS!</div>
                    <div className='w-10 md:w-20'><hr className='border rounded-2xl' /></div>
                </div>
                <div className='flex justify-center text-sm gap-2 md:w-xl mx-auto my-10 md:text-xl  text-gray-500 md:gap-14'>
                    <button className='hover:text-black'>New Arrivals</button>
                    <button className='hover:text-black'>Best Sellers</button>
                    <button className='hover:text-black'>Sale Items</button>
                </div>
                <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 justify-center items-center mx-auto md:px-40'>
                    {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
            />
          ))}
                </div>
            </div>
        </>
    )
}

export default DailyDeals