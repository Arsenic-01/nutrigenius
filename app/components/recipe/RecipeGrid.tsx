import { DialogTrigger } from "../ui/Dialog";
import { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({
  recipes,
  onSelect,
}: {
  recipes: Recipe[];
  onSelect: (r: Recipe) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {recipes.map((recipe) => (
        <DialogTrigger asChild key={recipe.id}>
          <div onClick={() => onSelect(recipe)}>
            <RecipeCard recipe={recipe} onClick={() => onSelect(recipe)} />
          </div>
        </DialogTrigger>
      ))}
    </div>
  );
}
