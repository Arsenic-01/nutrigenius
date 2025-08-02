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
import { Slider } from "../components/ui/Slider";

import { useMutation, useQueryClient } from "@tanstack/react-query";
const formSchema = z.object({
  height: z.coerce.number().positive("Height must be a positive number."),
  weight: z.coerce.number().positive("Weight must be a positive number."),
  requiredIngredient: z
    .string()
    .min(1, "A required ingredient must be entered."),
  allergicIngredient: z.string().optional(),
  estimatedTime: z.number(),
  numResults: z.coerce
    .number()
    .min(1, "Please enter at least 1 result.")
    .max(50, "Please enter no more than 50 results."),
});

type RecipeFormValues = z.infer<typeof formSchema>;

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
}

interface ApiRecommendResponse {
  recipes: Recipe[];
}

const recommendRecipes = async (
  values: RecipeFormValues
): Promise<ApiRecommendResponse> => {
  const cleanedValues = {
    ...values,
    allergicIngredient: values.allergicIngredient || undefined,
  };

  const response = await fetch("http://127.0.0.1:8000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleanedValues),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const timeValues = [
  45, 15, 50, 30, 40, 25, 120, 55, 20, 35, 60, 65, 90, 10, 70, 75, 51, 80, 135,
  100, 180, 160, 540, 63, 380, 600, 85, 18, 110, 265, 205, 150, 360, 495, 175,
  440, 220, 230, 190, 410, 370, 5, 550, 200, 130, 105, 235, 300, 290, 22, 165,
  46, 280, 140, 620, 155, 250, 145, 270, 95, 960, 430, 390, 330, 610, 545, 7,
  420, 320, 480, 17, 315, 47, 24, 195, 225, 28, 42, 800, 570, 405, 580, 170,
  435, 375, 48, 16, 71, 27, 500, 525, 510, 305, 76, 68, 260, 515, 52, 149, 185,
  445, 12, 539, 765, 630, 400, 115, 980, 62, 11, 210, 255, 240, 125, 4, 54, 335,
  29, 560, 565, 340, 460, 13, 530, 79, 67, 795, 455, 285, 89, 258, 53, 425,
  2925, 350, 520, 69, 365, 38, 505, 740, 920, 215, 830, 345, 535, 37, 73, 415,
  0, 450, 720, 325, 730, 245, 1440, 31, 395, 310, 34, 58,
];
const sortedTimeValues = [...timeValues].sort((a, b) => a - b);

function RecipeForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: 175,
      weight: 70,
      requiredIngredient: "",
      allergicIngredient: "",
      numResults: 10,
      estimatedTime: sortedTimeValues.includes(30) ? 30 : sortedTimeValues[0],
    },
  });

  const watchedTime = form.watch("estimatedTime");

  const mutation = useMutation({
    mutationFn: recommendRecipes,
    onSuccess: (data) => {
      toast.success("Recipes generated successfully! 🎉");
      queryClient.setQueryData(["recipes"], data.recipes);
      console.log("Data set to recipes", data.recipes);

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
            name="height"
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
                <FormDescription>
                  Enter your height in centimeters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
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
                <FormDescription>
                  Enter your weight in kilograms.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="requiredIngredient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Ingredient</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Paneer, Tofu, Broccoli" {...field} />
              </FormControl>
              <FormDescription>
                The main ingredient you want in your meal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allergicIngredient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergic Ingredient (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Peanuts, Brocoli, Gluten"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Any ingredients you are allergic to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Cooking Time</FormLabel>
              <FormControl>
                <div>
                  <div className="flex flex-col md:flex-row my-2 justify-between items-start md:items-center mb-2">
                    <FormDescription>
                      Slide to select the maximum cooking time.
                    </FormDescription>
                    <span className="font-semibold text-primary text-lg">
                      {watchedTime} min
                    </span>
                  </div>
                  <Slider
                    value={[sortedTimeValues.indexOf(field.value)]}
                    onValueChange={(value) =>
                      field.onChange(sortedTimeValues[value[0]])
                    }
                    min={0}
                    max={sortedTimeValues.length - 1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numResults"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Results</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="1-50"
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
                How many recipe suggestions do you want? (1-50)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 4. Disable the button and show a loading state while the mutation is pending. */}
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
