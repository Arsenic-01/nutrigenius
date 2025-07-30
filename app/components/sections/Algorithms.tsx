"use client";
import { useState } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";

const algorithms = [
  {
    title: "Content-Based Filtering",
    description:
      "Recommends recipes based on their inherent properties. We use <strong>TF-IDF Vectorization</strong> to convert recipe text (ingredients, cuisine) into numerical vectors and <strong>Cosine Similarity</strong> to find items similar to a user's preferences.",
    color: "text-teal-700",
  },
  {
    title: "Collaborative Filtering",
    description:
      "Suggests recipes based on the behavior of similar users. We employ <strong>Matrix Factorization (SVD)</strong> to uncover latent taste profiles from the user-recipe interaction data (ratings, saves).",
    color: "text-sky-700",
  },
  {
    title: "Nutrient Deficiency Forecasting",
    description:
      "Predicts nutrient risk levels. A <strong>Random Forest Classifier</strong> is trained on public health data (NHANES) to classify a user's risk as low, medium, or high based on their dietary intake patterns.",
    color: "text-emerald-700",
  },
  {
    title: "Cooking Time Prediction",
    description:
      "Estimates prep and cook times from recipe text. We fine-tune a <strong>BERT (Transformer)</strong> model, a powerful NLP technique that understands the context and semantics of cooking instructions.",
    color: "text-rose-700",
  },
];

const challenges = [
  {
    title: 'The "Cold Start" Problem',
    challenge:
      "How do you recommend recipes to a new user with no interaction history?",
    solution:
      "Our hybrid model defaults to the <strong>Content-Based Filtering</strong> engine for new users. Recommendations are based entirely on the explicit preferences, health goals, and allergies they provide during our comprehensive onboarding process.",
  },
  {
    title: "Data Sparsity",
    challenge:
      "The user-recipe interaction matrix will be mostly empty, as any single user will have interacted with only a tiny fraction of all available recipes.",
    solution:
      "The <strong>Matrix Factorization (SVD)</strong> algorithm is specifically designed to handle sparse data by learning latent features, allowing it to predict ratings for recipes a user has never seen.",
  },
  {
    title: "Nutritional Accuracy & The Mapping Gap",
    challenge:
      'Recipe ingredients are described in inconsistent, colloquial terms (e.g., "a pinch of hing," "besan"). Mapping these to a standardized nutritional database is a major NLP challenge.',
    solution:
      "We employ a multi-step <strong>data normalization pipeline</strong> that cleans, parses, and standardizes ingredient text. It then uses a prioritized lookup strategy, first checking Indian-specific databases (INDB) before falling back to global ones (USDA), to achieve the most accurate nutritional mapping possible.",
  },
];

const Algorithms = () => {
  const [activeTab, setActiveTab] = useState("algorithms");

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
    <Section id="algorithms">
      <h2 className="text-3xl md:text-4xl mb-4 font-bold text-center text-slate-800 flex items-center justify-center">
        <span className="text-2xl mr-3">⚙️</span>Algorithms
      </h2>
      <p className="text-center text-slate-500 max-w-3xl mx-auto mb-12">
        A look under the hood at the core algorithms that power our AI and the
        strategies we employ to overcome common development hurdles.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 border-b border-slate-200">
          <nav className="flex space-x-4 sm:space-x-8 -mb-px" aria-label="Tabs">
            <TabButton id="algorithms">Core Algorithms</TabButton>
            <TabButton id="challenges">Overcoming Challenges</TabButton>
          </nav>
        </div>

        {activeTab === "algorithms" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {algorithms.map((algo, index) => (
              <Card key={index} className="p-6">
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
          <div className="space-y-6">
            {challenges.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-bold text-xl mb-2 text-slate-800">
                  {item.title}
                </h3>
                <p className="text-slate-600">
                  <strong className="text-teal-700">Challenge:</strong>{" "}
                  {item.challenge}
                  <br />
                  <strong className="text-teal-700">Solution:</strong>{" "}
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
      </div>
    </Section>
  );
};

export default Algorithms;
