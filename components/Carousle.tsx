"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Data {
  id: number;
  image: string;
}

const Carousle = () => {
  const [data, setData] = useState<Data[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((result) => setData(result.slice(0, 5)));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? 4 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % 5);
  };

  return (
    <div className="relative w-full h-[90vh] bg-[#f0e0ff] overflow-hidden">
      {/* Slider Wrapper */}
      <div className="flex flex-row h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        <div className="w-[50%]">
          <p>Smart Products</p>
          <h2>Winter Offer 2024 Collection</h2>
          <button className="p-2 border">SHOP NOW</button>
        </div>  
        {data.map((item) => (
          <div key={item.id} className="w-[50%] flex-shrink-0 h-full">
            <img
              src={item.image}
              className="w-full h-full object-contain"
              alt="product"
            />
          </div>
        ))}
      </div>


      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
      >
        <ArrowLeft />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
      >
        <ArrowRight />
      </button>

    </div>
  );
};

export default Carousle;
