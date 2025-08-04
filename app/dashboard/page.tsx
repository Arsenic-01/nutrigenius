"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HeartCrack, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { getSavedRecipes, unsaveRecipe } from "@/lib/apis";
import { Recipe } from "@/types";
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

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isSignedIn, isLoaded } = useUser();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const {
    data: savedRecipes,
    isLoading,
    isError,
  } = useQuery<Recipe[]>({
    queryKey: ["savedRecipes", user?.id],
    queryFn: () => getSavedRecipes(user!.id),
    enabled: !!isSignedIn && !!user,
  });

  const { mutate: unsave } = useMutation({
    mutationFn: (recipeToUnsave: Recipe) => {
      if (!user) throw new Error("User not found");
      return unsaveRecipe(user.id, recipeToUnsave.id);
    },
    onMutate: async (recipeToUnsave: Recipe) => {
      await queryClient.cancelQueries({ queryKey: ["savedRecipes", user?.id] });

      const previousSavedRecipes =
        queryClient.getQueryData<Recipe[]>(["savedRecipes", user?.id]) || [];

      queryClient.setQueryData<Recipe[]>(
        ["savedRecipes", user?.id],
        (oldData = []) => oldData.filter((r) => r.id !== recipeToUnsave.id)
      );

      return { previousSavedRecipes };
    },
    onError: (err, variables, context) => {
      if (context?.previousSavedRecipes) {
        queryClient.setQueryData(
          ["savedRecipes", user?.id],
          context.previousSavedRecipes
        );
      }
      toast.error("Failed to unsave recipe.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["savedRecipes", user?.id] });
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });

  const handleUnsave = () => {
    if (!selectedRecipe) return;
    unsave(selectedRecipe);
    setSelectedRecipe(null);
  };

  if (isLoading || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-slate-500" />
      </div>
    );
  }

  if (isError) {
    toast.error("Could not fetch your saved recipes. Please try again later.");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-red-600">
          Something Went Wrong
        </h1>
        <p className="text-slate-500 mt-2">
          We couldn&apos;t load your saved recipes.
        </p>
      </div>
    );
  }

  return (
    <Dialog
      open={!!selectedRecipe}
      onOpenChange={(isOpen) => !isOpen && setSelectedRecipe(null)}
    >
      <div className="py-20 my-8 md:my-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">My Saved Recipes</h1>
          <p className="text-slate-500 mb-8">
            Your personal collection of culinary masterpieces.
          </p>

          {savedRecipes && savedRecipes.length > 0 ? (
            <RecipeGrid recipes={savedRecipes} onSelect={setSelectedRecipe} />
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center text-slate-500 p-6 border-2 border-dashed rounded-lg">
              <HeartCrack className="w-16 h-16 text-slate-400" />
              <h2 className="text-xl font-semibold text-slate-700">
                Your Recipe Box is Empty
              </h2>
              <p className="text-sm max-w-sm">
                Looks like you haven&apos;t saved any recipes yet. Let&apos;s
                find some delicious meals for you!
              </p>
              <Button onClick={() => router.push("/meal-finder")}>
                Find Recipes
              </Button>
            </div>
          )}
        </div>
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
        <div className="my-6 max-h-[60vh] overflow-y-auto scrollbar-hidden pr-4">
          {selectedRecipe && <ProcedureDialog recipeId={selectedRecipe.id} />}
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={handleUnsave}
          >
            <HeartCrack className="w-4 h-4 mr-2" />
            Unsave Recipe
          </Button>
          {selectedRecipe?.URL && (
            <a
              href={selectedRecipe.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto mr-2"
            >
              <Button variant="outline" className="w-full">
                View Full Recipe Source
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
