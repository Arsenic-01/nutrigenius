"use client";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/Checkbox";

export function CuisineFilter({
  cuisines,
  selected,
  onChange,
}: {
  cuisines: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-fit">
          Cuisine ({selected.length || "All"})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 max-h-72 overflow-y-auto">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Cuisine</h4>
          <p className="text-sm text-muted-foreground">
            Select preferred cuisines.
          </p>
          <div className="space-y-2 pt-2">
            {cuisines.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox
                  id={cuisine}
                  checked={selected.includes(cuisine)}
                  onCheckedChange={(checked) => {
                    onChange(
                      checked
                        ? [...selected, cuisine]
                        : selected.filter((c) => c !== cuisine)
                    );
                  }}
                />
                <Label htmlFor={cuisine}>{cuisine}</Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
