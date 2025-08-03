"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";

import { Input } from "../components/ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../constant";

// Updated schema to include all new fields from the advanced model
const formSchema = z.object({
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
  // New fields
  skill_level: z.string().optional(),
  pantry_ingredients: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof formSchema>;

// Updated Recipe interface to match the API response
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

// Interface for the new paginated API response
interface PaginatedApiRecommendResponse {
  recipes: Recipe[];
  page: number;
  total_pages: number;
  has_next_page: boolean;
}

const recommendRecipes = async (
  values: RecipeFormValues & { page: number }
): Promise<PaginatedApiRecommendResponse> => {
  // Clean up optional values so they are not sent if empty
  const cleanedValues = {
    ...values,
    user_allergies: values.user_allergies || undefined,
    diet_preference: values.diet_preference || undefined,
    max_cooking_time: values.max_cooking_time || undefined,
    skill_level: values.skill_level || undefined,
    pantry_ingredients: values.pantry_ingredients || undefined,
  };

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

// Predefined options for the new dropdowns
const mealTypeOptions = ["Breakfast", "Dinner", "Snack", "Dessert"];
const weightGoalOptions = ["Lose", "Maintain", "Gain"];
const skillLevelOptions = ["Beginner", "Intermediate", "Advanced"];
const dietOptions = [
  "Vegetarian",
  "Non Vegeterian",
  "Eggetarian",
  "Vegan",
  "Diabetic Friendly",
  "High Protein Vegetarian",
  "High Protein Non Vegetarian",
  "Gluten Free",
  "No Onion No Garlic (Sattvic)",
  "Sugar Free Diet",
];

function RecipeForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height_cm: "",
      weight_kg: "",
      desired_ingredients: "",
      user_allergies: "",
      weight_goal: "Maintain",
      diet_preference: "Vegetarian",
      skill_level: "Intermediate",
      pantry_ingredients: "",
    },
  });

  const mutation = useMutation({
    mutationFn: recommendRecipes,
    onSuccess: (data) => {
      toast.success("Recipes generated successfully! 🎉");
      // Store the initial paginated response and the form values used to get it
      queryClient.setQueryData(["recommendationResponse"], data);
      queryClient.setQueryData(["lastRequest"], form.getValues());
      router.push("/recipes");
      form.reset();
    },
    onError: (error) => {
      toast.error("Error submitting form. Please try again.");
      console.error("Error submitting form:", error);
    },
  });

  function onSubmit(values: RecipeFormValues) {
    // Always fetch the first page on a new submission
    mutation.mutate({ ...values, page: 1 });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Height and Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="height_cm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 175"
                    {...field}
                    value={
                      typeof field.value === "number" ||
                      typeof field.value === "string"
                        ? field.value
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight_kg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 70"
                    {...field}
                    value={
                      typeof field.value === "number" ||
                      typeof field.value === "string"
                        ? field.value
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ingredients and Allergies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="desired_ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Ingredients</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Paneer, Tofu" {...field} />
                </FormControl>
                <FormDescription>Separate with commas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allergies (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Peanuts, Gluten" {...field} />
                </FormControl>
                <FormDescription>Ingredients to avoid.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="meal_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a meal type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mealTypeOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight_goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight Goal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {weightGoalOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diet_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diet Preference</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diet preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dietOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* New Advanced Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="skill_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooking Skill (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {skillLevelOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pantry_ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients You Have (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., rice, onion, garlic" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Generating..." : "Generate Recipes"}
        </Button>
      </form>
    </Form>
  );
}

export default function RecipeGenerator() {
  return (
    <div className="max-w-3xl mx-auto py-12 md:py-14 mb-20 mt-20 md:mt-24">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Discover Recipes</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to get personalized recipe ideas.
        </p>
      </div>
      <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-xl shadow-md border border-neutral-200">
        <RecipeForm />
      </div>
    </div>
  );
}
