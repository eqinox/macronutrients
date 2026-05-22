import { formatFoodSearchMacros } from "@/lib/format-food-macros";
import type { FoodData } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function FoodMacroSummary({
    food,
    className,
}: {
    food: FoodData;
    className?: string;
}) {
    return (
        <span className={cn("text-xs text-muted-foreground", className)}>
            {formatFoodSearchMacros(food)}
        </span>
    );
}
