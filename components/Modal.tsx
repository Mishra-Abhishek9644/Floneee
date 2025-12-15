"use client";

import { Circle, Eye, GitCompareArrows, Heart, X } from "lucide-react";
import { useState } from "react";
import { Product } from "@/type/Product";


interface ModalProps {
    open: boolean;
    onClose: (value: boolean) => void;
    product: Product | null;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, product }) => {
    const [qty, setQty] = useState(1);

    const increase = () => setQty(qty + 1);
    const decrease = () => { if (qty > 1) setQty(qty - 1); }
if (!open || !product) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white max-h-[95vh] overflow-y-auto w-[95vw] lg:w-[63vw] mt-10 rounded-2xl p-2">
                <div className='flex justify-end m-1 my-2'>
                    <button onClick={() => onClose(false)}><X /></button>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 m-1 p-2 justify-center lg:gap-6'>
                    <div className="gap-2">
                        <div className="aspect-square  rounded-xl bg-red-50 flex items-center justify-center  "><img src={product?.image} className="object-contain h-[60%] " alt="" /></div>
                        <div className="grid-cols-4 flex justify-around w-full mt-3">
                            <div className="flex lg:gap-3 mt-1">
                                {[1, 2, 3, 4].map((n, i) => (
                                    <div
                                        key={i}
                                        className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center  hover:border cursor-pointer transition"
                                    >
                                        <img src={product?.image} className="object-contain h-[70%] w-" />
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-2xl ">{product.title}</div>
                        <div className="text-red-600 text-2xl ">${product.price}</div>
                        <div className="text-gray-500 my-4">{product.description}</div>

                        <div className='flex flex-col md:flex-row justify-start md:items-center py-2 gap-1 md:py-10'>
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

                        <div className='flex gap-2 items-center md:gap-4'>
                            <div className="flex items-center border border-gray-300 px-1 py-3 ">
                                <button onClick={decrease} className="text-xl md:px-2 cursor-pointer">-</button>
                                <span className="px-4 font-mono">{qty}</span>
                                <button onClick={increase} className="text-xl md:px-2 cursor-pointer">+</button>
                            </div>
                            <div>
                                <button className='bg-gray-800  text-white px-2 py-1 sm:py-3.5 lg:text-md  uppercase font-bold hover:bg-purple-600 hover:text-white hover:scale-105 cursor-pointer mx-3'>Add To Cart</button>
                            </div>
                            <div className='hover:text-purple-600 cursor-pointer mx-3'><Heart /></div>
                            <div className='hover:text-purple-600 cursor-pointer'><GitCompareArrows /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal