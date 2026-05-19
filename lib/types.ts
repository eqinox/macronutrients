import { EssentialAminoAcids, NonEssentialAminoAcids } from "./enums/aminoAcids";

export interface FoodData {
    name: string;
    protein: number;
    fats: number;
    carbs: number;
    calories: number;
    aminoAcids: {
        essential: Partial<Record<keyof typeof EssentialAminoAcids, number>>;
        nonEssential: Partial<Record<keyof typeof NonEssentialAminoAcids, number>>;
    };
    vitamins: Record<string, string>;
    minerals: Record<string, string>;
}

/** Key in `elementRegistry` for glossary / linked terms (e.g. glycemicIndex). */
export type ElementId = string;

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