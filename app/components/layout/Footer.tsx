import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Image
                src={"/brand_assets/logo.svg"}
                alt="logo"
                width={50}
                height={50}
                className="select-none pointer-events-none"
              />{" "}
              NutriGenius AI
            </h3>
            <p className="text-sm">
              A smart recipe recommendation system powered by machine learning
              to provide personalized meal plans based on your health goals and
              preferences.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:mx-auto">
            <h4 className="font-semibold text-white tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/meal-finder"
                  className="hover:text-white transition-colors"
                >
                  Discover Recipes
                </a>
              </li>
              <li>
                <Link
                  href="/#ai-core"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Project Links */}
          <div className="md:mx-auto">
            <h4 className="font-semibold text-white tracking-wider uppercase">
              Project
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/Arsenic-01/nutrigenius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Frontend Code
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Arsenic-01/nutrigenius_backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Backend Code
                </a>
              </li>
              <li>
                <a
                  href="https://nutrigenius-itr.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Live Site
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} NutriGenius AI. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
