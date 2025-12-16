"use client";
import { Product } from '@/type/Product';
import { Check, Facebook, Instagram, Search, Twitter } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import BlogLeftSidebar from './BlogLeftSidebar';

interface BlogPostProps {
    id: number;
    image : string;
    description : string;
    title : string;
}

const BlogPost = ({ id }: BlogPostProps) => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(product => setProduct(product));
    }, [id])

    return (
        <>
            <div className='max-w-7xl mx-auto md:px-20 px-5 w-full md:py-20 py-5'>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
                    <BlogLeftSidebar />

                    {/* right */}
                    <div className=''>
                        <div className='md:h-[70vh] p-10 bg-gray-100 overflow-hidden'>
                            <img className='w-full' src={product.image} alt="" />
                        </div>
                        <div>
                            <br />
                            <h3 className='font-bold text-3xl'>{product.title}</h3><br />
                            <p>{product.description}</p><br />
                            <p>{product.description}</p><br />
                            <p>{product.description}</p>
                        </div>
                        <div className='grid grid-cols-2 place-content-center  gap-2 py-10'>
                            <img className='md:h-96 p-10 bg-gray-300 h-44 object-contain' src={product.image} alt="" />
                            <img className='md:h-96 p-10 bg-gray-300 h-44 object-contain' src={product.image} alt="" />
                        </div>
                        <p>{product.description}</p>
                        <div className='flex justify-between px-2 pt-5 pb-3'>
                            <button className=''>LifeStyle, Interior, Outdoor</button>
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
            </div>
        </>
    )
}

export default BlogPost