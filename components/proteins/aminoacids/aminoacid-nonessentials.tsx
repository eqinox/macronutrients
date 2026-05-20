import { createElement, useState } from "react";
import { NonEssentialAminoAcids } from "@/lib/enums/aminoAcids";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Dialog, DialogContent } from "../../ui/dialog";
import { AminoMap } from "@/lib/aminoAcidMappings";

export default function AminoacidNonEssentials() {
    const [openAminoAcids, setOpenAminoAcids] = useState<
        Array<keyof typeof NonEssentialAminoAcids>
    >([]);

    const openAminoAcid = (aminoAcid: keyof typeof NonEssentialAminoAcids) => {
        setOpenAminoAcids((prev) =>
            prev.includes(aminoAcid) ? prev : [...prev, aminoAcid],
        );
    };

    const closeAminoAcid = (aminoAcid: keyof typeof NonEssentialAminoAcids) => {
        setOpenAminoAcids((prev) => prev.filter((entry) => entry !== aminoAcid));
    };

    const aminoAcids = Object.entries(NonEssentialAminoAcids) as Array<
        [keyof typeof NonEssentialAminoAcids, string]
    >;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Заменими аминокиселини</CardTitle>
                <CardDescription>
                    това са аминокиселини, които тялото може да си произведе
                    само, стига да има достатъчно азот, витамини и енергия
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    {aminoAcids.map(([key, name]) => (
                        <li
                            onClick={() => openAminoAcid(key)}
                            key={key}
                            className="cursor-pointer hover:underline"
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </CardContent>

            {openAminoAcids.map((key) => (
                <Dialog
                    key={key}
                    open
                    onOpenChange={(open) => !open && closeAminoAcid(key)}
                >
                    <DialogContent title={NonEssentialAminoAcids[key]}>
                        {createElement(AminoMap[key])}
                    </DialogContent>
                </Dialog>
            ))}
        </Card>
    );
}
