"use client";
import {
  GitCompareArrows,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRoundPen,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Store/Slices/loginSlice";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "@/Store";
import { fetchWishlist, clearWishlist } from "@/Store/Slices/wishlistSlice";
import { clearCompareList, fetchCompare } from "@/Store/Slices/compareSlice";
import logo from '../assets/F-logo.png';
import { clearCartList, fetchCart } from "@/Store/Slices/cartSlice";

const Navbar = () => {
  const [loginBtn, setLoginBtn] = useState(false);
  const [menuBtn, setMenuBtn] = useState(false);
  const [seearch, setSeearch] = useState(false);
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);
  const isActive = (path: string) => pathname === path;

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.login.currentUser);

  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  const compareCount = useSelector(
    (state: RootState) => state.compareList.items.length
  );

  const cartCount = useSelector(
    (state: RootState) =>
      state.cartList.items.reduce(
        (total, item) => total + item.quantity,
        0
      )
  );

  const { currentUser, hydrated } = useSelector(
    (state: RootState) => state.login
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (currentUser) {
      dispatch(fetchWishlist());
    }
  }, [hydrated, currentUser]);
  
  useEffect(() => {
    if (!hydrated) return;
    if (currentUser) {
      dispatch(fetchCompare());
    }
  }, [hydrated, currentUser]);

  useEffect(() => {
    if (!hydrated) return;
    if (currentUser) {
      dispatch(fetchCart());
    }
  }, [hydrated, currentUser]);


  useEffect(() => {
    setMenuBtn(false);
    document.body.style.overflow = "auto";
  }, [pathname]);

  useEffect(() => {
    if (menuBtn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuBtn]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setLoginBtn(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSeearch(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(search)}`);
    setSearch("");
    setSeearch(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());

      dispatch(clearWishlist());
      dispatch(clearCompareList());
      dispatch(clearCartList());
      
      toast.success("Logged out");
      router.replace("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  if (!isClient) return null;
  return (
    <>

      <div className='flex justify-between items-center md:px-20 px-5 py-5 text-gray-900 shadow-md fixed bg-black top-0 left-0 right-0 z-20 ' >
        <Link href='/'>
          <img src={logo.src} className="h-10" alt="" />
        </Link>

        <div className='hidden lg:flex lg:flex-row lg:gap-8 lg:text-[15px]'>

          <Link
            href="/"
            className={isActive("/") ? "text-purple-400" : "text-gray-300"}
          >
            Home
          </Link>

          <Link
            href="/shop"
            className={pathname.startsWith("/shop") ? "text-purple-400" : "text-gray-300"}
          >
            Shop
          </Link>

          <Link
            href="/blog"
            className={pathname.startsWith("/blog") ? "text-purple-400" : "text-gray-300"}
          >
            Blogs
          </Link>

          <Link
            href="/about"
            className={isActive("/about") ? "text-purple-400" : "text-gray-300"}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className={isActive("/contact") ? "text-purple-400" : "text-gray-300"}
          >
            Contact Us
          </Link>

        </div>


        <div className='flex gap-3 '>
          <div className="hidden md:flex gap-7 px-4">

            <div ref={searchRef} className="relative">
              <button className="flex items-center hover:text-purple-400 gap-2 hover:scale-105" onClick={(e) => {
                e.stopPropagation();
                setSeearch(true);
              }}><Search className="text-gray-300" /></button>
              {seearch && (
                <div className="absolute top-10 right-0 bg-white  rounded shadow p-3 mt-2  transition-all  overflow-hidden flex items-center  ">
                  <div className="flex items-center border">
                    <input type="text"
                      placeholder="Search products..."
                      onClick={(e) => e.stopPropagation()}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      className=" outline-hidden p-2" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearch();
                      }}
                      className="flex items-center  gap-2 hover:scale-105 p-2 bg-purple-600 text-white"><Search /></button>
                  </div>
                </div>
              )}
            </div>

            <div ref={userMenuRef} className="relative">
              <button
                className="flex items-center hover:text-purple-400 gap-2 hover:scale-105"
                onClick={() => setLoginBtn(prev => !prev)}
              >
                <UserRoundPen className={isActive("/login") || isActive("/register") || isActive("/account/user") ? "text-purple-400" : "text-gray-300"} />
              </button>

              {loginBtn && (
                <div className="absolute top-11 right-0 bg-white border rounded shadow p-3 mt-2 w-32.5">
                  {!user ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setLoginBtn(false)}
                        className="block mt-1 hover:text-purple-600"
                      >
                        Login
                      </Link>

                      <Link
                        href="/register"
                        onClick={() => setLoginBtn(false)}
                        className="block mt-1 hover:text-purple-600"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href={user.role === "admin" ? "/account/admin" : "/account/user"}
                        onClick={() => setLoginBtn(false)}
                        className="block mt-1 hover:text-purple-600"
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="hover:text-red-600 cursor-pointer duration-500"
                      >
                        Logout
                      </button>
                    </>
                  )}

                </div>
              )}
            </div>

          </div>
          {user?.role !== "admin" && (
            <>
              <Link href="/compare" className="relative hover:text-purple-400 hover:scale-105">
                <GitCompareArrows className={isActive("/compare") ? "text-purple-400" : "text-gray-300"} />

                {compareCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {compareCount}
                  </span>
                )}
              </Link>
              <Link href="/wishlist" className="relative hover:text-purple-400 hover:scale-105">
                <Heart className={isActive("/wishlist") ? "text-purple-400" : "text-gray-300"} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative hover:text-purple-400 hover:scale-105">
                <ShoppingBag className={isActive("/cart") ? "text-purple-400" : "text-gray-300"} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          <div className="lg:hidden hover:text-purple-400 hover:scale-105"><button onClick={() => (setMenuBtn(!menuBtn))}><Menu /></button></div>

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
              className="text-black rounded-xl px-1 hover:scale-110 hover:text-purple-400"><X /></button>
            <div className="bg-gray-200 items-center p-2 rounded-xl flex ">
              <input type="text" className="grow min-w-0 outline-none bg-transparent" placeholder="Search..." />
              <button className="hover:text-purple-400 hover:scale-105 p-1"><Search size={18} /></button></div>
          </div>
          <div className='flex flex-col mt-5 gap-3'>
            <Link className="hover:text-purple-400 hover:scale-105" href='/'>Home</Link>
            <Link className="hover:text-purple-400 hover:scale-105" href='/shop'>Shop</Link>
            <Link className="hover:text-purple-400 hover:scale-105" href='/home'>Pages</Link>
            <Link className="hover:text-purple-400 hover:scale-105" href='/shop'>Collection</Link>
            <Link className="hover:text-purple-400 hover:scale-105" href='/blog'>Blogs</Link>
            <Link className="hover:text-purple-400 hover:scale-105" href='/contact'>Contact Us</Link>
            <Link className="hover:text-purple-400 hover:scale-105" href='/login'>Login</Link>
            <Link className="hover:text-purple-400 hover:scale-105" href='/register'>Register</Link>
          </div>

        </div>
      )}
    </>
  )
}

export default Navbar