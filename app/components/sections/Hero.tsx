"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Hero = () => {
  const router = useRouter();
  return (
    <header className="py-20 md:py-32 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
        Meal Planning Made <span className="text-teal-500">Simple.</span>
      </h1>
      <p className="text-lg text-slate-500 max-w-3xl mx-auto">
        Discover recipes customized to your dietary needs with NutriGenius AI —
        your smart companion for finding the perfect meal.
      </p>
      <div className="mt-8">
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl={"/recipe-generator"}>
            <Button className="bg-teal-600 hover:bg-teal-700 text-base">
              Get Started
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-base"
            onClick={() => router.push("/recipe-generator")}
          >
            Go to Recipe Generator
          </Button>
        </SignedIn>
      </div>
    </header>
  );
};

export default Hero;
