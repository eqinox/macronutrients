import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { EssentialAminoAcids } from "../../../lib/enums/aminoAcids";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { AminoMap } from "@/lib/aminoAcidMappings";
import { useState } from "react";

export default function AminoacidEssentials() {
    const [selectedAminoAcid, setSelectedAminoAcid] = useState<keyof typeof EssentialAminoAcids | null>(null);

    const handleAminoacidEssentialClick = (aminoAcid: keyof typeof EssentialAminoAcids) => {
        setSelectedAminoAcid(aminoAcid);
    }

    const ActiveAminoModal = selectedAminoAcid ? AminoMap[selectedAminoAcid] : null;
    const aminoAcids = Object.entries(EssentialAminoAcids) as Array<[keyof typeof EssentialAminoAcids, string]>;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Незаменими аминокиселини</CardTitle>
                <CardDescription>Това са аминокиселини, които тялото не може да синтезира само и трябва да ги получаваш чрез храната</CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    {aminoAcids.map(([key, name]) => (
                        <li onClick={() => handleAminoacidEssentialClick(key)} key={key} className="cursor-pointer hover:underline">
                            {name}
                        </li>
                    ))}
                </ul>
            </CardContent>

            <Dialog open={!!selectedAminoAcid} onOpenChange={(open) => !open && setSelectedAminoAcid(null)}>
                <DialogTitle>
                    <DialogContent className="">
                        {ActiveAminoModal ? <ActiveAminoModal /> : null}
                    </DialogContent>
                </DialogTitle>
            </Dialog>
        </Card>
    )
}