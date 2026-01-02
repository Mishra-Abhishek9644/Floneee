"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f6f6f8] grid lg:grid-cols-5 md:grid-cols-3 md:px-16 lg:px-44 md:py-24 px-3 py-10 animate-pulse gap-6">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-32 bg-gray-300 rounded" />
            <div className="h-4 w-40 bg-gray-300 rounded" />
            <div className="h-4 w-36 bg-gray-300 rounded" />
            <div className="h-4 w-28 bg-gray-300 rounded" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <>
      <section className="bg-black lg:grid-cols-5 md:grid-cols-3 grid md:place-content-center lg:items-center lg:px-44 md:px-16 md:py-24 px-3 py-10">
        <div className="pb-5">
          <h2 className="text-4xl font-bold text-gray-100">Flone.</h2>
          <p className="text-gray-300">
            © 2025{" "}
            <span className="hover:text-purple-600 cursor-pointer font-medium">
              Flone
            </span>
            . <br />
            All Rights Reserved
          </p>
        </div>

        <div className="flex flex-col leading-8 pb-5">
          <h3 className="text-gray-200 text-md font-medium underline pb-1">ABOUT US</h3>
          <Link href="/about" className="text-gray-300 hover:text-purple-500 w-fit">
            About us
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-purple-500 w-fit">
            Store location
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-purple-500 w-fit">
            Contact
          </Link>
          <Link href="/shop" className="text-gray-300 hover:text-purple-500 w-fit">
            Orders Tracking
          </Link>
        </div>

        <div className="flex flex-col leading-8 pb-5">
          <h3 className="text-gray-200 text-md font-medium underline pb-1">USEFUL LINKS</h3>
          <Link href="/shop" className="text-gray-300 hover:text-purple-500 w-fit">
            Returns
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-purple-500 w-fit">
            Support Policy
          </Link>
          <Link href="/shop" className="text-gray-300 hover:text-purple-500 w-fit">
            Size guide
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-purple-500 w-fit">
            FAQs
          </Link>
        </div>

        <div className="flex flex-col leading-8 pb-5">
          <h3 className="text-gray-200 text-md font-medium underline pb-1">FOLLOW US</h3>
          <Link href="/" className="text-gray-300 hover:text-purple-500 w-fit">
            Facebook
          </Link>
          <Link href="/" className="text-gray-300 hover:text-purple-500 w-fit">
            Twitter
          </Link>
          <Link href="/" className="text-gray-300 hover:text-purple-500 w-fit">
            Instagram
          </Link>
          <Link href="/" className="text-gray-300 hover:text-purple-500 w-fit">
            Youtube
          </Link>
        </div>

        <div className="flex flex-col leading-8 pb-5">
          <h3 className="text-gray-200 text-md font-medium underline pb-1">SUBSCRIBE</h3>
          <p className="leading-6 text-gray-300 text-sm lg:w-64">
            Get E-mail updates about our latest shop and special offers.
          </p>
          <input
            type="text"
            placeholder="Enter your email address..."
            className="mt-4 text-sm p-2 focus:outline-hidden text-white"
          />
          <hr className="border border-gray-200 my-2" />
          <Link
            href="/login"
            className="text-gray-300 hover:text-purple-500 w-fit text-sm border-b border-gray-400 w-fit"
          >
            SUBSCRIBE
          </Link>
        </div>
      </section>
    </>
  );
};

export default Footer;
