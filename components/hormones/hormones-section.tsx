"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import HormonesDescription from "./hormones-description";

export default function HormonesSection() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle
                        className="cursor-pointer hover:underline"
                        onClick={() => setIsOpen(true)}
                    >
                        Хормони
                    </CardTitle>
                    <CardDescription>
                        <ul>
                            <li>Химични посълния между жлези и клетки</li>
                            <li>Регулират енергия, растеж, стрес, сън, апетит</li>
                            <li>Малки количества – голям ефект при дисбаланс</li>
                        </ul>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Кликни върху заглавието за видове хормони, жлези и
                        отделни хормони с обяснения за начинаещи.
                    </p>
                </CardContent>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent title="Хормони">
                    <HormonesDescription />
                </DialogContent>
            </Dialog>
        </>
    );
}
