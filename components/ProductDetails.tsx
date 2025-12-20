"use client";
import React, { useEffect, useRef, useState } from 'react'
import Card from './Card';
import { Product } from "../type/Product";
import { Circle, Dribbble, Facebook, GitCompareArrows, Heart, Instagram, Linkedin, MoveLeft, Star, Twitter } from 'lucide-react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { addToCompareList, removeFromCompareList } from '@/Store/Slices/compareSlice';
import { addToCartList, removeFromCartList } from '@/Store/Slices/cartSlice';

import toast from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from '@/Store/Slices/wishlistSlice';
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';



interface ProductDetailsProps {
    id: number

}
const colors = ["white", "black", "red"];
const sizes = ["X", "M", "XL", "XXL"];


const ProductDetails = ({ id }: ProductDetailsProps) => {

    const dispatch = useDispatch()

    const [data, setData] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [qty, setQty] = useState(1);
    const [show, setShow] = useState("1st");

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(product => setProduct(product));
    }, [id])

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => setData(data));
    }, [])

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    const wishlistItems = useSelector((state: any) => state.wishlist.items || []);
    const compareItems = useSelector((state: any) => state.compareList.items || []);

    const isInWishlist = wishlistItems.some((i: any) => i.id === product?.id);
    const isInCompare = compareItems.some((i: any) => i.id === product?.id);

    const debounceRef = useRef(false);
    const currentUser = useSelector((state: any) => state.login.currentUser)
    const isLoggedIn = Boolean(currentUser);
    const router = useRouter();

    if (!open || !product) return null;

    const increase = () => qty < 9 && setQty(qty + 1);
    const decrease = () => qty > 1 && setQty(qty - 1);

    /* ---------------- WISHLIST ---------------- */


    const handleWishlistToggle = () => {
        if (debounceRef.current) return;
        if (!isLoggedIn) {
            toast.error("Login To Continue")
            router.push("/login");
            return;
        }
        debounceRef.current = true;

        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
            toast.success("Removed from wishlist 💔");
        } else {
            dispatch(addToWishlist(product));
            toast.success("Added to wishlist ❤️");
        }

        setTimeout(() => (debounceRef.current = false), 300);
    };

    /* ---------------- COMPARE ---------------- */
    const handleCompareToggle = () => {
        if (debounceRef.current) return;
        if (!isLoggedIn) {
            toast.error("Login To Continue")
            router.push("/login");
            return;
        }
        debounceRef.current = true;

        if (isInCompare) {
            dispatch(removeFromCompareList(product.id));
            toast.success("Removed from Compare 💔");
        } else {
            dispatch(addToCompareList(product));
            toast.success("Added to Compare ❤️");
        }

        setTimeout(() => (debounceRef.current = false), 300);
    };

    /* ---------------- CART (WITH QTY + COLOR + SIZE) ---------------- */
    const handleAddToCart = () => {
        if (debounceRef.current) return;
        if (!isLoggedIn) {
            toast.error("Login To Continue")
            router.push("/login");
            return;
        }
        debounceRef.current = true;

        dispatch(addToCartList({
            product,
            quantity: qty,
        }));
        toast.success("Added to Cart ❤️");

        setTimeout(() => (debounceRef.current = false), 1000);
    };

    const pathname = usePathname();


    return (
        <>
            <section className='my-10 lg:mx-44 md:mx-28 sm:mx-10 '>

                {/* first seciton */}
                {pathname.startsWith("/shop/product/") && (
                    <>
                        <div className=" border w-fit py-1 px-3 hover:text-purple-600 ">
                            <Link href="/shop" className="flex items-center gap-2">
                                <MoveLeft size={18} />
                                Back
                            </Link>
                        </div>
                    </>
                )}

                <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 place-content-center py-16'>


                    <div>
                        <div>
                            <img src={product?.image} className='bg-[#f6f6f6] w-full p-28' alt="product-iamge" />
                        </div>
                        <div className='my-5 grid grid-cols-5 gap-2'>
                            <img src={product?.image} className='bg-[#f6f6f6] p-5' alt="product-iamge" />
                            <img src={product?.image} className='bg-[#f6f6f6] p-5' alt="product-iamge" />
                            <img src={product?.image} className='bg-[#f6f6f6] p-5' alt="product-iamge" />
                            <img src={product?.image} className='bg-[#f6f6f6] p-5' alt="product-iamge" />
                            <img src={product?.image} className='bg-[#f6f6f6] p-5' alt="product-iamge" />

                        </div>
                    </div>
                    <div className='lg:px-20 md:px-12 px-5'>
                        <div className='lg:text-2xl'>{product.title}</div>
                        <div className='text-2xl text-red-500 py-2'>${product.price}</div>
                        <div className='text-md border-b pb-8 border-gray-300  leading-7'>{product.description}</div>
                        <div className='flex justify-start gap-4 items-center py-10'>
                            {/* COLOR */}
                            <div>
                                <h3 className="font-semibold mb-2">Color</h3>
                                <div className="flex gap-2">
                                    {colors.map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setSelectedColor(c)}
                                            className={`cursor-pointer border  rounded-full p-1 ${selectedColor === c ? "border-purple-600" : "border-white"
                                                }`}
                                        >
                                            <Circle size={16} fill={c} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* SIZE */}
                            <div>
                                <h3 className="font-semibold mb-2">Size</h3>
                                <div className="flex gap-2">
                                    {sizes.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`px-3 py-2 cursor-pointer text-xs border ${selectedSize === s
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-200"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
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
                                <button className="bg-gray-800 text-white py-4 px-10 uppercase cursor-pointer font-bold hover:bg-purple-600 hover:border-purple-600 transition-all duration-700" onClick={handleAddToCart}>Add To Cart</button>
                            </div>
                            <div className='hover:text-purple-600 cursor-pointer mx-3' onClick={handleWishlistToggle}><Heart /></div>
                            <div className='hover:text-purple-600 cursor-pointer' onClick={handleCompareToggle}><GitCompareArrows /></div>
                        </div>

                        <div className='my-8 leading-8'>
                            <p className=''>Categories : <span>{product.category}</span></p>
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
                <div className='md:px-0 px-5'>
                    <div className='border-b border-gray-300 flex justify-center items-center lg:text-2xl text-sm font-semibold gap-8'>
                        <button onClick={() => setShow("1st")} className={` ${show === "1st" ? "border-b text-black" : "border-none text-gray-500"} border-b-2 pb-2 cursor-pointer `}>Additional Information</button>
                        <button onClick={() => setShow("2nd")} className={` ${show === "2nd" ? "border-b  text-black" : "border-none text-gray-500"} border-b-2 pb-2 cursor-pointer `}>Description</button>
                        <button onClick={() => setShow("3rd")} className={` ${show === "3rd" ? "border-b  text-black" : "border-none text-gray-500"} border-b-2 pb-2 cursor-pointer `}>Reviews (2)</button>
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
                        <div className='grid md:grid-cols-2 grid-cols-1 place-content-center gap-8 md:px-0 px-5 w-full'>
                            <div>
                                <div className='flex md:flex-row flex-col sm:justify-start items-center w-full '>
                                    <img src="https://flone.jamstacktemplates.dev/assets/img/testimonial/1.jpg" className='object-cover m-5 border border-gray-300' alt="img" />
                                    <div className='w-full'>
                                        <h2 className='font-semibold flex gap-4'>White Lewis
                                            <span className='flex'>
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                            </span>
                                        </h2>
                                        <p>Vestibulum ante ipsum primis aucibus orci luctustrices posuere cubilia Curae Suspendisse viverra ed viverra. Mauris ullarper euismod vehicula. Phasellus quam nisi, congue id nulla.</p>
                                    </div>
                                    <button></button>
                                </div>
                                <div className='flex md:flex-row flex-col sm:justify-start items-center w-full '>
                                    <img src="https://flone.jamstacktemplates.dev/assets/img/testimonial/2.jpg" className='object-cover m-5 border border-gray-300' alt="img" />
                                    <div className='w-full'>
                                        <h2 className='font-semibold flex gap-4'>White Lewis
                                            <span className='flex'>
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                            </span>
                                        </h2>
                                        <p>Vestibulum ante ipsum primis aucibus orci luctustrices posuere cubilia Curae Suspendisse viverra ed viverra. Mauris ullarper euismod vehicula. Phasellus quam nisi, congue id nulla.</p>
                                    </div>
                                    <button></button>
                                </div>
                            </div>

                            <div className=' w-full'>
                                <form action="" method="post">
                                    <div className='py-5'>
                                        <h3 className='font-semibold'>Add a Review</h3>
                                        <div className='flex md:gap-4 my-2'>
                                            <p>your rating :</p>
                                            <div className='flex'>
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='fill-yellow-400' />
                                                <Star size={18} stroke='' className='' />
                                            </div>
                                        </div>
                                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-5'>
                                            <input type="text" placeholder='Name' className='border border-gray-200 w-full px-5 py-2 outline-hidden ' />
                                            <input type="text" placeholder='Email' className='border border-gray-200 w-full px-5 py-2 outline-hidden ' />
                                        </div>
                                        <textarea name="" id="" className='border border-gray-200 w-full h-36 px-5 py-2 outline-hidden ' placeholder='Message'></textarea>
                                        <button className='px-10 py-3 bg-purple-500 hover:bg-black duration-700 font-semibold  outline-hidden text-white uppercase'>Submit</button>
                                    </div>
                                </form>

                            </div>
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
                            <Card key={item.id} product={item} onOpen={() => { }} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetails