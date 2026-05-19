import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import SugarsDescription from "./sugars/sugars-description";
import StarchesDescription from "./starches/starches-description";

export default function CarbohydratesDescription() {
    const [sugarsOpen, setSugarsOpen] = useState(false);
    const [starchOpen, setStarchOpen] = useState(false);


    const handleSugarsClick = () => {
        setSugarsOpen(true);
    }

    const handleStarchClick = () => {
        setStarchOpen(true);
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Въглехидрати - захари</CardTitle>
                <CardDescription>
                    Въглехидратите се състоят от захари, нишестета и фибри.
                </CardDescription>
            </CardHeader>
            <CardContent>
                Видове:
                <ul>
                    <li className="cursor-pointer hover:underline" onClick={() => handleSugarsClick()}>Захари (прости въглехидрати)</li>
                    <li className="cursor-pointer hover:underline" onClick={() => handleStarchClick()}>Нишестета</li>
                    <li className="cursor-pointer hover:underline">
                        Фибри
                    </li>
                </ul>
            </CardContent>

            <Dialog open={sugarsOpen} onOpenChange={(open) => !open && setSugarsOpen(false)}>
                <DialogContent title="Захари">
                    <SugarsDescription />
                </DialogContent>
            </Dialog>

            <Dialog open={starchOpen} onOpenChange={(open) => !open && setStarchOpen(false)}>
                <DialogContent title="Нишестета">
                    <StarchesDescription />
                </DialogContent>
            </Dialog>
        </Card>
    )
}