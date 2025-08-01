"use client";

import { useEffect, useState, useMemo, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/Popover";
import { Button } from "../ui/Button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

// --- Data Definitions ---
const navItems = [
  { href: "/", label: "Home" },
  { href: "/#architecture", label: "Architecture" },
  { href: "/#data-journey", label: "Data Journey" },
  { href: "/#ai-core", label: "AI Core" },
  { href: "/#algorithms", label: "Algorithms" },
  { href: "/#team", label: "Team" },
  { href: "/#citations", label: "Citations" },
  { href: "/recipes", label: "Recipes" },
  { href: "/recipe-generator", label: "Generate Recipe" },
];

// --- Main Header Component ---
const Header = () => {
  // State for mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to track the currently visible section on the home page
  const [activeSection, setActiveSection] = useState("/");
  const pathname = usePathname();

  // Memoize the list of home page sections to prevent recalculation on re-renders
  const homeNavItems = useMemo(
    () => navItems.filter((item) => item.href.startsWith("/#")),
    []
  );

  // Use IntersectionObserver for performant scroll tracking on the home page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set the active section to the one that just entered the viewport
            setActiveSection(`/#${entry.target.id}`);
          }
        });
      },
      // Trigger when 20% of the section is visible
      { rootMargin: "0px 0px -80% 0px" }
    );

    // Observe each section element
    const elements = homeNavItems.map((item) =>
      document.getElementById(item.href.substring(2))
    );
    elements.forEach((el) => el && observer.observe(el));

    // Cleanup function to disconnect the observer
    return () => elements.forEach((el) => el && observer.unobserve(el));
  }, [pathname, homeNavItems]);

  // Determine the label to display based on the active section or current path
  const displayLabel = useMemo(() => {
    if (pathname === "/") {
      // Find the label for the active section, default to "Home"
      return (
        navItems.find((item) => item.href === activeSection)?.label ?? "Home"
      );
    }
    // For other pages, find the corresponding label
    return navItems.find((item) => item.href === pathname)?.label ?? "Home";
  }, [activeSection, pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/80">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-teal-700">
              NutriGenius AI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-base text-teal-700 font-medium hover:bg-teal-50"
                >
                  {displayLabel}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="grid">
                  <h4 className="font-medium leading-none text-sm px-2 py-1.5">
                    Page Sections
                  </h4>
                  {homeNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block w-full rounded-sm px-2 py-1.5 text-start text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        activeSection === item.href
                          ? "font-bold text-teal-700"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl={"/recipe-generator"}>
                <Button variant="default" size="sm">
                  Sign in
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-12 w-10",
                  },
                }}
              />
            </SignedIn>
          </nav>

          {/* --- THIS MOBILE SECTION IS UNTOUCHED --- */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-teal-600 hover:bg-teal-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6 block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// Memoize the component to prevent re-renders when parent state changes
export default memo(Header);
