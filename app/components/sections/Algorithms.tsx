"use client";
import { useState, useRef, useEffect } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Data for the component (no changes)
const algorithms = [
  {
    title: "Text Analysis & Retrieval",
    description:
      "The initial search uses a classic NLP combination of <strong>TF-IDF</strong> to identify the most important ingredients in each recipe, and <strong>Cosine Similarity</strong> to find the recipes that best match the user's text query. This is highly efficient for keyword-based retrieval.",
    color: "text-teal-700",
  },
  {
    title: "Data Merging & Enrichment",
    description:
      "To combine our recipe data with the Indian nutritional dataset, we use <strong>Fuzzy String Matching</strong> with the RapidFuzz library. This allows the model to intelligently match recipe names (e.g., 'Paneer Butter Masala') to their nutritional profiles, even if the names aren't identical.",
    color: "text-sky-700",
  },
  {
    title: "Rule-Based Filtering",
    description:
      "Before ranking, a deterministic filtering layer removes any recipes that don't match the user's hard constraints, such as <strong>Cuisine Preference</strong>, <strong>Dietary Needs</strong>, or maximum <strong>Cooking Time</strong>. This ensures all results are relevant.",
    color: "text-indigo-700",
  },
  {
    title: "Personalized Ranking",
    description:
      "The core of the system is a <strong>Weighted Multi-Factor Scoring</strong> function. This heuristic-based Learning to Rank (LTR) approach combines multiple features—text similarity, nutritional alignment with user's BMI and goals, and course suitability—into a single score to find the truly best recommendations.",
    color: "text-rose-700",
  },
];
const challenges = [
  {
    title: 'The "Snack for Dinner" Problem',
    challenge:
      "A user asks for 'Dinner' and gets recommendations for appetizers or snacks like 'Paneer Pakora' instead of a main course.",
    solution:
      "This is solved with a <strong>Course-Aware Ranking</strong> system. The model now understands the context of a meal. When 'Dinner' is requested, recipes tagged as 'Main Course' get a significant score boost, while 'Snacks' and 'Appetizers' receive a penalty, ensuring a proper meal is recommended.",
  },
  {
    title: 'The "No Results" Problem',
    challenge:
      "What happens if a user's criteria are so strict (e.g., 'chicken, rice, and quinoa') that no single recipe contains all ingredients?",
    solution:
      "The model employs a <strong>Strict-then-Relaxed Search</strong> strategy. It first looks for recipes containing ALL desired ingredients. If none are found, it automatically falls back to a relaxed search, finding recipes that contain ANY of the ingredients, preventing a dead-end for the user.",
  },
];
const performanceData = {
  startup: [
    { name: "Old Model", "Time (s)": 3.5 },
    { name: "Optimized Model", "Time (s)": 0.8 },
  ],
  request: [
    { name: "Old Model", "Time (s)": 2.5 },
    { name: "Optimized Model", "Time (s)": 0.1 },
  ],
};

const Algorithms = () => {
  const [activeTab, setActiveTab] = useState("algorithms");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkForScroll = () => {
    const el = tabsRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth);
    }
  };

  useEffect(() => {
    checkForScroll();
    window.addEventListener("resize", checkForScroll);
    return () => window.removeEventListener("resize", checkForScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    tabsRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const TabButton = ({
    id,
    children,
  }: {
    id: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`whitespace-nowrap py-4 px-2 sm:px-4 border-b-2 font-medium text-base transition-all duration-300 ${
        activeTab === id
          ? "border-teal-600 text-teal-600"
          : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );

  return (
    <Section id="algorithms">
      <h2 className="text-3xl md:text-4xl mb-4 font-bold text-center text-slate-800 flex items-center justify-center">
        <span className="text-2xl mr-3">⚙️</span>How It Works
      </h2>
      <p className="text-center text-slate-500 max-w-3xl mx-auto mb-12">
        A look under the hood at the core algorithms and strategies that power
        our AI, ensuring fast, accurate, and relevant recommendations.
      </p>

      <div className="max-w-4xl mx-auto">
        {/* --- NEW: Responsive Tab Navigation --- */}
        <div className="relative border-b border-slate-200">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md z-10"
            >
              <ChevronLeft className="h-6 w-6 text-slate-600" />
            </button>
          )}
          <div
            ref={tabsRef}
            onScroll={checkForScroll}
            className="flex space-x-2 sm:space-x-8 -mb-px overflow-x-auto no-scrollbar"
          >
            <TabButton id="algorithms">Core Algorithms</TabButton>
            <TabButton id="challenges">Overcoming Challenges</TabButton>
            <TabButton id="efficiency">Model Efficiency</TabButton>
          </div>
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md z-10"
            >
              <ChevronRight className="h-6 w-6 text-slate-600" />
            </button>
          )}
        </div>

        <div className="mt-8">
          {activeTab === "algorithms" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {algorithms.map((algo) => (
                <Card key={algo.title} className="p-6">
                  <h3 className={`font-bold text-xl mb-2 ${algo.color}`}>
                    {algo.title}
                  </h3>
                  <p
                    className="text-slate-600 mb-3"
                    dangerouslySetInnerHTML={{
                      __html: algo.description.replace(
                        /<strong>/g,
                        '<strong class="text-slate-800">'
                      ),
                    }}
                  ></p>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "challenges" && (
            <div className="space-y-6 animate-fade-in">
              {challenges.map((item) => (
                <Card key={item.title} className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">
                    <strong className="text-rose-700">Challenge:</strong>{" "}
                    {item.challenge}
                    <br />
                    <strong className="text-emerald-700">Solution:</strong>{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.solution.replace(
                          /<strong>/g,
                          '<strong class="text-slate-800">'
                        ),
                      }}
                    ></span>
                  </p>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "efficiency" && (
            <div className="animate-fade-in">
              <Card className="p-6 mb-6">
                <h3 className="font-bold text-xl mb-2 text-slate-800">
                  Pre-computation is Key
                </h3>
                <p className="text-slate-600">
                  The biggest performance gain comes from doing all the heavy
                  data processing and merging just **once** before the server
                  starts. Instead of re-calculating nutrition for every user
                  request, the model loads a single, pre-compiled{" "}
                  <strong className="text-slate-800">master dataset</strong>.
                  This makes the system incredibly fast and scalable.
                </p>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="font-semibold text-center mb-4">
                    Server Startup Time
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={performanceData.startup}
                      margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Time (s)" fill="#0d9488" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold text-center mb-4">
                    Per-Request Recommendation Time
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={performanceData.request}
                      margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Time (s)" fill="#be123c" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Algorithms;
