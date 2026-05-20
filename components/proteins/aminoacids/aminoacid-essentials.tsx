import { createElement, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { EssentialAminoAcids } from "../../../lib/enums/aminoAcids";
import { Dialog, DialogContent } from "../../ui/dialog";
import { AminoMap } from "@/lib/aminoAcidMappings";

export default function AminoacidEssentials() {
    const [openAminoAcids, setOpenAminoAcids] = useState<
        Array<keyof typeof EssentialAminoAcids>
    >([]);

    const openAminoAcid = (aminoAcid: keyof typeof EssentialAminoAcids) => {
        setOpenAminoAcids((prev) =>
            prev.includes(aminoAcid) ? prev : [...prev, aminoAcid],
        );
    };

    const closeAminoAcid = (aminoAcid: keyof typeof EssentialAminoAcids) => {
        setOpenAminoAcids((prev) => prev.filter((entry) => entry !== aminoAcid));
    };

    const aminoAcids = Object.entries(EssentialAminoAcids) as Array<
        [keyof typeof EssentialAminoAcids, string]
    >;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Незаменими аминокиселини</CardTitle>
                <CardDescription>
                    Това са аминокиселини, които тялото не може да синтезира
                    само и трябва да ги получаваш чрез храната
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
                    <DialogContent title={EssentialAminoAcids[key]}>
                        {createElement(AminoMap[key])}
                    </DialogContent>
                </Dialog>
            ))}
        </Card>
    );
}
