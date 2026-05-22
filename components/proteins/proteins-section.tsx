"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import MacroFoodsDialog from "@/components/macro-foods-dialog";
import { proteinPredominantFoods } from "@/data/foods";
import AminoacidDescription from "./aminoacids/aminoacid-description";

export default function ProteinsSection() {
    const [isAminoOpen, setIsAminoOpen] = useState(false);

    return (
        <>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle
                        className="cursor-pointer hover:underline"
                        onClick={() => setIsAminoOpen(true)}
                    >
                        Протеини
                    </CardTitle>
                    <CardDescription>
                        <ul>
                            <li>Изграждат мускули и тъкани</li>
                            <li>Възстановяват след натоварване</li>
                            <li>Участват в хормони и ензими</li>
                        </ul>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">
                        Кликни заглавието за обяснение на протеините. За конкретни
                        храни използвай търсачката отгоре.
                    </p>
                    <MacroFoodsDialog
                        buttonLabel="Храни с преобладаващи протеини"
                        dialogTitle="Храни с преобладаващи протеини"
                        foods={proteinPredominantFoods}
                    />
                </CardContent>
            </Card>

            <Dialog open={isAminoOpen} onOpenChange={setIsAminoOpen}>
                <DialogContent title="Аминокиселини">
                    <AminoacidDescription />
                </DialogContent>
            </Dialog>
        </>
    );
}
