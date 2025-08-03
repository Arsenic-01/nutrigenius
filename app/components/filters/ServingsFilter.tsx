"use client";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { Button } from "../ui/Button";
import { Slider } from "../ui/Slider";

export function ServingsFilter({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (val: number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-fit">
          Servings (Max {value})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Max Servings</h4>
          <p className="text-sm text-muted-foreground">Set max servings.</p>
          <Slider
            value={[value]}
            max={max}
            step={1}
            onValueChange={(val) => onChange(val[0])}
            className="pt-4"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
