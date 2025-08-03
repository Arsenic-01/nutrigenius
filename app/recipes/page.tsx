"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Clock, Tag, Users, Zap, Filter, X } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/Popover";
import { Label } from "../components/ui/Label";
import { Slider } from "../components/ui/Slider";
import { apiUrl } from "../constant";
import { toast } from "sonner";
import { Checkbox } from "../components/ui/Checkbox";

// Interfaces to match the data structures
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
  Servings?: number;
}

interface PaginatedApiResponse {
  recipes: Recipe[];
  page: number;
  total_pages: number;
  has_next_page: boolean;
}

interface RecipeRequestData {
  height_cm: number;
  weight_kg: number;
  desired_ingredients: string;
  meal_type: string;
  weight_goal: string;
  user_allergies?: string;
  diet_preference?: string;
  max_cooking_time?: number;
  skill_level?: string;
  pantry_ingredients?: string;
}

interface ProcedureResponse {
  steps: string[];
}

const fetchProcedure = async (recipeId: number): Promise<ProcedureResponse> => {
  const response = await fetch(`${apiUrl}/procedure/${recipeId}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const fetchMoreRecipes = async (
  values: RecipeRequestData & { page: number }
): Promise<PaginatedApiResponse> => {
  const response = await fetch(`${apiUrl}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

function ProcedureDialog({ recipeId }: { recipeId: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["procedure", recipeId],
    queryFn: () => fetchProcedure(recipeId),
    enabled: !!recipeId,
  });

  if (isLoading) return <div className="text-center">Loading steps...</div>;
  if (isError)
    return <p className="text-red-500">Could not fetch recipe steps.</p>;
  return (
    <ol className="list-decimal space-y-3 pl-5 text-slate-600">
      {data?.steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  );
}

export default function RecipesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // State for all recipes and pagination
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // --- NEW: State for client-side filters ---
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [maxTime, setMaxTime] = useState<number>(300); // Default max time
  const [maxServings, setMaxServings] = useState<number>(12); // Default max servings

  const initialData = queryClient.getQueryData<PaginatedApiResponse>([
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

  // --- NEW: Memoized filtering logic ---
  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      const cuisineMatch =
        selectedCuisines.length === 0 ||
        (recipe.Cuisine && selectedCuisines.includes(recipe.Cuisine));
      const mealTypeMatch =
        selectedMealTypes.length === 0 ||
        (recipe.Course && selectedMealTypes.includes(recipe.Course));
      const timeMatch =
        !recipe.TotalTimeInMins || recipe.TotalTimeInMins <= maxTime;
      const servingsMatch = !recipe.Servings || recipe.Servings <= maxServings;
      return cuisineMatch && mealTypeMatch && timeMatch && servingsMatch;
    });
  }, [allRecipes, selectedCuisines, selectedMealTypes, maxTime, maxServings]);

  // --- NEW: Extract unique filter options from the results ---
  const uniqueCuisines = useMemo(
    () => [
      ...new Set(
        allRecipes.map((r) => r.Cuisine).filter((c): c is string => !!c)
      ),
    ],
    [allRecipes]
  );

  const uniqueMealTypes = useMemo(
    () => [
      ...new Set(
        allRecipes.map((r) => r.Course).filter((c): c is string => Boolean(c))
      ),
    ],
    [allRecipes]
  );

  const { mutate: loadMore, isPending: isLoadingMore } = useMutation({
    mutationFn: fetchMoreRecipes,
    onSuccess: (data) => {
      setAllRecipes((prev) => [...prev, ...data.recipes]);
      setCurrentPage(data.page);
      setHasNextPage(data.has_next_page);
    },
    onError: () => {
      toast.error("Could not load more recipes. Please try again.");
    },
  });

  const handleLoadMore = () => {
    if (lastRequest && hasNextPage) {
      loadMore({ ...lastRequest, page: currentPage + 1 });
    }
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedMealTypes([]);
    setMaxTime(300);
    setMaxServings(12);
  };

  const activeFilterCount =
    selectedCuisines.length +
    selectedMealTypes.length +
    (maxTime < 300 ? 1 : 0) +
    (maxServings < 12 ? 1 : 0);

  if (!initialData || !lastRequest) {
    return (
      <div id="recipes" className="min-h-screen pt-12 mt-20 mb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          🍲 Recommended Recipes
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
          No recipes found. Please go back and generate some!
        </p>
        <div className="text-center">
          <Button onClick={() => router.push("/meal-finder")}>
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
      <div id="recipes" className="min-h-screen py-12 mb-20 mt-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center md:text-start mb-4 ">
            Recommended Recipes
          </h1>
          <p className="text-slate-500 text-center md:text-start max-w-2xl mb-8">
            Explore a curated collection of delicious recipes. Click any card to
            view the steps.
          </p>
        </div>
        {/* --- NEW: Filter Bar --- */}
        <div className="max-w-5xl mx-auto mb-8 p-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
          <div className="items-center gap-2 font-semibold text-slate-700 hidden md:flex">
            <Filter className="w-5 h-5" />
            <span>Filters:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Cuisine Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  Cuisine ({selectedCuisines.length || "All"})
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 max-h-72 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Cuisine</h4>
                  <p className="text-sm text-muted-foreground">
                    Select preferred cuisines.
                  </p>
                  <div className="max-h-48  space-y-2 py-2">
                    {uniqueCuisines.map((cuisine) => (
                      <div
                        key={cuisine}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={cuisine}
                          checked={selectedCuisines.includes(cuisine)}
                          onCheckedChange={(checked) => {
                            setSelectedCuisines((prev) =>
                              checked
                                ? [...prev, cuisine]
                                : prev.filter((c) => c !== cuisine)
                            );
                          }}
                        />
                        <Label htmlFor={cuisine}>{cuisine}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Meal Type Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  Meal Type ({selectedMealTypes.length || "All"})
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 max-h-72 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Meal Type</h4>
                  <p className="text-sm text-muted-foreground">
                    Select course types.
                  </p>
                  <div className="max-h-48  space-y-2 pt-2">
                    {uniqueMealTypes.map((mealType) => (
                      <div
                        key={mealType}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={mealType}
                          checked={selectedMealTypes.includes(mealType)}
                          onCheckedChange={(checked) => {
                            setSelectedMealTypes((prev) =>
                              checked
                                ? [...prev, mealType]
                                : prev.filter((c) => c !== mealType)
                            );
                          }}
                        />
                        <Label htmlFor={mealType}>{mealType}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Time Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Time (Max {maxTime} min)</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Max Cooking Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Set a maximum total time.
                  </p>
                  <Slider
                    defaultValue={[maxTime]}
                    max={300}
                    step={15}
                    onValueChange={(value) => setMaxTime(value[0])}
                    className="pt-4"
                  />
                </div>
              </PopoverContent>
            </Popover>

            {/* Servings Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Servings (Max {maxServings})</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 max-h-72 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Max Servings</h4>
                  <p className="text-sm text-muted-foreground">
                    Set maximum servings.
                  </p>
                  <Slider
                    defaultValue={[maxServings]}
                    max={12}
                    step={1}
                    onValueChange={(value) => setMaxServings(value[0])}
                    className="pt-4"
                  />
                </div>
              </PopoverContent>
            </Popover>

            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="ml-auto text-sm text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {filteredRecipes.map((recipe) => (
              <DialogTrigger asChild key={`${recipe.id}-${recipe.RecipeName}`}>
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
                    <h2 className="text-lg font-bold text-slate-800 mb-3">
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
                      {recipe.Servings && (
                        <div className="flex items-center text-sm text-slate-600">
                          <Users className="w-4 h-4 mr-2 text-slate-500" />
                          <span>{recipe.Servings} people</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 max-w-2xl mx-auto">
            <p>
              No recipes match your current filters. Try clearing them to see
              all results.
            </p>
          </div>
        )}

        {hasNextPage && filteredRecipes.length > 0 && (
          <div className="text-center mt-12">
            <Button onClick={handleLoadMore} disabled={isLoadingMore}>
              {isLoadingMore ? "Loading..." : "Load More Recipes"}
            </Button>
          </div>
        )}
      </div>

      {/* Dialog Content (No changes) */}
      <DialogContent className="!max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
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
