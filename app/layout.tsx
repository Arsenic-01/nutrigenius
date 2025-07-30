import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriGenius AI: Interactive Blueprint",
  description:
    "An interactive blueprint exploring the architecture, data flows, and AI models of the NutriGenius AI personalized dietary system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-700`}>
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
