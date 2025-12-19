"use client";
import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const Page = () => {



    // if you have cart slice
    const cartCount = useSelector(
        (state: any) => state.cartList.items
    );
    const total = cartCount.reduce(
        (sum: number, item: any) => sum + item.price * item?.quantity,
        0
    );


    return (
        <>
            <Breadcrumb />
            <div className='md:px-36 md:py-20 px-5 py-10'>
                <div className='w-full grid md:grid-cols-2 gap-10'>

                    {/* Billing */}
                    <div>
                        <h2 className='my-4 text-xl font-semibold'>Billing Details</h2>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
                            <label className="flex flex-col gap-2">
                                First Name
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                            <label className="flex flex-col gap-2">
                                Last Name
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                        </div>

                        <div className='mt-6 w-full'>
                            <label className="flex flex-col gap-2">
                                Company Name
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                        </div>

                        <div className='mt-6 w-full'>
                            <label className="flex flex-col gap-2">
                                Country
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                        </div>

                        <div className='mt-6 w-full'>
                            <label className="flex flex-col gap-2">
                                Street Address
                                <input placeholder='House number and street name'
                                    className='border border-gray-300 py-2 px-4 w-full' />
                                <input placeholder='Apartment, suite, unit etc.'
                                    className='border border-gray-300 py-2 px-4 w-full mt-3' />
                            </label>
                        </div>

                        <div className='mt-6 w-full'>
                            <label className="flex flex-col gap-2">
                                Town / City
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 w-full'>
                            <label className="flex flex-col gap-2">
                                State / Country
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                            <label className="flex flex-col gap-2">
                                Postcode / Zip
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 w-full'>
                            <label className="flex flex-col gap-2">
                                Phone
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                            <label className="flex flex-col gap-2">
                                Email Address
                                <input className='border border-gray-300 py-2 px-4 w-full' />
                            </label>
                        </div>

                        <div className='mt-6 w-full'>
                            <label className="flex flex-col gap-2">
                                Order Notes
                                <textarea
                                    className='border border-gray-300 py-2 px-4 w-full'
                                    placeholder='Notes about your order'
                                />
                            </label>
                        </div>
                    </div>

                    {/* Order */}
                    <div>
                        <h2 className='my-4 text-xl font-semibold'>Your Order</h2>

                        <div className='bg-[#f6f6f6] px-6 py-8 rounded-lg space-y-4'>
                            <div className='flex justify-between font-semibold border-b border-gray-300 pb-4'>
                                <p>Product</p>
                                <p>Total</p>
                            </div>


                            {cartCount.map((item: any) => (
                                <div className='flex justify-between border-b border-gray-300 pb-4 w-full' key={item.id}>

                                    <p className="w-2/3">
                                        {item.title} × {item.quantity}
                                    </p>
                                    <p>${item.price * item.quantity}</p>
                                </div>
                            ))}




                            <div className='flex justify-between border-b border-gray-300 pb-4'>
                                <p>Shipping</p>
                                <p>Free Shipping</p>
                            </div>


                            <div className='flex justify-between font-semibold border-b border-gray-300 pb-4'>
                                <p>Total</p>
                                <p>${total}</p>
                            </div>

                        </div>

                        <button className='bg-purple-600 hover:bg-black duration-500 text-white py-4 w-full my-6 rounded-full text-sm uppercase'>
                            Place Order
                        </button>
                    </div>

                </div>
            </div>

        </>

    );
};

export default Page;
