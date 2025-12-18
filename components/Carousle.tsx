"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Carousle = () => {
  const slides = [
    {
      title: "Smart Products",
      subtitle: "Winter Offer 2025 Collection",
      img: "https://flone.jamstacktemplates.dev/assets/img/slider/single-slide-hm1-2.png",
    },
    {
      title: "Winter Products",
      subtitle: "Summer Offer 2025 Collection",
      img: "https://flone.jamstacktemplates.dev/assets/img/slider/single-slide-1.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const leftBtn = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const rightBtn = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="controls-carousel" className="relative w-full bg-[#f0e0ff] overflow-hidden lg:h-[90vh] md:h-[70vh] h-[80vh] md:mt-16 pt-20">
      <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }} >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex flex-col md:flex-row items-center justify-center shrink-0">
            <div className=" md:w-[50%] w-full text-center md:text-start lg:pl-48 md:pl-20 px-5 lg:py-40 md:py-20 py-10" >
              <p className="lg:text-3xl md:text-2xl text-lg py-3">
                {slide.title}
              </p>

              <h2 className="lg:text-6xl md:text-4xl text-3xl pt-3 pb-6 md:px-0 md:mb-5" >
                {slide.subtitle}
              </h2>

              <Link href={`/shop`}
                className="border md:py-4 md:px-12 py-2 px-5 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-700" >
                SHOP NOW
              </Link>
            </div>

            <div className=" md:w-[50%] w-full flex justify-center lg:p-10 md:p-6 px-8" >
              <img src={slide.img} className="w-full max-h-[450px] md:max-h-full object-contain" alt="Slide" />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={leftBtn}
        className="absolute top-0 left-0 flex items-center justify-center h-full px-8 md:px-14 cursor-pointer" >
        <ChevronLeft className="md:size-12 size-6 text-gray-600 hover:text-purple-500" />
      </button>

      <button
        onClick={rightBtn}
        className="absolute top-0 right-0 flex items-center justify-center h-full px-8 md:px-14 cursor-pointer" >
        <ChevronRight className="md:size-12 size-6 text-gray-600 hover:text-purple-500" />
      </button>

    </div>
  );
};

export default Carousle;
