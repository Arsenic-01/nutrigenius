"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
}

interface ProcedureResponse {
  steps: string[];
}

const fetchProcedure = async (recipeId: number): Promise<ProcedureResponse> => {
  const response = await fetch(`http://127.0.0.1:8000/procedure/${recipeId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function ProcedureDialog({ recipeId }: { recipeId: number }) {
  const {
    data: procedure,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["procedure", recipeId],
    queryFn: () => fetchProcedure(recipeId),
    enabled: !!recipeId,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-4 w-3/4 rounded bg-slate-200 animate-pulse"></div>
        <div className="h-4 w-full rounded bg-slate-200 animate-pulse"></div>
        <div className="h-4 w-5/6 rounded bg-slate-200 animate-pulse"></div>
        <div className="h-4 w-full rounded bg-slate-200 animate-pulse"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Could not fetch the recipe steps. Please try again.
      </p>
    );
  }

  return (
    <ol className="list-decimal space-y-3 pl-5 text-slate-600">
      {procedure?.steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  );
}

export default function RecipesPage() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const { data: recipes } = useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: () => Promise.resolve([]),
    initialData: [],
  });

  if (!recipes || recipes.length === 0) {
    return (
      <Section id="recipes" className="min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          🍲 Recommended Recipes
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
          No recipes found. Please go back and generate some!
        </p>
        <div className="text-center">
          <Button onClick={() => router.push("/recipe-generator")}>
            Go Back
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Dialog
      open={!!selectedRecipe}
      onOpenChange={(isOpen) => !isOpen && setSelectedRecipe(null)}
    >
      <Section id="recipes" className="min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          🍲 Recommended Recipes
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
          Explore a curated collection of delicious recipes. Click any card to
          view the steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {recipes.map((recipe, index) => {
            const isExpanded = expandedIndex === index;
            const visibleIngredients = isExpanded
              ? recipe.ingredients
              : recipe.ingredients.slice(0, 3);

            return (
              <DialogTrigger asChild key={recipe.id}>
                <Card
                  onClick={() => setSelectedRecipe(recipe)}
                  className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover select-none pointer-events-none"
                    width={400}
                    height={200}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                      {recipe.title}
                    </h2>
                    <p className="text-slate-600 mb-4 flex-grow">
                      {recipe.description}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center mt-auto">
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
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent dialog from opening
                            setExpandedIndex(isExpanded ? null : index);
                          }}
                          className="bg-slate-200 text-slate-700 text-xs w-6 h-6 flex items-center justify-center font-mono rounded-full hover:bg-slate-300 transition"
                        >
                          {isExpanded
                            ? "−"
                            : `+${recipe.ingredients.length - 3}`}
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
            );
          })}
        </div>
      </Section>

      <DialogContent className="!max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {selectedRecipe?.title}
          </DialogTitle>
          <DialogDescription>
            Follow these steps to prepare your delicious meal.
          </DialogDescription>
        </DialogHeader>
        <div className="my-6">
          {selectedRecipe && <ProcedureDialog recipeId={selectedRecipe.id} />}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
