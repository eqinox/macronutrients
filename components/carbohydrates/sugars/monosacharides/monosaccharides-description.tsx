import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import Glucose from "./glucose";
import Fructose from "./fructose";

export default function MonosaccharidesDescription() {
    const [glucoseOpen, setGlucoseOpen] = useState(false);
    const [fructoseOpen, setFructoseOpen] = useState(false);

    const handleGlucoseClick = () => {
        setGlucoseOpen(true);
    };

    const handleFructoseClick = () => { 
        setFructoseOpen(true);
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Монозахариди</CardTitle>
                <CardDescription>
                    <ul>
                        <li>
                            Това са единични захарни молекули
                        </li>
                        <li>
                            Тялото ги абсорбира директно в кръвта
                        </li>
                    </ul>
                </CardDescription>
                <CardContent>
                    <ul>
                        <li className="cursor-pointer hover:underline" onClick={() => handleGlucoseClick()}>Глюкоза</li>
                        <li className="cursor-pointer hover:underline" onClick={() => handleFructoseClick()}>Фруктоза</li>
                        <li className="cursor-pointer hover:underline">Галактоза</li>
                    </ul>
                </CardContent>
            </CardHeader>

            <Dialog open={glucoseOpen} onOpenChange={(open) => !open && setGlucoseOpen(false)}>
                <DialogContent title="Глюкоза">
                    <Glucose />
                </DialogContent>
            </Dialog>

            <Dialog open={fructoseOpen} onOpenChange={(open) => !open && setFructoseOpen(false)}>
                <DialogContent title="Фруктоза">
                    <Fructose />
                </DialogContent>
            </Dialog>
        </Card>
    )
}