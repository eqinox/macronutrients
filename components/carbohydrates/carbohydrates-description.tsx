import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import SugarsDescription from "./sugars/sugars-description";
import StarchesDescription from "./starches/starches-description";
import FibersDescription from "./fibers/fibers-description";

export default function CarbohydratesDescription() {
    const [sugarsOpen, setSugarsOpen] = useState(false);
    const [starchOpen, setStarchOpen] = useState(false);
    const [fibersOpen, setFibersOpen] = useState(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Въглехидрати</CardTitle>
                <CardDescription>
                    Основният източник на енергия в храненето. Разделят се на
                    захари (прости), нишестета (сложни) и фибри (неусвоими).
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-2 text-muted-foreground">
                    Избери категория, за да видиш подробности:
                </p>
                <ul>
                    <li
                        className="cursor-pointer hover:underline"
                        onClick={() => setSugarsOpen(true)}
                    >
                        Захари (прости въглехидрати)
                    </li>
                    <li
                        className="cursor-pointer hover:underline"
                        onClick={() => setStarchOpen(true)}
                    >
                        Нишестета (сложни въглехидрати)
                    </li>
                    <li
                        className="cursor-pointer hover:underline"
                        onClick={() => setFibersOpen(true)}
                    >
                        Фибри
                    </li>
                </ul>
            </CardContent>

            <Dialog
                open={sugarsOpen}
                onOpenChange={(open) => !open && setSugarsOpen(false)}
            >
                <DialogContent title="Захари">
                    <SugarsDescription />
                </DialogContent>
            </Dialog>

            <Dialog
                open={starchOpen}
                onOpenChange={(open) => !open && setStarchOpen(false)}
            >
                <DialogContent title="Нишестета">
                    <StarchesDescription />
                </DialogContent>
            </Dialog>

            <Dialog
                open={fibersOpen}
                onOpenChange={(open) => !open && setFibersOpen(false)}
            >
                <DialogContent title="Фибри">
                    <FibersDescription />
                </DialogContent>
            </Dialog>
        </Card>
    );
}
