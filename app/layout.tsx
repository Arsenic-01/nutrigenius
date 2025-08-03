import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Toaster } from "./components/ui/Sonner";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "NutriGenius AI - Smart Personalized Meal Recommendations",
  description:
    "Discover healthy, personalized Indian recipes tailored to your dietary needs. NutriGenius AI helps you find meals that match your health goals, allergies, and taste.",
  keywords: [
    "NutriGenius",
    "AI meal planner",
    "personalized recipes",
    "Indian recipes",
    "healthy eating",
    "diet recommendation",
    "meal suggestion AI",
  ],
  robots: "index, follow",
  openGraph: {
    title: "NutriGenius AI - Personalized Indian Meal Recommendations",
    description:
      "Let AI guide your diet with customized Indian recipes, based on your health profile and preferences.",
    url: "https://nutrigeniusai.vercel.app/",
    siteName: "NutriGenius AI",
    images: [
      {
        url: "/brand_assets/logo.png",
        width: 1200,
        height: 630,
        alt: "NutriGenius AI Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriGenius AI",
    description:
      "Discover healthy Indian meals based on your body type, allergies, and preferences.",
    images: ["/brand_assets/logo.svg"],
    creator: "@arsenic_dev",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://nutrigeniusai.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" data-theme="light">
        <head>
          {/* SEO Structured Data for Google */}
          <Script id="structured-data" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "NutriGenius AI",
              url: "https://nutrigeniusai.vercel.app/",
              applicationCategory: "HealthApplication",
              description:
                "AI-powered meal recommendation system offering personalized Indian recipes.",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            })}
          </Script>
        </head>
        <body
          suppressHydrationWarning
          className={`${dmSans.className} antialiased text-slate-700`}
        >
          <Providers>
            <Header />
            <main
              className="container mx-auto px-5"
              role="main"
              aria-label="NutriGenius Main Content"
            >
              {children}
            </main>
            <Toaster />
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
