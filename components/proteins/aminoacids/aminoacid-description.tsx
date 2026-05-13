import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
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
                <DialogTitle>
                    <DialogContent>
                        <AminoacidEssentials />
                    </DialogContent>
                </DialogTitle>
            </Dialog>
            <Dialog open={nonEssentialsOpen} onOpenChange={(open) => !open && setNonEssentialsOpen(false)}>
                <DialogTitle>
                    <DialogContent>
                        <AminoacidNonEssentials />
                    </DialogContent>
                </DialogTitle>
            </Dialog>
        </Card>
    );
}