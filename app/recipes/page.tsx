"use client";
import { useState } from "react";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import Image from "next/image";

interface Recipe {
  title: string;
  description: string;
  image: string;
  ingredients: string[];
}

const recipes: Recipe[] = [
  {
    title: "Paneer Butter Masala",
    description:
      "A creamy North Indian curry made with paneer, butter, and rich tomato gravy.",
    image: "/recipes/PaneerButterMasala.jpeg",
    ingredients: [
      "Paneer",
      "Butter",
      "Masala",
      "Green Peas",
      "Curry Leaves",
      "Coriander",
    ],
  },
  {
    title: "Veg Pulao",
    description:
      "Fragrant basmati rice cooked with seasonal vegetables and aromatic spices.",
    image: "/recipes/VegPulaoo.jpg",
    ingredients: ["Rice", "Carrot", "Peas", "Beans", "Ghee", "Spices"],
  },
  {
    title: "Masala Dosa",
    description:
      "South Indian delicacy with crispy dosa and spiced potato filling.",
    image: "/recipes/MasalaDosa.jpg",
    ingredients: [
      "Rice Batter",
      "Potato",
      "Onion",
      "Curry Leaves",
      "Mustard Seeds",
      "Chutney",
    ],
  },
];

export default function RecipesPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Section id="recipes" className="min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
        🍲 Recommended Recipes
      </h1>
      <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
        Explore a curated collection of delicious and healthy recipes generated
        by NutriGenius AI.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {recipes.map((recipe, index) => {
          const isExpanded = expandedIndex === index;
          const visibleIngredients = isExpanded
            ? recipe.ingredients
            : recipe.ingredients.slice(0, 3);

          return (
            <Card key={index} className="overflow-hidden hover:shadow-xl">
              <Image
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
                width={1000}
                height={1000}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  {recipe.title}
                </h2>
                <p className="text-slate-600 mb-4">{recipe.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {visibleIngredients.map((ingredient, i) => (
                    <span
                      key={i}
                      className="bg-teal-100 text-teal-700 text-xs px-3 py-1 rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}

                  {recipe.ingredients.length > 3 && (
                    <button
                      onClick={() =>
                        setExpandedIndex(isExpanded ? null : index)
                      }
                      className="bg-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full hover:bg-slate-300 transition"
                    >
                      {isExpanded ? "−" : `+${recipe.ingredients.length - 3}`}
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
