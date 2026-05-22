import type { FoodData } from "@/lib/types";

export const KCAL_PER_G_PROTEIN = 4;
export const KCAL_PER_G_CARBS = 4;
export const KCAL_PER_G_FAT = 9;

export type MacroKind = "protein" | "carbs" | "fats";

export function kcalFromMacroGrams(grams: number, kind: MacroKind): number {
    const perGram =
        kind === "fats"
            ? KCAL_PER_G_FAT
            : kind === "carbs"
              ? KCAL_PER_G_CARBS
              : KCAL_PER_G_PROTEIN;
    return Math.round(grams * perGram);
}

const MACRO_LABEL_BG: Record<MacroKind, string> = {
    protein: "протеин",
    carbs: "въглехидрати",
    fats: "мазнини",
};

/** e.g. „12.6 г протеин (~50 kcal)“ */
export function formatMacroWithKcal(grams: number, kind: MacroKind): string {
    return `${grams} г ${MACRO_LABEL_BG[kind]} (~${kcalFromMacroGrams(grams, kind)} kcal)`;
}

/** e.g. „12.6 г (~50 kcal)“ – за редове „Протеин: …“ */
export function formatMacroGramsWithKcal(grams: number, kind: MacroKind): string {
    return `${grams} г (~${kcalFromMacroGrams(grams, kind)} kcal)`;
}

/** Един ред за търсачки: макроси + общи калории. */
export function formatFoodSearchMacros(food: FoodData): string {
    const parts = [
        formatMacroWithKcal(food.protein, "protein"),
        formatMacroWithKcal(food.fats, "fats"),
        formatMacroWithKcal(food.carbs, "carbs"),
        `общо ${food.calories} kcal`,
    ];
    return parts.join(" · ");
}
