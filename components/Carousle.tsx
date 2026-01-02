"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import model1 from "../assets/Leather biker jacket.png";
import model2 from "../assets/Dress.png";

const Carousle = () => {
  const slides = [
    {
      title: "Winter Products",
      subtitle: "Winter Offer 2025 Collection",
      img: model1,
    },
    {
      title: "Smart Products",
      subtitle: "Summer Offer 2025 Collection",
      img: model2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const leftBtn = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const rightBtn = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="relative w-full bg-white overflow-hidden lg:h-[90vh] md:h-[70vh] h-[80vh] mt-16 pt-20 animate-pulse">
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-[50%] w-full lg:pl-48 md:pl-20 px-5 lg:py-40 md:py-20 py-10">
            <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
            <div className="h-12 w-3/4 bg-gray-300 rounded mb-6" />
            <div className="h-12 w-40 bg-gray-300 rounded" />
          </div>

          <div className="md:w-[50%] w-full flex justify-center lg:p-10 md:p-6 px-8">
            <div className="w-full max-w-md h-72 bg-gray-300 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="controls-carousel"
      className="relative w-full bg-white overflow-hidden lg:h-[80vh] md:h-[60vh] h-[80vh] mt-18 md:pt-0 pt-20"
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full shrink-0 flex flex-col md:flex-row items-center justify-center lg:px-5 md:px-10 px-0 lg:pt-10 md:pt-0 pt-5"
          >
            <div className="md:w-[50%] w-full text-center md:text-start lg:pl-48 md:pl-20 px-5 lg:py-40 md:py-20 py-10">
              <p className="lg:text-3xl md:text-2xl text-lg py-3">
                {slide.title}
              </p>

              <h2 className="lg:text-6xl md:text-4xl text-3xl pt-3 pb-6 md:mb-5">
                {slide.subtitle}
              </h2>

              <Link
                href="/shop"
                className="border md:py-4 md:px-12 py-2 px-5 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-700"
              >
                SHOP NOW
              </Link>
            </div>

            <div className="md:w-[50%] w-full flex justify-center lg:p-36 md:p-20">
              {typeof slide.img === "string" ? (
                <img
                  src={slide.img}
                  alt="Slide"
                  className="w-full max-h-full object-contain"
                />
              ) : (
                <Image
                  src={slide.img}
                  alt="Slide"
                  className="w-full max-h-full object-contain"
                  priority
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={leftBtn}
        className="absolute top-70 left-0 flex items-center justify-center h-fit px-8 md:px-14 cursor-pointer"
      >
        <ChevronLeft className="md:size-12 size-6 text-gray-600 hover:text-purple-500" />
      </button>

      <button
        onClick={rightBtn}
        className="absolute top-70 right-0 flex items-center justify-center h-fit px-8 md:px-14 cursor-pointer"
      >
        <ChevronRight className="md:size-12 size-6 text-gray-600 hover:text-purple-500" />
      </button>
    </div>
  );
};

export default Carousle;
