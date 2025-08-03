"use client";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/Checkbox";

export function MealTypeFilter({
  mealTypes,
  selected,
  onChange,
}: {
  mealTypes: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-fit">
          Meal Type ({selected.length || "All"})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 max-h-72 overflow-y-auto">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Meal Type</h4>
          <p className="text-sm text-muted-foreground">Select course types.</p>
          <div className="space-y-2 pt-2">
            {mealTypes.map((mealType) => (
              <div key={mealType} className="flex items-center space-x-2">
                <Checkbox
                  id={mealType}
                  checked={selected.includes(mealType)}
                  onCheckedChange={(checked) => {
                    onChange(
                      checked
                        ? [...selected, mealType]
                        : selected.filter((c) => c !== mealType)
                    );
                  }}
                />
                <Label htmlFor={mealType}>{mealType}</Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
