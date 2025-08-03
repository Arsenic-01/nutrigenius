import { z } from "zod";

export const recipeFormSchema = z.object({
  height_cm: z.coerce.number().positive("Height must be a positive number."),
  weight_kg: z.coerce.number().positive("Weight must be a positive number."),
  desired_ingredients: z
    .string()
    .min(3, "Please enter at least one ingredient."),
  user_allergies: z.string().optional(),
  meal_type: z.string(),
  weight_goal: z.string(),
  diet_preference: z.string().optional(),
  max_cooking_time: z.coerce.number().positive().optional(),
  skill_level: z.string().optional(),
  pantry_ingredients: z.string().optional(),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;
