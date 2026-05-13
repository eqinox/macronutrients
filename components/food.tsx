"use client";

import { EssentialAminoAcids, NonEssentialAminoAcids } from "@/lib/enums/aminoAcids";

interface FoodData {
  name: string;
  protein: number;
  fats: number;
  carbs: number;
  calories: number;
  aminoAcids: {
    essential: Record<keyof typeof EssentialAminoAcids, number>;
    nonEssential: Record<keyof typeof NonEssentialAminoAcids, number>;
  };
  vitamins: Record<string, string>;
  minerals: Record<string, string>;
}

export default function Food({ food, onSelect }: { food: FoodData; onSelect: (food: FoodData) => void }) {
    const handleClick = () => {
        onSelect(food);
    };

    return <li onClick={handleClick} className="cursor-pointer hover:underline">
        {food.name}
    </li>
}