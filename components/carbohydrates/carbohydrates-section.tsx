"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import Food from "../food";
import Details from "../details";
import { FoodData } from "@/lib/types";
import { proteinFoods } from "@/data/proteins";
import CarbohydratesDescription from "./carbohydrates-description";

export default function CarbohydratesSection() {
    const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);
    const [isSugarsOpen, setIsSugarsOpen] = useState(false);

    const handleCarbohydratesClick = () => {
        setIsSugarsOpen(true);
    }

    return (
        <>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle className="cursor-pointer hover:udnerline" onClick={() => handleCarbohydratesClick()}>
                        Въглехидрати
                    </CardTitle>
                    <CardDescription>
                        <ul>
                            <li>
                                Роля: основен източник на енергия
                            </li>
                            <li>
                                Мозъкът работи най-добре с тях
                            </li>
                            <li>
                                Излишъкът се складира като мазнини
                            </li>
                        </ul>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Храни и какво ти дават
                    <ul>
                        {proteinFoods.map(food => <Food key={food.name} food={food} onSelect={setSelectedFood} />)}
                    </ul> */}
                </CardContent>
            </Card>

            <Dialog open={!!selectedFood} onOpenChange={(open) => !open && setSelectedFood(null)}>
                <DialogContent
                    title={selectedFood ? `${selectedFood.name} - Детайли` : "Детайли"}
                    className="w-xl"
                >
                    {selectedFood && <Details food={selectedFood} />}
                </DialogContent>
            </Dialog>

            <Dialog open={isSugarsOpen} onOpenChange={setIsSugarsOpen}>
                <DialogContent title="Въглехидрати" className="w-xl">
                    <CarbohydratesDescription />
                </DialogContent>
            </Dialog>
        </>
    );
}