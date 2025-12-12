"use client";
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { Product } from "../type/Product";
import { Circle, Dribbble, Facebook, GitCompareArrows, Heart, Instagram, Linkedin, Twitter } from 'lucide-react';



const ProductDetails = () => {
    const [data, setData] = useState<Product[]>([])
    const [qty, setQty] = useState(1);
    const [show, setShow] = useState("1st");

    const increase = () => setQty(qty + 1);
    const decrease = () => { if (qty > 1) setQty(qty - 1); }

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setData(data));
    }, [])

    return (
        <>
            <section className='my-10 lg:mx-44 md:mx-28 sm:mx-10 '>
                {/* first seciton */}
                <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 place-content-center py-16'>
                    <div>
                        <div>
                            <img src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/6.jpg" className='' alt="product-iamge" />
                        </div>
                        <div className='my-5 grid grid-cols-5 gap-2'>
                            <img src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/6.jpg" className='' alt="product-iamge" />
                            <img src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/6.jpg" className='' alt="product-iamge" />
                            <img src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/6.jpg" className='' alt="product-iamge" />
                            <img src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/6.jpg" className='' alt="product-iamge" />
                            <img src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/6.jpg" className='' alt="product-iamge" />

                        </div>
                    </div>
                    <div className='lg:px-20 md:px-12 px-5'>
                        <div className='lg:text-2xl'>Title Jacket</div>
                        <div className='text-2xl text-red-500 py-2'>${15.6}</div>
                        <div className='text-md border-b pb-8 border-gray-300  leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, explicabo. Illum repellat, sit iste, atque ea, hic dolorum blanditiis quidem quia totam perferendis accusantium natus unde quibusdam distinctio nulla facilis?</div>
                        <div className='flex justify-start items-center py-10'>
                            <div className='px-2'>
                                <h3 className='pb-2 font-semibold'>Color</h3>
                                <div>
                                    <button className='rounded-full mx-1 focus:border-2'><Circle size={16} fill='white' className='rounded-full ' /></button>
                                    <button className='rounded-full mx-1 focus:border-2'><Circle size={16} fill='black' className='rounded-full ' /></button>
                                    <button className='rounded-full mx-1 focus:border-2'><Circle size={16} fill='red' className='rounded-full ' /></button>
                                </div>
                            </div>
                            <div className='px-2'>
                                <h3 className='pb-2 font-semibold'>Size</h3>
                                <div>
                                    <button className='mx-1 p-2 bg-gray-300 text-xs focus:bg-purple-600 focus:text-white hover:bg-purple-600 hover:text-white cursor-pointer'>X</button>
                                    <button className='mx-1 p-2 bg-gray-300 text-xs focus:bg-purple-600 focus:text-white hover:bg-purple-600 hover:text-white cursor-pointer'>M</button>
                                    <button className='mx-1 p-2 bg-gray-300 text-xs focus:bg-purple-600 focus:text-white hover:bg-purple-600 hover:text-white cursor-pointer'>XL</button>
                                    <button className='mx-1 p-2 bg-gray-300 text-xs focus:bg-purple-600 focus:text-white hover:bg-purple-600 hover:text-white cursor-pointer'>XXL</button>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-baseline gap-4'>
                            <div className="flex items-center border border-gray-300 px-1 py-3 ">
                                <button onClick={decrease} className="text-xl px-2 cursor-pointer">-</button>
                                <span className="px-4 font-mono">{qty}</span>
                                <button onClick={increase} className="text-xl px-2 cursor-pointer">+</button>
                            </div>
                            <div>
                                <button className='bg-gray-800 text-white py-4 px-10 uppercase font-bold'>Add To Cart</button>
                            </div>
                            <div className='hover:text-purple-600 cursor-pointer mx-3'><Heart /></div>
                            <div className='hover:text-purple-600 cursor-pointer'><GitCompareArrows /></div>
                        </div>

                        <div className='my-8 leading-8'>
                            <p className=''>Categories : <span>{`fashion Men`}</span></p>
                            <p className=''>Tags : <span>{`fashion men jacket full sleeve`}</span></p>
                            <div className='flex items-center gap-8 mt-4'>
                                <button><Facebook size={20} className='hover:text-blue-800  cursor-pointer' /></button>
                                <button><Dribbble size={20} className='hover:text-pink-400  cursor-pointer' /></button>
                                <button><Instagram size={20} className='hover:text-pink-700  cursor-pointer' /></button>
                                <button><Twitter size={20} className='hover:text-sky-600  cursor-pointer' /></button>
                                <button><Linkedin size={20} className='hover:text-blue-900  cursor-pointer' /></button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* second section */}
                <div className=''>
                    <div className='border-b border-gray-300 flex justify-center items-center text-2xl font-semibold gap-8'>
                        <button onClick={() => setShow("1st")}  className={` ${show === "1st" ? "border-b text-black" : "border-none text-gray-500" } border-b-2 pb-2 cursor-pointer `}>Additional Information</button>
                        <button onClick={() => setShow("2nd")}  className={` ${show === "2nd" ? "border-b  text-black" : "border-none text-gray-500" } border-b-2 pb-2 cursor-pointer `}>Description</button>
                        <button onClick={() => setShow("3rd")}  className={` ${show === "3rd" ? "border-b  text-black" : "border-none text-gray-500" } border-b-2 pb-2 cursor-pointer `}>Reviews (2)</button>
                    </div>
                    {show === "1st" && (
                        <div className='py-5'>
                            <div className='flex gap-8'>
                                <div className='leading-10 font-semibold'>
                                    <p>Weight</p>
                                    <p>Dimensions</p>
                                    <p>Materials</p>
                                    <p>Other Info</p>
                                </div>
                                <div className='leading-10'>
                                    <p>400 g</p>
                                    <p>10 x 10 x 15 cm</p>
                                    <p>60% cotton, 40% polyester</p>
                                    <p> American heirloom jean shorts pug seitan letterpress</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {show === "2nd" && (
                        <div className='py-8 text-sm leading-6'>
                            <p className='text-justify'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</p>
                        </div>
                    )}
                    {show === "3rd" && (
                        <div>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, aperiam.
                        </div>
                    )}
                </div>

                {/* third dection */}
                <div className='py-10'>
                    <div className='flex justify-center items-center mb-5'>
                        <h2 className='flex items-center'> <hr className='md:w-20 w-8 border' /> <span className='md:px-5 px-1 md:text-3xl text-xl font-semibold'>Related Products</span>  <hr className='md:w-20 w-8 border' /></h2>
                    </div>

                    <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 justify-center items-center mx-auto'>
                        {data?.slice(4, 8).map((item) => (
                            <Card key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetails