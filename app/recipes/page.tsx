"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListFilterPlus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { fetchMoreRecipes } from "@/lib/apis";
import {
  PaginatedApiRecommendResponse,
  Recipe,
  RecipeRequestData,
} from "@/types";
import { useRouter } from "next/navigation";
import { CuisineFilter } from "../components/filters/CuisineFilter";
import { MealTypeFilter } from "../components/filters/MealTypeFilter";
import { ServingsFilter } from "../components/filters/ServingsFilter";
import { TimeFilter } from "../components/filters/TimeFilter";
import ProcedureDialog from "../components/recipe/ProcedureDialog";
import RecipeGrid from "../components/recipe/RecipeGrid";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/Dialog";

export default function RecipesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [maxTime, setMaxTime] = useState(300);
  const [maxServings, setMaxServings] = useState(12);

  const initialData = queryClient.getQueryData<PaginatedApiRecommendResponse>([
    "recommendationResponse",
  ]);
  const lastRequest = queryClient.getQueryData<RecipeRequestData>([
    "lastRequest",
  ]);

  useEffect(() => {
    if (initialData) {
      setAllRecipes(initialData.recipes);
      setCurrentPage(initialData.page);
      setHasNextPage(initialData.has_next_page);
    }
  }, [initialData]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((r) => {
      const cuisineMatch =
        selectedCuisines.length === 0 ||
        (r.Cuisine && selectedCuisines.includes(r.Cuisine));
      const mealTypeMatch =
        selectedMealTypes.length === 0 ||
        (r.Course && selectedMealTypes.includes(r.Course));
      const timeMatch = !r.TotalTimeInMins || r.TotalTimeInMins <= maxTime;
      const servingsMatch = !r.Servings || r.Servings <= maxServings;
      return cuisineMatch && mealTypeMatch && timeMatch && servingsMatch;
    });
  }, [allRecipes, selectedCuisines, selectedMealTypes, maxTime, maxServings]);

  const uniqueCuisines = useMemo(
    () => [
      ...new Set(
        allRecipes.map((r) => r.Cuisine).filter((x): x is string => Boolean(x))
      ),
    ],
    [allRecipes]
  );
  const uniqueMealTypes = useMemo(
    () => [
      ...new Set(
        allRecipes.map((r) => r.Course).filter((x): x is string => Boolean(x))
      ),
    ],
    [allRecipes]
  );

  const dataMaxTime = useMemo(
    () =>
      allRecipes.length > 0
        ? Math.max(...allRecipes.map((r) => r.TotalTimeInMins || 0))
        : 300, // Fallback if no recipes
    [allRecipes]
  );
  const dataMaxServings = useMemo(
    () =>
      allRecipes.length > 0
        ? Math.max(...allRecipes.map((r) => r.Servings || 0))
        : 12, // Fallback if no recipes
    [allRecipes]
  );
  useEffect(() => {
    setMaxTime(dataMaxTime);
    setMaxServings(dataMaxServings);
  }, [dataMaxTime, dataMaxServings]);

  const { mutate: loadMore, isPending } = useMutation({
    mutationFn: fetchMoreRecipes,
    onSuccess: (data) => {
      setAllRecipes((prev) => [...prev, ...data.recipes]);
      setCurrentPage(data.page);
      setHasNextPage(data.has_next_page);
    },
    onError: () => toast.error("Could not load more recipes."),
  });

  const handleLoadMore = () => {
    if (lastRequest && hasNextPage)
      loadMore({ ...lastRequest, page: currentPage + 1 });
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedMealTypes([]);
    setMaxTime(dataMaxTime);
    setMaxServings(dataMaxServings);
  };

  const activeFilterCount =
    selectedCuisines.length +
    selectedMealTypes.length +
    (maxTime < dataMaxTime ? 1 : 0) +
    (maxServings < dataMaxServings ? 1 : 0);

  if (!initialData || !lastRequest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-4">🦇🤵</div>
        <h1 className="text-3xl font-bold text-slate-800">
          Even Batman Needs to Eat.
        </h1>
        <p className="text-slate-500 mt-2 max-w-md">
          Alfred can&apos;t prepare a meal if the recipe book is empty. We
          wouldn&apos;t want Master Wayne to fight crime on an empty stomach,
          would we?
        </p>
        <Button className="mt-8" onClick={() => router.push("/meal-finder")}>
          Summon the Meal Plan
        </Button>
      </div>
    );
  }

  return (
    <Dialog
      open={!!selectedRecipe}
      onOpenChange={(isOpen) => !isOpen && setSelectedRecipe(null)}
    >
      <div className="py-20 my-8 md:my-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Recommended Recipes</h1>
          <p className="text-slate-500 mb-8">
            Explore a curated collection of recipes. Click any card to view
            steps.
          </p>

          <div className="mb-8 p-2 md:p-4 bg-slate-50 border rounded-lg flex flex-col md:flex-row gap-4">
            <div className="hidden md:flex items-center gap-2 text-slate-700 font-semibold">
              <ListFilterPlus className="w-5 h-5" /> <span>Filters</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex gap-2 items-center justify-center w-full">
                <CuisineFilter
                  cuisines={uniqueCuisines}
                  selected={selectedCuisines}
                  onChange={setSelectedCuisines}
                />
                <MealTypeFilter
                  mealTypes={uniqueMealTypes}
                  selected={selectedMealTypes}
                  onChange={setSelectedMealTypes}
                />
              </div>
              <div className="flex gap-2 items-center justify-center w-full">
                <TimeFilter
                  max={dataMaxTime}
                  onChange={setMaxTime}
                  value={maxTime}
                />
                <ServingsFilter
                  max={dataMaxServings}
                  value={maxServings}
                  onChange={setMaxServings}
                />
              </div>
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  className="ml-auto"
                  onClick={clearFilters}
                >
                  <X className="w-4 h-4" /> Clear All
                </Button>
              )}
            </div>
          </div>
          {filteredRecipes.length > 0 ? (
            <RecipeGrid
              recipes={filteredRecipes}
              onSelect={setSelectedRecipe}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-center text-slate-500 md:p-6">
              <svg
                height="868"
                width="2500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 726 252.17"
                className="size-28"
              >
                <path d="M483.92 0S481.38 24.71 466 40.11c-11.74 11.74-24.09 12.66-40.26 15.07-9.42 1.41-29.7 3.77-34.81-.79-2.37-2.11-3-21-3.22-27.62-.21-6.92-1.36-16.52-2.82-18-.75 3.06-2.49 11.53-3.09 13.61S378.49 34.3 378 36a85.13 85.13 0 0 0-30.09 0c-.46-1.67-3.17-11.48-3.77-13.56s-2.34-10.55-3.09-13.61c-1.45 1.45-2.61 11.05-2.82 18-.21 6.67-.84 25.51-3.22 27.62-5.11 4.56-25.38 2.2-34.8.79-16.16-2.47-28.51-3.39-40.21-15.13C244.57 24.71 242 0 242 0H0s69.52 22.74 97.52 68.59c16.56 27.11 14.14 58.49 9.92 74.73C170 140 221.46 140 273 158.57c69.23 24.93 83.2 76.19 90 93.6 6.77-17.41 20.75-68.67 90-93.6 51.54-18.56 103-18.59 165.56-15.25-4.21-16.24-6.63-47.62 9.93-74.73C656.43 22.74 726 0 726 0z" />
              </svg>
              <h2 className="text-lg font-semibold text-black">
                No recipes found...
              </h2>
              <p className="text-sm max-w-sm">
                Even Batman couldn&apos;t track that one down. Maybe try
                loosening your filters, hero.
              </p>
              <Button variant={"outline"} onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {hasNextPage && filteredRecipes.length > 0 && (
            <div className="text-center mt-12">
              <Button onClick={handleLoadMore} disabled={isPending}>
                {isPending ? "Loading..." : "Load More Recipes"}
              </Button>
            </div>
          )}
        </div>

        <DialogContent className="!max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedRecipe?.RecipeName}
            </DialogTitle>
            <DialogDescription>
              Follow these steps to prepare your meal.
            </DialogDescription>
          </DialogHeader>
          <div className="my-6 max-h-[60vh] overflow-y-auto pr-4">
            {selectedRecipe && <ProcedureDialog recipeId={selectedRecipe.id} />}
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
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
      </div>
    </Dialog>
  );
}
