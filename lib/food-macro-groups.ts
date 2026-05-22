import type { FoodData } from "@/lib/types";

export const MACRO_FOODS_PAGE_SIZE = 10;

export type PredominantMacro = "protein" | "carbs" | "fats";

/** Най-много калории от съответния макронутриент (4/4/9 kcal на грам). */
export function getPredominantMacro(food: FoodData): PredominantMacro {
    const fromProtein = food.protein * 4;
    const fromCarbs = food.carbs * 4;
    const fromFats = food.fats * 9;

    if (fromProtein >= fromCarbs && fromProtein >= fromFats) return "protein";
    if (fromCarbs >= fromFats) return "carbs";
    return "fats";
}

export function partitionFoodsByPredominantMacro(foods: FoodData[]) {
    const protein: FoodData[] = [];
    const carbs: FoodData[] = [];
    const fats: FoodData[] = [];

    for (const food of foods) {
        const macro = getPredominantMacro(food);
        if (macro === "protein") protein.push(food);
        else if (macro === "carbs") carbs.push(food);
        else fats.push(food);
    }

    return { protein, carbs, fats };
}
