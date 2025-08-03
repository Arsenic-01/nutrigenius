export interface Recipe {
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

export interface PaginatedApiRecommendResponse {
  recipes: Recipe[];
  page: number;
  total_pages: number;
  has_next_page: boolean;
}

export interface RecipeRequestData {
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

export interface ProcedureResponse {
  steps: string[];
}
