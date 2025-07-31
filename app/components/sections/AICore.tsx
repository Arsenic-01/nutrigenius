"use client";
import { useState } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import HorizontalBarChart from "../charts/HorizontalBarChart";

const engineSteps = [
  {
    title: "Profile Vectorization",
    description:
      "Your dietary goals, allergies, and cuisine preferences are converted into a numerical 'preference vector.'",
    color: "text-teal-700",
  },
  {
    title: "Recipe Feature Analysis",
    description:
      "We analyze the `Cleaned-Ingredients` and `Cuisine` of all 5,940 recipes, creating a unique 'feature vector' for each one using TF-IDF.",
    color: "text-sky-700",
  },
  {
    title: "Similarity Scoring",
    description:
      "Using Cosine Similarity, we calculate a score between your preference vector and every recipe vector to find the closest matches.",
    color: "text-emerald-700",
  },
  {
    title: "Rank & Recommend",
    description:
      "The highest-scoring recipes are ranked and presented to you as personalized recommendations.",
    color: "text-rose-700",
  },
];

const datasetFeatures = [
  { name: "TranslatedRecipeName", icon: "📖" },
  { name: "Cleaned-Ingredients", icon: "🌿" },
  { name: "TotalTimeInMins", icon: "⏱️" },
  { name: "Cuisine", icon: "🌶️" },
  { name: "TranslatedInstructions", icon: "📝" },
  { name: "Ingredient-count", icon: "🔢" },
];

const AICore = () => {
  const [activeTab, setActiveTab] = useState("foundation");

  const TabButton = ({
    id,
    children,
  }: {
    id: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base transition-all duration-300 ${
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
          Our system uses a single rich dataset and advanced analysis to deliver
          accurate, culturally authentic, and deeply personalized
          recommendations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-12">
        <div className=" rounded-xl flex justify-start space-x-2 md:space-x-4 border-b border-slate-200">
          <TabButton id="foundation">The Data Foundation</TabButton>
          <TabButton id="engine">The Intelligence Engine</TabButton>
        </div>

        <div className="mt-8">
          {activeTab === "foundation" && (
            <div className="p-6 md:p-8 border border-neutral-200 rounded-xl">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-center">
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    A Singular, High-Quality Dataset
                  </h3>
                  <div className="text-slate-600 mb-6">
                    We exclusively utilize the{" "}
                    <a href="https://www.kaggle.com/datasets/ashishpatel26/indian-recipes">
                      Indian Recipe Dataset
                    </a>{" "}
                    from Kaggle, a corpus of over 5,940 recipes.
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
            <div className="p-6 md:p-8 border border-neutral-200 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                {engineSteps.map((step, index) => {
                  return (
                    <Card
                      key={index}
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
