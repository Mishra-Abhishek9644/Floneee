import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousle from "@/components/Carousle";
import DailyDeals from "@/components/Dailydeals";

export default function Home() {
  return (
    <>
    <Navbar />
    <Carousle />
    <DailyDeals />
    <Footer />
    </>
  );
}
