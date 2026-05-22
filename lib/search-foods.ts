import { allFoods } from "@/data/foods";
import type { FoodData } from "@/lib/types";

const MIN_QUERY_LENGTH = 2;

function normalize(text: string): string {
    return text.toLocaleLowerCase("bg").trim();
}

function foodSearchText(food: FoodData): string {
    return [food.name, ...(food.searchTerms ?? [])].join(" ").toLocaleLowerCase("bg");
}

function matchesFoodQuery(food: FoodData, q: string): boolean {
    const words = q.split(/\s+/).filter(Boolean);
    const haystack = foodSearchText(food);
    return words.every((word) => haystack.includes(word));
}

export function searchFoods(query: string): FoodData[] {
    const q = normalize(query);
    if (q.length < MIN_QUERY_LENGTH) return [];
    return allFoods.filter((food) => matchesFoodQuery(food, q));
}

export function searchFoodsInList(foods: FoodData[], query: string): FoodData[] {
    const q = normalize(query);
    if (q.length < MIN_QUERY_LENGTH) return foods;
    return foods.filter((food) => matchesFoodQuery(food, q));
}

export function getMinSearchLength(): number {
    return MIN_QUERY_LENGTH;
}
