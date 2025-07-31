import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "NutriGenius AI",
  description:
    "Discover recipes customized to your dietary needs with NutriGenius AI — your smart companion for finding the perfect meal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.className} text-slate-700`}>
        <Header />
        <main className="container mx-auto px-5 sm:px-6 lg:px-8 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
