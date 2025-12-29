"use client";

import Branding from "@/components/Branding";
import Breadcrumb from "@/components/Breadcrumb";
import {
  BriefcaseBusiness,
  CircleStar,
  CupSoda,
  Smile,
} from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import img1 from "../../assets/developer.png";

type StatProps = {
  icon: ReactNode;
  count: string;
  text: string;
};

const page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  /* ================= SKELETON ================= */
  if (loading) {
    return (
      <>
        <Breadcrumb />

        <div className="py-10 md:py-20 animate-pulse">
          <div className="md:px-36 px-5 flex justify-center">
            <div className="text-center space-y-4">
              <div className="h-4 w-24 bg-gray-300 mx-auto rounded" />
              <div className="h-8 w-64 bg-gray-300 mx-auto rounded" />
              <div className="h-4 w-96 bg-gray-300 mx-auto rounded" />
            </div>
          </div>

          <div className="py-20 md:px-36 px-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="h-56 bg-gray-300 rounded" />
                <div className="h-6 w-40 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
              </div>
            ))}
          </div>

          <div className="bg-[#f7f7f7] py-16 flex justify-center gap-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="bg-white px-6 py-4 rounded-xl shadow-sm flex gap-4"
              >
                <div className="h-10 w-10 bg-gray-300 rounded-full" />
                <div>
                  <div className="h-5 w-16 bg-gray-300 rounded mb-2" />
                  <div className="h-3 w-24 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-20 md:px-36 px-5 text-center space-y-4">
            <div className="h-8 w-56 bg-gray-300 mx-auto rounded" />
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              {[1, 2].map((_, i) => (
                <div key={i} className="bg-gray-200 p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4" />
                  <div className="h-4 w-40 bg-gray-300 rounded mx-auto mb-2" />
                  <div className="h-3 w-24 bg-gray-300 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ================= REAL PAGE ================= */
  return (
    <>
      <Breadcrumb />

      <div className="py-10 md:py-20">
        <div className="md:px-36 px-5 flex justify-center items-center">
          <div className="text-center">
            <p>Who Are We</p>
            <h3 className="text-3xl font-medium">Welcome To Flone</h3>
            <div className="flex justify-center">
              <hr className="w-20 border-2 mt-5" />
            </div>
            <p className="md:w-200 w-full md:text-center text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt labor et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="py-20 md:px-36 px-5">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                title: "Our Vision",
                img: "https://flone.jamstacktemplates.dev/assets/img/banner/banner-1.jpg",
              },
              {
                title: "Our Mission",
                img: "https://flone.jamstacktemplates.dev/assets/img/banner/banner-2.jpg",
              },
              {
                title: "Our Goal",
                img: "https://flone.jamstacktemplates.dev/assets/img/banner/banner-3.jpg",
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    className="w-full hover:scale-125 duration-500"
                  />
                </div>
                <div className="py-20">
                  <h3 className="text-2xl font-medium my-5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-justify">
                    Flone provide how all this mistaken idea of denouncing
                    pleasure and praising pain was born.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f7f7f7] py-20 overflow-hidden">
          <div className="marquee flex gap-20">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-20">
                <Stat icon={<BriefcaseBusiness size={46} />} count="15" text="Projects Done" />
                <Stat icon={<CupSoda size={46} />} count="350" text="Cups of Chai" />
                <Stat icon={<CircleStar size={46} />} count="2" text="Branding" />
                <Stat icon={<Smile size={46} />} count="1" text="Happy Client" />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-20 md:px-36 px-5 text-center">
          <h3 className="text-3xl font-bold">Team Members</h3>
          <hr className="w-20 border my-4 mx-auto" />
          <div className="grid md:grid-cols-2 gap-8 mt-20">
            {["Mishra Abhishek", "Yadav Avanish"].map((name, i) => (
              <div key={i} className="bg-[#f7f7f7]">
                <img src={img1.src} />
                <div className="py-5">
                  <h1 className="text-xl font-bold">{name}</h1>
                  <p className="italic">Web Developer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

const Stat = ({ icon, count, text }: StatProps) => (
  <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition">
    <div>{icon}</div>
    <div>
      <h3 className="text-2xl font-semibold">{count}+</h3>
      <p className="text-sm text-gray-500 uppercase">{text}</p>
    </div>
  </div>
);
