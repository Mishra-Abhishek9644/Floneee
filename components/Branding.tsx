"use client";
import {
  BadgeDollarSign,
  BadgePercent,
  Clock7,
  TruckElectric,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const Branding = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 place-content-center md:py-16 lg:px-24 md:px-16 px-10 mt-10 animate-pulse">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div>
              <div className="h-4 w-28 bg-gray-300 rounded mb-2" />
              <div className="h-3 w-36 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-black text-gray-300 grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-4 place-content-center py-16 lg:px-24 md:px-16 px-10">
      <div className="flex justify-center items-center">
        <TruckElectric className="size-13 transition-all hover:animate-bounce duration-500" />
        <div className="px-3">
          <h1 className="lg:font-normal md:font-medium sm:font-semibold">
            Free Shipping
          </h1>
          <p className="font-thin text-xs">Free shipping on all order</p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Clock7 className="size-13 transition-all hover:animate-bounce duration-500" />
        <div className="px-3">
          <h1 className="lg:font-normal md:font-medium sm:font-semibold">
            Support 24/7
          </h1>
          <p className="font-thin text-xs">Free shipping on all order</p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <BadgeDollarSign className="size-13 transition-all hover:animate-bounce duration-500" />
        <div className="px-3">
          <h1 className="lg:font-normal md:font-medium sm:font-semibold">
            Money Return
          </h1>
          <p className="font-thin text-xs">Free shipping on all order</p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <BadgePercent className="size-13 transition-all hover:animate-bounce duration-500" />
        <div className="px-3">
          <h1 className="lg:font-normal md:font-medium sm:font-semibold">
            Order Discount
          </h1>
          <p className="font-thin text-xs">Free shipping on all order</p>
        </div>
      </div>
    </div>
  );
};

export default Branding;
