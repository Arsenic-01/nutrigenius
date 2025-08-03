"use client";

import { useEffect, useState, useMemo, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import Image from "next/image";

// --- Data Definitions (Cleaned Up) ---
const navItems = [
  { href: "/", label: "Home" },
  { href: "/#architecture", label: "Architecture" },
  { href: "/#data-journey", label: "Data Journey" },
  { href: "/#ai-core", label: "AI Core" },
  { href: "/#algorithms", label: "Algorithms" },
  { href: "/#team", label: "Team" },
  { href: "/#citations", label: "Citations" },
];

// --- Main Header Component ---
const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [activeSection, setActiveSection] = useState("/");
  const pathname = usePathname();

  const homeNavItems = useMemo(
    () => navItems.filter((item) => item.href.startsWith("/#")),
    []
  );

  // Performant scroll tracking using IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return; // Only run on the homepage

    const firstSectionElement = document.getElementById(
      homeNavItems[0].href.substring(2)
    );
    if (!firstSectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries
          .reverse()
          .find((entry) => entry.isIntersecting);

        if (intersectingEntry) {
          setActiveSection(`/#${intersectingEntry.target.id}`);
        } else if (window.scrollY < firstSectionElement.offsetTop) {
          // Handles scrolling back to the top (hero section)
          setActiveSection("/");
        }
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    const elements = homeNavItems.map((item) =>
      document.getElementById(item.href.substring(2))
    );
    elements.forEach((el) => el && observer.observe(el));

    return () => elements.forEach((el) => el && observer.unobserve(el));
  }, [pathname, homeNavItems]);

  // Determine the label for the rotating link
  const displayLabel = useMemo(() => {
    // On the homepage, show the current section's label
    if (pathname === "/") {
      return (
        navItems.find((item) => item.href === activeSection)?.label ?? "Home"
      );
    }
    // On all other pages, default to "Home"
    return "Home";
  }, [activeSection, pathname]);

  return (
    <header
      suppressHydrationWarning
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/80"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-teal-700 flex items-center justify-center"
            >
              <Image
                src={"/brand_assets/logo.svg"}
                alt="logo"
                width={50}
                height={50}
              />
              NutriGenius AI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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
                  <h4 className="font-medium leading-none text-sm px-2 py-1.5 text-muted-foreground">
                    Page Sections
                  </h4>
                  {homeNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block w-full rounded-sm px-2 py-1.5 text-start text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        activeSection === item.href
                          ? "font-semibold text-teal-700"
                          : "text-slate-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Clerk Authentication Buttons */}
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/meal-finder">
                <Button className="bg-teal-600 hover:bg-teal-700 text-base">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-10 w-10",
                  },
                }}
              />
            </SignedIn>
          </nav>

          {/* --- MOBILE SECTION (UNCHANGED) --- */}
          <div className="lg:hidden flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/meal-finder">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
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

      {/* Mobile Menu Content */}
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

export default memo(Header);
