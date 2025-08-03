import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Toaster } from "./components/ui/Sonner";
import "./globals.css";
import Providers from "./providers";

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
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          suppressHydrationWarning
          className={`${dmSans.className} antialiased text-slate-700`}
        >
          <Providers>
            <Header />
            <main className="container mx-auto px-5">{children}</main>
            <Toaster />
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
