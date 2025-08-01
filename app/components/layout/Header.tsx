"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/#architecture", label: "Architecture" },
  { href: "/#data-journey", label: "Data Journey" },
  { href: "/#ai-core", label: "AI Core" },
  { href: "/#algorithms", label: "Algorithms" },
  { href: "/#team", label: "Team" },
  { href: "/#citations", label: "Citations" },
  { href: "/recipes", label: "Recipes" },
  { href: "/recipe-generator", label: "Generator" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname(); // Get the current page's path

  // This effect handles the scroll-based active link for the homepage sections
  useEffect(() => {
    // Only run this logic if we are on the homepage
    if (pathname === "/") {
      const handleScroll = () => {
        const sections = navItems
          .filter((item) => item.href.startsWith("/#"))
          .map((item) => document.getElementById(item.href.substring(2))); // Correctly get ID

        const scrollPosition = window.pageYOffset;
        let currentSectionId = "";

        sections.forEach((section) => {
          if (section && section.offsetTop <= scrollPosition + 120) {
            currentSectionId = `/#${section.id}`;
          }
        });

        // Special case for the last section when at the bottom of the page
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50
        ) {
          const lastSection = navItems.find(
            (item) => item.href === "/#citations"
          );
          if (lastSection) {
            currentSectionId = lastSection.href;
          }
        }

        setActiveSection(currentSectionId);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Call on mount to set initial state

      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // If not on the homepage, clear the active section
      setActiveSection("");
    }
  }, [pathname]); // Rerun this effect if the pathname changes

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/80">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-teal-700">
              NutriGenius AI
            </Link>
          </div>
          <div className="hidden lg:block">
            <nav id="desktop-nav" className="flex items-center space-x-10">
              {navItems.map((item) => {
                // Determine if the link is active
                const isActive = item.href.startsWith("/#")
                  ? activeSection === item.href // Active if it's the current section on the homepage
                  : pathname === item.href; // Active if it's the current page

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-teal-600 hover:bg-teal-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger/Close Icon SVG */}
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
        <div id="mobile-menu" className="lg:hidden border-t border-slate-200">
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

export default Header;
