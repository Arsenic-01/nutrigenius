import { apiUrl } from "@/lib/constant";
import {
  RecipeRequestData,
  ProcedureResponse,
  PaginatedApiRecommendResponse,
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
