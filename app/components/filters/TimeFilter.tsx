"use client";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { Button } from "../ui/Button";
import { Slider } from "../ui/Slider";

export function TimeFilter({
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
          Time (Max {value} min)
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Max Cooking Time</h4>
          <p className="text-sm text-muted-foreground">Set a max total time.</p>
          <Slider
            value={[value]}
            max={max}
            step={15}
            onValueChange={(val) => onChange(val[0])}
            className="pt-4"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
