"use client";
import { GitCompareArrows, Heart, Menu, Search, ShoppingBag, UserRoundPen, X } from "lucide-react"
import Link from 'next/link'
import React, { useState } from 'react'


const Navbar = () => {
  const [loginBtn, setLoginBtn] = useState(false)
  const [menuBtn, setMenuBtn] = useState(false)

  return (
    <>
      <div className='flex justify-around items-center m-1 p-1  text-gray-900  lg:m-2 lg:p-3 relative z-0'>
        <div className='text-4xl font-bold text-gray-900 '>
          Flone.
        </div>
        <div className='hidden md:flex md:flex-row md:gap-8 md:text-lg '>
          <Link href='/home'>Home</Link>
          <Link href='/shop'>Shop</Link>
          <Link href='/home'>Pages</Link>
          <Link href='/shop'>Collection</Link>
          <Link href='/blog'>Blogs</Link>
          <Link href='/contact'>Contact Us</Link>

        </div>
        <div className='flex gap-3 '>
          <div className="hidden md:flex gap-7 px-4">

            <button><Search /></button>
            <div className="relative">
              <button className="flex items-center gap-2 hover:scale-105" onClick={() => setLoginBtn(!loginBtn)}>
                <UserRoundPen />
              </button>

              {loginBtn && (
                <div className="absolute top-11 right-0 bg-white border rounded shadow p-3 mt-2  transition-all w-[130px]">


                  <button
                    className="block min-w-full text-left mt-1  hover:text-purple-600 hover:pl-2 transition-all duration-300 ease-out"
                  >
                    <Link href='/login'>
                      Login
                    </Link>
                  </button>

                  <button
                    className="block min-w-full text-left mt-1 hover:text-purple-600 hover:pl-2 transition-all duration-300 ease-out"
                  >
                    <Link href='/register'>
                      Register
                    </Link>
                  </button>

                </div>)}
            </div>
          </div>

          <Link href='/compare'><GitCompareArrows /></Link>
          <Link href='/wishlist'><Heart /></Link>
          <Link href='/cart'><ShoppingBag /></Link>
          <div className="md:hidden"><button onClick={() => (setMenuBtn(!menuBtn))}><Menu /></button></div>

        </div>
      </div>
      {menuBtn && (
        <div className="flex flex-col h-screen w-[300px] right-0 justify-start ml-auto bg-white fixed z-20 top-0 p-3">
          <div className=" flex gap-2  ">
            <button className="text-white bg-black rounded-xl px-1"><X /></button>
            <div className="bg-gray-200 items-center p-2 rounded-xl">
              <input type="text" placeholder="Search..."/>
            <button><Search /></button></div>        
            </div>
          <div className='flex flex-col mt-5 gap-3'>
            <Link href='/home'>Home</Link>
            <Link href='/shop'>Shop</Link>
            <Link href='/home'>Pages</Link>
            <Link href='/shop'>Collection</Link>
            <Link href='/blog'>Blogs</Link>
            <Link href='/contact'>Contact Us</Link>
          </div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  )
}

export default Navbar