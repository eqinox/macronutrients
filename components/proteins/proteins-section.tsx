"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import Food from "../food";
import Details from "../details";
import AminoacidDescription from "./aminoacids/aminoacid-description";
import { FoodData } from "@/lib/types";
import { proteinFoods } from "@/data/proteins";

export default function ProteinsSection() {
    const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);
    const [isAminoOpen, setIsAminoOpen] = useState(false);

    const handleProteinsClick = () => {
        setIsAminoOpen(true);
    }

    return (
        <>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle className="cursor-pointer hover:underline" onClick={() => handleProteinsClick()}>
                        Протеини
                    </CardTitle>
                    <CardDescription>
                        <ul>
                            <li>
                                Изграждат мускули и тъкани
                            </li>
                            <li>
                                Възстановяват след натоварване
                            </li>
                            <li>
                                Участват в хормони и ензими
                            </li>
                        </ul>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    Храни и какво ти дават
                    <ul>
                        {proteinFoods.map(food => <Food key={food.name} food={food} onSelect={setSelectedFood} />)}
                    </ul>
                </CardContent>
            </Card>

            <Dialog open={!!selectedFood} onOpenChange={(open) => !open && setSelectedFood(null)}>
                <DialogContent
                    title={selectedFood ? `${selectedFood.name} - Детайли` : "Детайли"}
                >
                    {selectedFood && <Details food={selectedFood} />}
                </DialogContent>
            </Dialog>

            <Dialog open={isAminoOpen} onOpenChange={setIsAminoOpen}>
                <DialogContent title="Аминокиселини">
                    <AminoacidDescription />
                </DialogContent>
            </Dialog>
        </>
    );
}