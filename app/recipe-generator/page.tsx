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

import { Input } from "../components/ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { apiUrl } from "../constant";

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
}

// The API now returns a direct list of recipes
type ApiRecommendResponse = Recipe[];

const recommendRecipes = async (
  values: RecipeFormValues
): Promise<ApiRecommendResponse> => {
  // Clean up optional values so they are not sent if empty
  const cleanedValues = {
    ...values,
    user_allergies: values.user_allergies || undefined,
    diet_preference: values.diet_preference || undefined,
    max_cooking_time: values.max_cooking_time || undefined,
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
const mealTypeOptions = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const weightGoalOptions = ["Lose", "Maintain", "Gain"];
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
      height_cm: 175,
      weight_kg: 70,
      desired_ingredients: "",
      user_allergies: "",
      meal_type: "Dinner",
      weight_goal: "Maintain",
      diet_preference: "Vegetarian",
    },
  });

  const mutation = useMutation({
    mutationFn: recommendRecipes,
    onSuccess: (data) => {
      toast.success("Recipes generated successfully! 🎉");
      queryClient.setQueryData(["recipes"], data);
      router.push("/recipes");
      form.reset();
    },
    onError: (error) => {
      toast.error("Error submitting form. Please try again.");
      console.error("Error submitting form:", error);
    },
  });

  function onSubmit(values: RecipeFormValues) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="desired_ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Ingredients</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Paneer, Tofu, Broccoli"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The main ingredients you want. Separate with commas.
                </FormDescription>
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
                <FormDescription>
                  Any ingredients you are allergic to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                      <SelectValue placeholder="Select your goal" />
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
                      <SelectValue placeholder="Select a diet" />
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

        <FormField
          control={form.control}
          name="max_cooking_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Cooking Time (mins, Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 45"
                  {...field}
                  value={
                    typeof field.value === "number" ||
                    typeof field.value === "string"
                      ? field.value
                      : ""
                  }
                />
              </FormControl>
              <FormDescription>
                Set a maximum total cooking time for recipes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
    <div className="max-w-3xl mx-auto py-12 md:py-14 mb-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Recipe Generator</h1>
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
