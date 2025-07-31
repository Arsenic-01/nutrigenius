"use client";
import { useState } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";

// NEW ALGORITHMS
const algorithms = [
  {
    title: "Ingredient-Based Retrieval",
    description:
      "To instantly find all recipes containing a specific ingredient, we use an <strong>Inverted Index Search</strong>. This is far more efficient than a simple database scan, allowing for near-instantaneous retrieval of an initial candidate pool from thousands of recipes.",
    color: "text-teal-700",
  },
  {
    title: "Multi-Criteria Filtering",
    description:
      "This is a deterministic, rule-based step. The system strictly filters the candidate pool by removing recipes containing specified <strong>allergens</strong>, those that don't match the desired <strong>meal type</strong>, and those exceeding the user's preferred <strong>cooking time</strong>.",
    color: "text-sky-700",
  },
  {
    title: "Meal Type Classification",
    description:
      "If a recipe isn't explicitly tagged, a <strong>Naive Bayes Classifier</strong> is used. Trained on recipe names and ingredients, it predicts the most likely meal type (e.g., breakfast, lunch, dinner), enabling accurate filtering.",
    color: "text-emerald-700",
  },
  {
    title: "Personalized Ranking (LTR)",
    description:
      "To order the final, filtered recipes, we use a <strong>Learning to Rank (LTR)</strong> model like a Gradient Boosted Tree. It learns to predict the best recipe based on a combination of factors, such as user ratings and recipe complexity.",
    color: "text-rose-700",
  },
];

// NEW CHALLENGES
const challenges = [
  {
    title: "Ingredient Ambiguity & Synonyms",
    challenge:
      'A user might search for "bell pepper," but the dataset lists "capsicum." How do we match ingredients that have different names?',
    solution:
      'We build and maintain a <strong>Food Ontology (Knowledge Graph)</strong>. This is essentially a thesaurus that maps synonyms, regional names (e.g., "coriander" to "dhania"), and variations to a single, standardized ingredient ID. The search query is expanded using this ontology to ensure no relevant recipes are missed.',
  },
  {
    title: 'The "No Results" Problem',
    challenge:
      "What happens if a user's criteria (e.g., a 10-minute dinner with chicken but no onions) are so strict that they yield zero results?",
    solution:
      "We employ a <strong>Fallback Strategy with Constraint Relaxation</strong>. If no initial results are found, the system intelligently loosens the least critical constraint (e.g., increasing cooking time by 15 minutes) and re-queries. This process repeats until suitable, albeit slightly broader, recommendations are found, preventing a frustrating dead-end for the user.",
  },
  {
    title: "Missing Meal Type Data",
    challenge:
      'Our dataset doesnt explicitly label every recipe as "breakfast", "lunch", or "dinner". How do we filter by meal type reliably?',
    solution:
      "This is solved by our <strong>Meal Type Classifier</strong>. We pre-process the entire dataset and use our trained model (e.g., Naive Bayes) to assign a predicted meal type to every recipe. This pre-calculated tag is then stored, allowing for fast and efficient filtering during a user's request, rather than performing a slow, on-the-fly prediction.",
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
          <div className="space-y-6">
            {challenges.map((item) => (
              <Card key={item.title} className="p-6">
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
