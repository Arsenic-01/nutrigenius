import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div className="shadow-xl shadow-slate-200/80 rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center border border-slate-200">
        {/* SVG Illustration: Missing Recipe Book Page */}
        <div className="mb-6">
          <svg
            className="mx-auto h-32 w-32 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M9 12h4" />
            <path d="M9 16h4" />
            <path d="M15 12h.01" />
            <path d="M15 16h.01" />
            <path d="M9 8h2" />
            {/* The Question Mark */}
            <path
              d="M14.5 7.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-5 0z"
              fill="currentColor"
              stroke="none"
            />
            <path d="M17 10v1" />
            <path d="M15.5 12.5c0-1.5 1.5-2 3-2" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Well, this is awkward.
        </h1>
        <h2 className="text-5xl sm:text-6xl font-bold text-teal-600 mt-2">
          404
        </h2>

        <p className="text-slate-500 mt-6 max-w-md mx-auto">
          We&apos;ve searched our entire cookbook, but it seems this page was
          either used as a napkin or the dog ate it. Let&apos;s find you a
          recipe that actually exists.
        </p>

        <div className="mt-10">
          <Link
            href="/meal-finder"
            className="inline-block bg-slate-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-slate-900 transition-colors duration-300"
          >
            Back to All Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
