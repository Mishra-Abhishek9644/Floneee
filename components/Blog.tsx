"use client";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    let timer: any;

    fetch("/api/products")
      .then((res) => res.json())
      .then((response) => {
        const products = response.products || [];
        setData(products);

        // minimum skeleton time (UX)
        timer = setTimeout(() => setLoading(false), 700);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });

    return () => clearTimeout(timer);
  }, []);

  /*  SKELETON  */
  if (loading) {
    return (
      <div className="mt-16 mb-32 animate-pulse">
        <div className="flex justify-center items-center mb-14">
          <div className="h-8 w-56 bg-gray-300 rounded" />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 place-content-center md:px-32">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="relative flex justify-center my-10">
              <div className="w-[300px] h-[200px] bg-gray-300 rounded" />
              <div className="absolute -bottom-14 bg-white px-10 py-5 w-[260px] shadow">
                <div className="h-4 bg-gray-300 rounded mb-2" />
                <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /*  UI  */
  return (
    <div className="py-5 px-5">
      <div className="flex justify-center items-center py-5">
        <h2 className="flex items-center">
          <hr className="md:w-20 w-10 border" />
          <span className="px-5 text-3xl font-semibold">OUR BLOG</span>
          <hr className="md:w-20 w-10 border" />
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 place-content-center md:px-28 mb-16">
        {data.slice(7, 10).map((i, index) => (
          <div key={i?._id || index} className="relative h-64 flex justify-center my-10">
            <div className="overflow-hidden w-fit">
              <img
                src={i?.image}
                className="scale-100 transition-all duration-1000 object-cover hover:scale-125"
                alt={i?.title || "blog image"}
              />
            </div>

            <div className="text-center bg-white absolute -bottom-14 px-14 left-1/2 -translate-x-2/4 py-5 w-[300px]">
              <h2 className="text-xl font-medium line-clamp-1">
                {i?.title || "A guide to latest trends"}
              </h2>
              <p className="italic text-gray-500 text-sm">By Admin</p>
            </div>
          </div>
        ))}
      </div>


      <div className="my-12 lg:px-44 md:px-28">
        <div className="border md:rounded-full rounded-md py-6 px-6 md:px-12 hover:shadow-md transition-shadow duration-300 bg-gray-800 text-white">
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-6">

            <div className="text-center md:text-left max-w-2xl">
              <h2 className="font-bold text-lg md:text-xl mb-1 tracking-tight">
                Discover the Latest Fashion Trends
              </h2>

              <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                Explore style guides, outfit inspiration, seasonal collections,
                and expert tips to upgrade your everyday fashion.
              </p>
            </div>

            <div>
              <button
                onClick={() => router.push("/blog")}
                className="cursor-pointer group flex items-center gap-2 font-medium text-sm md:text-base px-6 py-2 rounded-full border transition-all duration-500">
                <span className="group-hover:mr-1 transition-all duration-700">
                  Visit Blog
                </span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

          </div>
        </div>
      </div>




    </div>
  );
};

export default Blog;
