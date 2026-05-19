import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

import DisaccharidesDescription from "./disaccharides-description";
import MonosaccharidesDescription from "./monosacharides/monosaccharides-description";

export default function SugarsDescription() {
    const [monosaccharidesOpen, setMonosaccharidesOpen] = useState(false);
    const [disaccharidesOpen, setDisaccharidesOpen] = useState(false);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Захари (прости въглехидрати)</CardTitle>
                <CardDescription>
                    Делят се на монозахариди и дизахариди
                </CardDescription>
                <CardContent>
                    <ul>
                        <li className="cursor-pointer hover:underline" onClick={() => setMonosaccharidesOpen(true)}>
                            Монозахариди
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setDisaccharidesOpen(true)}>
                            Дизахариди
                        </li>
                    </ul>
                </CardContent>
            </CardHeader>

            <Dialog open={monosaccharidesOpen} onOpenChange={(open) => !open && setMonosaccharidesOpen(false)}>
                <DialogContent title="Монозахариди">
                    <MonosaccharidesDescription />
                </DialogContent>
            </Dialog>

            <Dialog open={disaccharidesOpen} onOpenChange={(open) => !open && setDisaccharidesOpen(false)}>
                <DialogContent title="Дизахариди">
                    <DisaccharidesDescription />
                </DialogContent>
            </Dialog>
        </Card>
    )
}