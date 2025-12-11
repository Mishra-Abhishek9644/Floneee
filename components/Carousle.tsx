"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Carousle = () => {
  const slides = [
    {
      title: "Smart Products",
      subtitle: "Summer Offer 2025 Collection",
      img: "https://flone.jamstacktemplates.dev/assets/img/slider/single-slide-1.png",
    },
    {
      title: "Winter Products",
      subtitle: "Winter Offer 2025 Collection",
      img: "https://flone.jamstacktemplates.dev/assets/img/slider/single-slide-hm1-2.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div id="controls-carousel" className="relative w-full md:mt-20 bg-[#f0e0ff] md:h-[90vh] h-[80vh]  overflow-hidden">
      {/* Slides Wrapper */}
      <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)`,}}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full md:flex h-full shrink-0" >
            <div className="lg:w-[50%] md:text-start text-center w-full lg:pl-52 pl-5 lg:py-60 py-10">
              <p className="md:text-2xl text-lg py-3">{slide.title}</p>
              <h2 className="md:text-7xl text-3xl pt-3 pb-8 md:px-0 px-10">{slide.subtitle}</h2>
              <button className="p-2 border md:py-4 md:px-12 px-2 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-1000">
                SHOP NOW
              </button>
            </div>

            <div className="md:w-[50%] w-full md:p-10 px-20">
              <img src={slide.img} className="transition-all w-full h-auto object-contain " alt="Slide" />
            </div>
          </div>
        ))}
      </div>

      <button onClick={leftBtn} className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-14 cursor-pointer">
        <ChevronLeft className="md:size-12 size-6 text-gray-500" />
      </button>

      <button onClick={rightBtn} className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-14 cursor-pointer">
        <ChevronRight className="md:size-12 size-6 text-gray-500" />
      </button>

    </div>
  );
};

export default Carousle;
