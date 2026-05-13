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