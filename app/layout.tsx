import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReduxProvider from "./providers";
import AuthHydrator from "./AuthHydrator";
import CartHydrator from "@/components/CartHydrator";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FASHION-ERA",
  description: "Upgrade your everyday fashion with Us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} font-sans antialiased`}
      >
        <ReduxProvider>
          <AuthHydrator>
          <CartHydrator />

            <Navbar />
            {children}
            <Footer />
          </AuthHydrator>
        </ReduxProvider>
      </body>
    </html>
  );
}
