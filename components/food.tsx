"use client";

import type { FoodData } from "@/lib/types";

export default function Food({ food, onSelect }: { food: FoodData; onSelect: (food: FoodData) => void }) {
    const handleClick = () => {
        onSelect(food);
    };

    return (
        <li
            onClick={handleClick}
            className="cursor-pointer rounded-md py-1 hover:bg-accent/50 hover:underline"
        >
            <span className="font-medium">{food.name}</span>
        </li>
    );
}