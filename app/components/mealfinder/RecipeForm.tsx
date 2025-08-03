"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "../ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/Form";
import { Input } from "../ui/Input";
import { FormSelectField } from "./FormSelectField";
import { recipeFormSchema, RecipeFormValues } from "@/lib/schema";
import { recommendRecipes } from "@/lib/apis";
import {
  dietOptions,
  mealTypeOptions,
  skillLevelOptions,
  weightGoalOptions,
} from "@/lib/constant";

export function RecipeForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      height_cm: "",
      weight_kg: "",
      desired_ingredients: "",
      user_allergies: "",
      meal_type: "Dinner",
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
    mutation.mutate({ ...values, page: 1 });
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormSelectField
            control={form.control}
            name="meal_type"
            label="Meal Type"
            placeholder="Select a meal type"
            options={mealTypeOptions}
          />
          <FormSelectField
            control={form.control}
            name="weight_goal"
            label="Weight Goal"
            placeholder="Select weight goal"
            options={weightGoalOptions}
          />
          <FormSelectField
            control={form.control}
            name="diet_preference"
            label="Diet Preference"
            placeholder="Select diet preference"
            options={dietOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelectField
            control={form.control}
            name="skill_level"
            label="Cooking Skill (Optional)"
            placeholder="Select skill level"
            options={skillLevelOptions}
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
