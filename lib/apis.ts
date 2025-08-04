import { apiUrl } from "@/lib/constant";
import {
  RecipeRequestData,
  ProcedureResponse,
  PaginatedApiRecommendResponse,
  Recipe,
} from "../types";
import { RecipeFormValues } from "./schema";

export const fetchProcedure = async (
  recipeId: number
): Promise<ProcedureResponse> => {
  const response = await fetch(`${apiUrl}/procedure/${recipeId}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchMoreRecipes = async (
  values: RecipeRequestData & { page: number }
): Promise<PaginatedApiRecommendResponse> => {
  const response = await fetch(`${apiUrl}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const recommendRecipes = async (
  values: RecipeFormValues & { page: number }
): Promise<PaginatedApiRecommendResponse> => {
  // Clean up optional values so they are not sent if empty
  const cleanedValues = Object.fromEntries(
    Object.entries(values).filter(([_, v]) => v)
  );

  const response = await fetch(`${apiUrl}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleanedValues),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export async function saveRecipe(userId: string, recipeId: number) {
  const res = await fetch(`${apiUrl}/save-recipe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
  });

  if (!res.ok) throw new Error("Failed to save recipe");
  return await res.json();
}

export async function getSavedRecipes(userId: string): Promise<Recipe[]> {
  const res = await fetch(`${apiUrl}/saved-recipes/${userId}`);
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch saved recipes");
  return await res.json();
}

export async function unsaveRecipe(userId: string, recipeId: number) {
  const res = await fetch(`${apiUrl}/unsave-recipe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
  });

  if (!res.ok) throw new Error("Failed to unsave recipe");
  return await res.json();
}
