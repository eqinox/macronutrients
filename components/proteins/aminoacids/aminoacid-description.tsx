import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Dialog, DialogContent } from "../../ui/dialog";
import { useState } from "react";
import AminoacidEssentials from "./aminoacid-essentials";
import AminoacidNonEssentials from "./aminoacid-nonessentials";

export default function AminoacidDescription() {
    const [essentialsOpen, setEssentialsOpen] = useState(false);

    const handleEssentialsClick = () => {
        setEssentialsOpen(true);
    }

    const [nonEssentialsOpen, setNonEssentialsOpen] = useState(false);

    const handleNonEssentialsClick = () => {
        setNonEssentialsOpen(true);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Протеини -Аминокиселини</CardTitle>
                <CardDescription>
                    Протеините се разграждат до аминокиселини
                </CardDescription>
            </CardHeader>
            <CardContent>
                Видове:
                <ul>
                    <li className="cursor-pointer hover:underline" onClick={() => handleEssentialsClick()}>Незаменими</li>
                    <li className="cursor-pointer hover:underline" onClick={() => handleNonEssentialsClick()}>Заменими</li>
                </ul>
            </CardContent>

            <Dialog open={essentialsOpen} onOpenChange={(open) => !open && setEssentialsOpen(false)}>
                <DialogContent title="Незаменими аминокиселини">
                    <AminoacidEssentials />
                </DialogContent>
            </Dialog>
            <Dialog open={nonEssentialsOpen} onOpenChange={(open) => !open && setNonEssentialsOpen(false)}>
                <DialogContent title="Заменими аминокиселини">
                    <AminoacidNonEssentials />
                </DialogContent>
            </Dialog>
        </Card>
    );
}