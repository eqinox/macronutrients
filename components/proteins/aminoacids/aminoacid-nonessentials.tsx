import { EssentialAminoAcids, NonEssentialAminoAcids } from "@/lib/enums/aminoAcids";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Dialog, DialogContent } from "../../ui/dialog";
import { AminoMap } from "@/lib/aminoAcidMappings";
import { useState } from "react";

export default function AminoacidNonEssentials() {
    const [selectedAminoAcid, setSelectedAminoAcid] = useState<keyof typeof NonEssentialAminoAcids | null>(null);

    const handleAminoacidNonEssentialClick = (aminoAcid: keyof typeof NonEssentialAminoAcids) => {
        setSelectedAminoAcid(aminoAcid);
    }

    const ActiveAminoModal = selectedAminoAcid ? AminoMap[selectedAminoAcid] : null;

    const aminoAcids = Object.entries(NonEssentialAminoAcids) as Array<[keyof typeof NonEssentialAminoAcids, string]>;


    return (
        <Card>
            <CardHeader>
                <CardTitle>Заменими аминокиселини</CardTitle>
                <CardDescription>това са аминокиселини, които тялото може да си произведе само, стига да има достатъчно азот, витамини и енергия</CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    {aminoAcids.map(([key, name]) => (
                        <li onClick={() => handleAminoacidNonEssentialClick(key)} key={key} className="cursor-pointer hover:underline">
                            {name}
                        </li>
                    ))}
                </ul>
            </CardContent>

            <Dialog open={!!selectedAminoAcid} onOpenChange={(open) => !open && setSelectedAminoAcid(null)}>
                <DialogContent
                    title={selectedAminoAcid ? NonEssentialAminoAcids[selectedAminoAcid] : "Аминокиселина"}
                    className=""
                >
                    {ActiveAminoModal ? <ActiveAminoModal /> : null}
                </DialogContent>
            </Dialog>
        </Card>
    )
}