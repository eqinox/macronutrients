import { EssentialAminoAcids, NonEssentialAminoAcids } from "./enums/aminoAcids";

/** Key in `elementRegistry` for glossary / linked terms (e.g. glycemicIndex). */
export type ElementId = string;

export interface FoodNutrientEntry {
    /** Registry id for glossary dialogs (e.g. vitaminB6, insulin). */
    termId: ElementId;
    label: string;
    amount: string;
}

export interface FoodFatEntry {
    termId: ElementId;
    label: string;
    /** Grams per serving (see food `portionLabel`), when known. */
    grams?: number;
    /** Extra detail (e.g. cholesterol in mg). */
    amount?: string;
}

export interface FoodHormoneInfluence {
    termId: ElementId;
    label: string;
    effect: string;
}

/** UI label for the serving all numbers refer to, e.g. „на 100 г“, „на 1 бр. (~58 g)“. */
export const FOOD_PORTION_PER_100G = "на 100 г" as const;

export interface FoodData {
    name: string;
    /** Shown in headings – must match how protein, fats, etc. are stored. */
    portionLabel?: string;
    /** Extra words for search (e.g. „пиле“, „яйца“). */
    searchTerms?: string[];
    protein: number;
    fats: number;
    carbs: number;
    calories: number;
    /** Short overview of what this food provides in the body. */
    summary: string;
    aminoAcids: {
        essential: Partial<Record<keyof typeof EssentialAminoAcids, number>>;
        nonEssential: Partial<Record<keyof typeof NonEssentialAminoAcids, number>>;
    };
    fatBreakdown: FoodFatEntry[];
    vitamins: FoodNutrientEntry[];
    minerals: FoodNutrientEntry[];
    hormoneInfluence: FoodHormoneInfluence[];
}

export interface Element {
    name: string;
    description: string;
    properties: {
        action: string;
        itemsAboutAction: {
            startingPhrase: string;
            /** When set, the starting phrase opens this term in a dialog. */
            termId?: ElementId;
            description: string;
        }[];
    }[];
}