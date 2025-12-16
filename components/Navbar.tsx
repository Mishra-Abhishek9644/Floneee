"use client";
import { GitCompareArrows, Heart, Menu, Search, ShoppingBag, UserRoundPen, X } from "lucide-react"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";






const Navbar = () => {
  const [loginBtn, setLoginBtn] = useState(false)
  const [menuBtn, setMenuBtn] = useState(false)
  const [search, setSearch] = useState(false)

  const wishlistCount = useSelector(
    (state: any) => state.wishlist?.items.length
  );

  const compareCount = useSelector(
    (state: any) => state.compareList?.items.length
  );

  // if you have cart slice
  const cartCount = useSelector(
    (state: any) => state.cartList.items?.length || 0
  );

  useEffect(() => {
    if (menuBtn) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // enable scroll back
    }

    // cleanup (optional but best practice)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuBtn]);
  return (
    <>

      <div className='flex justify-around items-center  p-3  text-gray-900 shadow-md  md:fixed bg-white top-0 left-0 right-0 z-10 ' >
        <Link href='/'> <div className='md:text-4xl text-2xl font-bold text-gray-900 hover:text-purple-500 hover:scale-105 '>
          Flone.
        </div>
        </Link>
        <div className='hidden lg:flex lg:flex-row lg:gap-8 lg:text-lg '>
          <Link className="hover:text-purple-500 hover:scale-105" href='/'>Home</Link>
          <Link className="hover:text-purple-500 hover:scale-105" href='/shop'>Shop</Link>
          <Link className="hover:text-purple-500 hover:scale-105" href='/shop'>Collection</Link>
          <Link className="hover:text-purple-500 hover:scale-105" href='/blog'>Blogs</Link>
          <Link className="hover:text-purple-500 hover:scale-105" href='/contact'>Contact Us</Link>
          <Link className="hover:text-purple-500 hover:scale-105" href='/'>Pages</Link>

        </div>
        <div className='flex gap-3 '>
          <div className="hidden md:flex gap-7 px-4">

            <div className="relative">
              <button className="flex items-center hover:text-purple-500 gap-2 hover:scale-105" onClick={() => setSearch(!search)}><Search /></button>
              {search && (
                <div className="absolute top-10 right-0 bg-white  rounded shadow p-3 mt-2  transition-all  overflow-hidden flex items-center  ">
                  <div className="flex items-center border">
                    <input type="text" placeholder="Seach..." className=" outline-hidden p-2" />
                    <button onClick={() => setSearch(!search)} className="flex items-center  gap-2 hover:scale-105 p-2 bg-purple-600 text-white"><Search /></button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center hover:text-purple-500 gap-2 hover:scale-105"
                onClick={() => setLoginBtn(!loginBtn)}
              >
                <UserRoundPen />
              </button>

              {loginBtn && (
                <div className="absolute top-11 right-0 bg-white border rounded shadow p-3 mt-2 transition-all w-[130px]">

                  <button
                    onClick={() => setLoginBtn(false)}
                    className="block min-w-full text-left mt-1 hover:text-purple-600 hover:pl-2 transition-all duration-300 ease-out"
                  >
                    <Link href="/login">
                      Login
                    </Link>
                  </button>

                  <button
                    onClick={() => setLoginBtn(false)}
                    className="block min-w-full text-left mt-1 hover:text-purple-600 hover:pl-2 transition-all duration-300 ease-out"
                  >
                    <Link href="/register">
                      Register
                    </Link>
                  </button>

                </div>
              )}
            </div>

          </div>

          <Link href="/compare" className="relative hover:text-purple-500 hover:scale-105">
            <GitCompareArrows />

            {compareCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {compareCount}
              </span>
            )}
          </Link>
          <Link href="/wishlist" className="relative hover:text-purple-500 hover:scale-105">
            <Heart />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative hover:text-purple-500 hover:scale-105">
            <ShoppingBag />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="lg:hidden hover:text-purple-500 hover:scale-105"><button onClick={() => (setMenuBtn(!menuBtn))}><Menu /></button></div>

        </div>
      </div>
      {/* BACKDROP – ONLY SHOWS WHEN MENU IS OPEN */}
      {menuBtn && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setMenuBtn(false)}
        ></div>
      )}
      {menuBtn && (
        <div className="flex flex-col  w-[80vw] md:w-80 right-0 justify-start  bg-white fixed z-40 top-0 p-3 flex-nowrap" onClick={(e) => e.stopPropagation()}>
          <div className=" flex gap-2  ">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuBtn(!menuBtn);
              }}
              className="text-black rounded-xl px-1 hover:scale-110 hover:text-purple-500"><X /></button>
            <div className="bg-gray-200 items-center p-2 rounded-xl flex ">
              <input type="text" className="grow min-w-0 outline-none bg-transparent" placeholder="Search..." />
              <button className="hover:text-purple-500 hover:scale-105 p-1"><Search size={18} /></button></div>
          </div>
          <div className='flex flex-col mt-5 gap-3'>
            <Link className="hover:text-purple-500 hover:scale-105" href='/'>Home</Link>
            <Link className="hover:text-purple-500 hover:scale-105" href='/shop'>Shop</Link>
            <Link className="hover:text-purple-500 hover:scale-105" href='/home'>Pages</Link>
            <Link className="hover:text-purple-500 hover:scale-105" href='/shop'>Collection</Link>
            <Link className="hover:text-purple-500 hover:scale-105" href='/blog'>Blogs</Link>
            <Link className="hover:text-purple-500 hover:scale-105" href='/contact'>Contact Us</Link>
            <Link className="hover:text-purple-500 hover:scale-105" href='/login'>Login</Link>
            <Link className="hover:text-purple-500 hover:scale-105" href='/register'>Register</Link>
          </div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  )
}

export default Navbar