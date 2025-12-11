import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousle from "@/components/Carousle";
import DailyDeals from "@/components/Dailydeals";
import Branding from "@/components/Branding";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <>
    <Navbar />
    <Carousle />
    <Branding />
    <DailyDeals />
    <Blog />
    <Footer />
    </>
  );
}
