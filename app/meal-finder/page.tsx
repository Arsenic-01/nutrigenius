import { RecipeForm } from "../components/mealfinder/RecipeForm";

export default function RecipeGeneratorPage() {
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
