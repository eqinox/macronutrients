"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import FatsDescription from "./fats-description";

export default function FatsSection() {
    const [isFatsOpen, setIsFatsOpen] = useState(false);

    return (
        <>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle
                        className="cursor-pointer hover:underline"
                        onClick={() => setIsFatsOpen(true)}
                    >
                        Мазнини
                    </CardTitle>
                    <CardDescription>
                        <ul>
                            <li>9 kcal/г – най-концентрираният макронутриент</li>
                            <li>
                                Нужни за хормони, мембрани и витамини A, D, E, K
                            </li>
                            <li>Качеството и видът на мазнините имат значение</li>
                        </ul>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Кликни върху заглавието, за да видиш видовете мазнини и
                        подробни обяснения.
                    </p>
                </CardContent>
            </Card>

            <Dialog open={isFatsOpen} onOpenChange={setIsFatsOpen}>
                <DialogContent title="Мазнини" className="w-xl">
                    <FatsDescription />
                </DialogContent>
            </Dialog>
        </>
    );
}
