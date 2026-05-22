"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import MacroFoodsDialog from "@/components/macro-foods-dialog";
import { carbPredominantFoods } from "@/data/foods";
import CarbohydratesDescription from "./carbohydrates-description";

export default function CarbohydratesSection() {
    const [isSugarsOpen, setIsSugarsOpen] = useState(false);

    const handleCarbohydratesClick = () => {
        setIsSugarsOpen(true);
    }

    return (
        <>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle className="cursor-pointer hover:underline" onClick={() => handleCarbohydratesClick()}>
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
                    <MacroFoodsDialog
                        buttonLabel="Храни с преобладаващи въглехидрати"
                        dialogTitle="Храни с преобладаващи въглехидрати"
                        foods={carbPredominantFoods}
                    />
                </CardContent>
            </Card>

            <Dialog open={isSugarsOpen} onOpenChange={setIsSugarsOpen}>
                <DialogContent title="Въглехидрати">
                    <CarbohydratesDescription />
                </DialogContent>
            </Dialog>
        </>
    );
}