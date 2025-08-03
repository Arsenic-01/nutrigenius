"use client";
import { useState, useRef, useEffect } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Updated data to reflect the final model
const engineSteps = [
  {
    title: "1. Filtering",
    description:
      "The system first narrows down thousands of recipes by applying your hard constraints like `Cuisine`, `Diet`, `Meal Type`, and `Skill Level`.",
    color: "text-sky-700",
  },
  {
    title: "2. Feature Enrichment",
    description:
      "Each remaining recipe is enriched with pre-calculated data from our master dataset, including detailed `Nutritional Info` and a `Popularity Score`.",
    color: "text-indigo-700",
  },
  {
    title: "3. Text Analysis",
    description:
      "Using `TF-IDF`, the model analyzes your `Desired Ingredients` to calculate a text similarity score for each candidate recipe.",
    color: "text-teal-700",
  },
  {
    title: "4. Intelligent Ranking",
    description:
      "A final, weighted score is calculated, combining text similarity, nutritional alignment with your `BMI` and `Goals`, and course suitability to find the perfect recommendations.",
    color: "text-rose-700",
  },
];

const datasetFeatures = [
  { name: "RecipeName", icon: "📖" },
  { name: "Cleaned_Ingredients", icon: "🌿" },
  { name: "Cuisine", icon: "🌶️" },
  { name: "Diet", icon: "❤️" },
  { name: "Calories (kcal)", icon: "🔥" },
  { name: "Protein (g)", icon: "💪" },
  { name: "rating_avg", icon: "⭐" },
  { name: "n_ratings", icon: "📊" },
];

const AICore = () => {
  const [activeTab, setActiveTab] = useState("foundation");
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
    <Section id="ai-core">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center justify-center">
          <span className="mr-3 text-2xl">🧠</span>The AI Core
        </h2>
        <p className="mt-4 mb-6 text-slate-500 max-w-3xl mx-auto">
          Our system fuses multiple high-quality datasets into a single,
          optimized source of truth. This data-driven foundation allows our
          intelligence engine to deliver fast and deeply personalized
          recommendations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-12">
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
            className="flex space-x-2 sm:space-x-4 -mb-px overflow-x-auto no-scrollbar"
          >
            <TabButton id="foundation">The Data Foundation</TabButton>
            <TabButton id="engine">The Intelligence Engine</TabButton>
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
          {activeTab === "foundation" && (
            <div className="p-6 md:p-8 border border-neutral-200 rounded-xl animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-center">
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    A Fused, High-Quality Master Dataset
                  </h3>
                  <div className="text-slate-600 mb-6">
                    We combine data from multiple sources—including our core
                    Indian Recipe Dataset and a dedicated Indian Nutritional
                    Database—into a single, pre-compiled master file.
                  </div>
                  <h4 className="font-semibold text-slate-700 mb-3 mt-8">
                    Key Attributes Analyzed:
                  </h4>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    {datasetFeatures.map((feature) => (
                      <div
                        key={feature.name}
                        className="flex items-center bg-white/60 p-2 rounded-md border border-neutral-200"
                      >
                        <span className="mr-2 text-lg">{feature.icon}</span>
                        <span className="text-slate-600 font-medium">
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3 relative w-full h-[350px]">
                  <HorizontalBarChart />
                </div>
              </div>
            </div>
          )}

          {activeTab === "engine" && (
            <div className="p-6 md:p-8 border border-neutral-200 rounded-xl animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                {engineSteps.map((step) => {
                  return (
                    <Card
                      key={step.title}
                      className={`relative p-5 border border-neutral-200 rounded-xl`}
                    >
                      <div className="flex items-center mb-4">
                        <h4 className={`text-xl font-bold ${step.color}`}>
                          {step.title}
                        </h4>
                      </div>
                      <p
                        className="text-sm text-slate-600"
                        dangerouslySetInnerHTML={{
                          __html: step.description
                            .replace(
                              /`([^`]+)`/g,
                              '<code class="font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">$&</code>'
                            )
                            .replace(/`+/g, ""),
                        }}
                      ></p>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default AICore;
