import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent } from "./ui/dialog";
import { EssentialAminoAcids, NonEssentialAminoAcids } from "@/lib/enums/aminoAcids";
import { AminoMap } from "@/lib/aminoAcidMappings";

interface FoodData {
    name: string;
    protein: number;
    fats: number;
    carbs: number;
    calories: number;
    aminoAcids: {
        essential: Partial<Record<keyof typeof EssentialAminoAcids, number>>;
        nonEssential: Partial<Record<keyof typeof NonEssentialAminoAcids, number>>;
    };
    vitamins: Record<string, string>;
    minerals: Record<string, string>;
}

export default function Details({ food }: { food: FoodData }) {
    const [isAminoOpen, setIsAminoOpen] = useState(false);
    const [isVitaminsOpen, setIsVitaminsOpen] = useState(false);
    const [isMineralsOpen, setIsMineralsOpen] = useState(false);
    const [selectedAminoAcid, setSelectedAminoAcid] = useState<keyof typeof EssentialAminoAcids | keyof typeof NonEssentialAminoAcids | null>(null);

    const handleAminoacidEssentialClick = (aminoAcid: keyof typeof EssentialAminoAcids) => {
        setSelectedAminoAcid(aminoAcid);
    }
    const handleAminoacidNonEssentialClick = (aminoAcid: keyof typeof NonEssentialAminoAcids) => {
        setSelectedAminoAcid(aminoAcid);
    }
    const aminoAcidsEssential = (Object.entries(food.aminoAcids.essential)
        .filter((entry): entry is [keyof typeof EssentialAminoAcids, number] => entry[1] !== undefined)
        .sort((a, b) => b[1] - a[1]));
    const ActiveAminoModal = selectedAminoAcid ? AminoMap[selectedAminoAcid] : null;
    const selectedAminoAcidTitle = selectedAminoAcid
        ? (selectedAminoAcid in EssentialAminoAcids
            ? EssentialAminoAcids[selectedAminoAcid as keyof typeof EssentialAminoAcids]
            : NonEssentialAminoAcids[selectedAminoAcid as keyof typeof NonEssentialAminoAcids])
        : "Аминокиселина";
    const aminoAcidsNonEssential = (Object.entries(food.aminoAcids.nonEssential)
        .filter((entry): entry is [keyof typeof NonEssentialAminoAcids, number] => entry[1] !== undefined)
        .sort((a, b) => b[1] - a[1]));

    return (
        <>
            <Card className="max-w-md ml-4">
                <ScrollArea className="window">
                    <CardHeader>
                        <CardTitle>{food.name} - Детайли</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="font-bold">Макронутриенти (на 100г)</h3>
                        <p>Протеин: {food.protein} г</p>
                        <p>Мазнини: {food.fats} г</p>
                        <p>Въглехидрати: {food.carbs} г</p>
                        <p>Калории: {food.calories} kcal</p>

                        <Collapsible open={isAminoOpen} onOpenChange={setIsAminoOpen}>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                                >
                                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                    <h4 className="font-bold mt-2">Аминокиселини (г)</h4>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <ScrollArea className="h-50 max-w-75 rounded-md border p-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <h5>Незаменими:</h5>
                                            <ul>
                                                {aminoAcidsEssential.map(([key, value]) => (
                                                    <li onClick={() => handleAminoacidEssentialClick(key)} key={key} className="cursor-pointer hover:underline">
                                                        {EssentialAminoAcids[key]}: {value} г
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>Заменими:</h5>
                                            <ul>
                                                {aminoAcidsNonEssential.map(([key, value]) => (
                                                    <li onClick={() => handleAminoacidNonEssentialClick(key)} key={key} className="cursor-pointer hover:underline">
                                                        {NonEssentialAminoAcids[key]}: {value} г
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible open={isVitaminsOpen} onOpenChange={setIsVitaminsOpen}>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                                >
                                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                    <h4 className="font-bold mt-2">Витамини (г)</h4>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <ScrollArea className="h-50 max-w-75 rounded-md border p-4">
                                    <ul>
                                        {Object.entries(food.vitamins).map(([key, value]) => (
                                            <li key={key}>{key}: {value}</li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible open={isMineralsOpen} onOpenChange={setIsMineralsOpen}>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                                >
                                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                    <h4 className="font-bold mt-2">Минерали (г)</h4>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <ScrollArea className="h-50 max-w-75 rounded-md border p-4">
                                    <ul>
                                        {Object.entries(food.minerals).map(([key, value]) => (
                                            <li key={key}>{key}: {value}</li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </CollapsibleContent>
                        </Collapsible>
                    </CardContent>
                </ScrollArea>
            </Card>
            <Dialog open={!!selectedAminoAcid} onOpenChange={(open) => !open && setSelectedAminoAcid(null)}>
                <DialogContent title={selectedAminoAcidTitle} className="">
                    {ActiveAminoModal ? <ActiveAminoModal /> : null}
                </DialogContent>
            </Dialog>
        </>
    );
}