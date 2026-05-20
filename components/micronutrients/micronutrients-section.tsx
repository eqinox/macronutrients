"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import MicronutrientsDescription from "./micronutrients-description";

export default function MicronutrientsSection() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle
                        className="cursor-pointer hover:underline"
                        onClick={() => setIsOpen(true)}
                    >
                        Микронутриенти
                    </CardTitle>
                    <CardDescription>
                        <ul>
                            <li>Витамини и минерали в малки, но ключови дози</li>
                            <li>Поддържат имунитет, енергия, кости и нерви</li>
                            <li>Идват основно от цялостна, разнообразна храна</li>
                        </ul>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Кликни върху заглавието за всички 13 витамина и 17
                        минерала с подробни обяснения.
                    </p>
                </CardContent>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent title="Микронутриенти">
                    <MicronutrientsDescription />
                </DialogContent>
            </Dialog>
        </>
    );
}
