"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../components/ui/Button";
import Card from "../components/ui/Card";
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
import Section from "../components/ui/Section";
import { Clock, Tag, Zap } from "lucide-react";
import { apiUrl } from "../constant";

// Updated Recipe interface to match the new API response
interface Recipe {
  id: number;
  RecipeName: string;
  Cuisine?: string;
  Course?: string;
  Diet?: string;
  URL?: string;
  image: string;
  PrepTimeInMins?: number;
  CookTimeInMins?: number;
  TotalTimeInMins?: number;
}

interface ProcedureResponse {
  steps: string[];
}

const fetchProcedure = async (recipeId: number): Promise<ProcedureResponse> => {
  const response = await fetch(`${apiUrl}/procedure/${recipeId}`);
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
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const queryClient = useQueryClient();

  const recipes = queryClient.getQueryData<Recipe[]>(["recipes"]);

  if (!recipes || recipes.length === 0) {
    return (
      <div id="recipes" className="min-h-screen py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          🍲 Recommended Recipes
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
          No recipes found. Please go back and generate some!
        </p>
        <div className="text-center">
          <Button onClick={() => router.push("/recipe-generator")}>
            Go Back To Generator
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog
      open={!!selectedRecipe}
      onOpenChange={(isOpen) => !isOpen && setSelectedRecipe(null)}
    >
      <div id="recipes" className="min-h-screen py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          🍲 Recommended Recipes
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
          Explore a curated collection of delicious recipes. Click any card to
          view the steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {recipes.map((recipe) => {
            return (
              <DialogTrigger asChild key={recipe.id}>
                <Card
                  onClick={() => setSelectedRecipe(recipe)}
                  className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  <Image
                    src={recipe.image}
                    alt={recipe.RecipeName}
                    className="w-full h-48 object-cover select-none pointer-events-none"
                    width={400}
                    height={200}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-slate-800 mb-3">
                      {recipe.RecipeName}
                    </h2>

                    <div className="space-y-3 mt-auto pt-4 border-t border-slate-200">
                      {recipe.Cuisine && (
                        <div className="flex items-center text-sm text-slate-600">
                          <Tag className="w-4 h-4 mr-2 text-sky-600" />
                          <span>{recipe.Cuisine}</span>
                        </div>
                      )}
                      {recipe.Diet && (
                        <div className="flex items-center text-sm text-slate-600">
                          <Zap className="w-4 h-4 mr-2 text-amber-600" />
                          <span>{recipe.Diet}</span>
                        </div>
                      )}
                      {recipe.TotalTimeInMins && (
                        <div className="flex items-center text-sm text-slate-600">
                          <Clock className="w-4 h-4 mr-2 text-slate-500" />
                          <span>{recipe.TotalTimeInMins} minutes</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
            );
          })}
        </div>
      </div>

      <DialogContent className="!max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {selectedRecipe?.RecipeName}
          </DialogTitle>
          <DialogDescription>
            Follow these steps to prepare your delicious meal.
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 max-h-[60vh] overflow-y-auto pr-4">
          {selectedRecipe && <ProcedureDialog recipeId={selectedRecipe.id} />}
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          {selectedRecipe?.URL && (
            <a
              href={selectedRecipe.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto mr-2"
            >
              <Button variant="secondary" className="w-full">
                View Full Recipe
              </Button>
            </a>
          )}
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
