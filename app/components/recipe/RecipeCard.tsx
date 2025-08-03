import Image from "next/image";
import { Clock, Tag, Users, Zap } from "lucide-react";
import { Recipe } from "@/types";
import Card from "../ui/Card";

export default function RecipeCard({
  recipe,
  onClick,
}: {
  recipe: Recipe;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={() => onClick}
      className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      <Image
        src={recipe.image}
        alt={recipe.RecipeName}
        className="w-full h-48 object-cover select-none pointer-events-none"
        width={400}
        height={200}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-slate-800 mb-3">
          {recipe.RecipeName}
        </h2>
        <div className="space-y-3 mt-auto pt-4 border-t border-slate-200">
          {recipe.Cuisine && (
            <div className="flex items-center text-sm text-slate-600">
              <Tag className="w-4 h-4 mr-2 text-sky-600" />
              <span>{recipe.Cuisine}</span>
            </div>
          )}
          {recipe.Diet && (
            <div className="flex items-center text-sm text-slate-600">
              <Zap className="w-4 h-4 mr-2 text-amber-600" />
              <span>{recipe.Diet}</span>
            </div>
          )}
          {recipe.TotalTimeInMins && (
            <div className="flex items-center text-sm text-slate-600">
              <Clock className="w-4 h-4 mr-2 text-slate-500" />
              <span>{recipe.TotalTimeInMins} minutes</span>
            </div>
          )}
          {recipe.Servings && (
            <div className="flex items-center text-sm text-slate-600">
              <Users className="w-4 h-4 mr-2 text-slate-500" />
              <span>{recipe.Servings} people</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
