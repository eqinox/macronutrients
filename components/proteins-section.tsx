"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { EssentialAminoAcids, NonEssentialAminoAcids } from "@/lib/enums/aminoAcids";
import Food from "./food";
import Details from "./details";
import AminoacidDescription from "./aminoacids/aminoacid-description";

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

const foods: FoodData[] = [
    {
        name: 'Пилешко филе на тиган',
        protein: 31,
        fats: 3.5,
        carbs: 0,
        calories: 170,
        aminoAcids: {
            essential: {
                Leucine: 2.17,
                Isoleucine: 1.53,
                Valine: 1.44,
                Lysine: 2.46,
                Methionine: 0.80,
                Phenylalanine: 1.15,
                Threonine: 1.22,
                Tryptophan: 0.34,
                Histidine: 0.90
            },
            nonEssential: {
                GlutamicAcid: 4.33,
                AsparticAcid: 2.58,
                Alanine: 1.58,
                Arginine: 1.75,
                Glycine: 1.42,
                Proline: 1.19,
                Serine: 1.00,
                Tyrosine: 0.98,
                Cysteine: 0.37
            }
        },
        vitamins: {
            'B3 (ниацин)': '14.8 mg',
            'B6 (пиридоксин)': '0.6 mg',
            'B5 (пантотенова киселина)': '1.0 mg',
            'B2 (рибофлавин)': '0.1 mg',
            'B1 (тиамин)': '0.07 mg',
            'B12': '0.3 µg',
            'Холин (B4)': '65 mg',
            'A': '13 IU',
            'E': '0.3 mg',
            'K': '0.3 µg'
        },
        minerals: {
            'Фосфор': '200 mg',
            'Калий': '250 mg',
            'Магнезий': '25 mg',
            'Цинк': '1 mg',
            'Селен': '25 μg',
            'Желязо': '1 mg'
        }
    },
];

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
                    <CardTitle onClick={() => handleProteinsClick()}>
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
                        {foods.map(food => <Food key={food.name} food={food} onSelect={setSelectedFood} />)}
                    </ul>
                </CardContent>
            </Card>

            <Dialog open={!!selectedFood} onOpenChange={(open) => !open && setSelectedFood(null)}>
                <DialogTitle className="w-xl">
                    <DialogContent className="w-xl " >
                        {selectedFood && <Details food={selectedFood} />}
                    </DialogContent>
                </DialogTitle>
            </Dialog>

            <Dialog open={isAminoOpen} onOpenChange={setIsAminoOpen}>
                <DialogTitle>
                    <DialogContent className="w-xl">
                        <AminoacidDescription />
                    </DialogContent>
                </DialogTitle>
            </Dialog>
        </>
    );
}