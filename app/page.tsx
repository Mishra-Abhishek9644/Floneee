import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousle from "@/components/Carousle";

export default function Home() {
  return (
    <>
    <Navbar />
    <Carousle />
    <div className="min-h-screen bg-gray-500">yo</div>
    <Footer />
    </>
  );
}
