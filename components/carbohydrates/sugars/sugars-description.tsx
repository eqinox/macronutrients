import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import MonosaccharidesDescription from "./monosaccharides-description";
import DisaccharidesDescription from "./disaccharides-description";

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
                <DialogTitle>
                    <DialogContent>
                        <MonosaccharidesDescription />
                    </DialogContent>
                </DialogTitle>
            </Dialog>

            <Dialog open={disaccharidesOpen} onOpenChange={(open) => !open && setDisaccharidesOpen(false)}>
                <DialogTitle>
                    <DialogContent>
                        <DisaccharidesDescription />
                    </DialogContent>
                </DialogTitle>
            </Dialog>
        </Card>
    )
}