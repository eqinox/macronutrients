import { createElementView } from "@/lib/create-element-view";
import {
    cholesterol,
    monounsaturatedFat,
    omega3,
    polyunsaturatedFat,
    saturatedFat,
} from "@/data/fat-elements";
import {
    ghrelin,
    glucagon,
    growthHormone,
    insulin,
    leptin,
    melatonin,
    testosterone,
    thyroidHormones,
} from "@/data/hormone-elements";
import {
    calcium,
    iron,
    magnesium,
    phosphorus,
    potassium,
    selenium,
    sodium,
    vitaminA,
    vitaminB1,
    vitaminB12,
    vitaminB2,
    vitaminB3,
    vitaminB5,
    vitaminB6,
    vitaminE,
    vitaminK,
    zinc,
} from "@/data/micronutrient-elements";
import type { ComponentType } from "react";
import type { ElementId } from "@/lib/types";

type FoodElementView = ComponentType<Record<string, never>>;

export const FoodVitaminMap: Partial<Record<ElementId, FoodElementView>> = {
    vitaminA: createElementView(vitaminA),
    vitaminB1: createElementView(vitaminB1),
    vitaminB2: createElementView(vitaminB2),
    vitaminB3: createElementView(vitaminB3),
    vitaminB5: createElementView(vitaminB5),
    vitaminB6: createElementView(vitaminB6),
    vitaminB12: createElementView(vitaminB12),
    vitaminE: createElementView(vitaminE),
    vitaminK: createElementView(vitaminK),
};

export const FoodMineralMap: Partial<Record<ElementId, FoodElementView>> = {
    calcium: createElementView(calcium),
    phosphorus: createElementView(phosphorus),
    potassium: createElementView(potassium),
    magnesium: createElementView(magnesium),
    sodium: createElementView(sodium),
    zinc: createElementView(zinc),
    selenium: createElementView(selenium),
    iron: createElementView(iron),
};

export const FoodFatMap: Partial<Record<ElementId, FoodElementView>> = {
    saturatedFat: createElementView(saturatedFat),
    monounsaturatedFat: createElementView(monounsaturatedFat),
    polyunsaturatedFat: createElementView(polyunsaturatedFat),
    omega3: createElementView(omega3),
    cholesterol: createElementView(cholesterol),
};

export const FoodHormoneMap: Partial<Record<ElementId, FoodElementView>> = {
    insulin: createElementView(insulin),
    glucagon: createElementView(glucagon),
    growthHormone: createElementView(growthHormone),
    testosterone: createElementView(testosterone),
    thyroidHormones: createElementView(thyroidHormones),
    leptin: createElementView(leptin),
    ghrelin: createElementView(ghrelin),
    melatonin: createElementView(melatonin),
};
