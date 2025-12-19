"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousle from "@/components/Carousle";
import DailyDeals from "@/components/Dailydeals";
import Branding from "@/components/Branding";
import Blog from "@/components/Blog";
import { useEffect } from "react";

export default function Home() {
  if (typeof window == 'undefined') null;

  return (
    <>
      <Carousle />
      <Branding />
      <DailyDeals />
      <Blog />
    </>
  );
}
