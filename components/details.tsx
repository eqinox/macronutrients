import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { EssentialAminoAcids, NonEssentialAminoAcids } from "@/lib/enums/aminoAcids";
import Leucine from "./aminoacids/essentials/leucine";
import Isoleucine from "./aminoacids/essentials/isoleucine";
import Valine from "./aminoacids/essentials/valine";
import Lysine from "./aminoacids/essentials/lysine";
import Methionine from "./aminoacids/essentials/methionine";
import Phenylalanine from "./aminoacids/essentials/phenylalanine";
import Threonine from "./aminoacids/essentials/threonine";
import Tryptophan from "./aminoacids/essentials/tryptophan";
import Histidine from "./aminoacids/essentials/histidine";
import Alanine from "./aminoacids/nonessentials/alanine";
import Arginine from "./aminoacids/nonessentials/arginine";
import Asparagine from "./aminoacids/nonessentials/asparagine";
import AsparticAcid from "./aminoacids/nonessentials/asparticacid";
import Cysteine from "./aminoacids/nonessentials/cysteine";
import GlutamicAcid from "./aminoacids/nonessentials/glutamicacid";
import Glutamine from "./aminoacids/nonessentials/glutamine";
import Glycine from "./aminoacids/nonessentials/glycine";
import Proline from "./aminoacids/nonessentials/proline";
import Serine from "./aminoacids/nonessentials/serine";
import Tyrosine from "./aminoacids/nonessentials/tyrosine";

interface FoodData {
    name: string;
    protein: number;
    fats: number;
    carbs: number;
    calories: number;
    aminoAcids: {
        essential: Record<keyof typeof EssentialAminoAcids, number>;
        nonEssential: Record<keyof typeof NonEssentialAminoAcids, number>;
    };
    vitamins: Record<string, string>;
    minerals: Record<string, string>;
}

const AminoModalMap = {
    Leucine,
    Isoleucine,
    Valine,
    Lysine,
    Methionine,
    Phenylalanine,
    Threonine,
    Tryptophan,
    Histidine,
    Alanine,
    Arginine,
    Asparagine,
    AsparticAcid,
    Cysteine,
    GlutamicAcid,
    Glutamine,
    Glycine,
    Proline,
    Serine,
    Tyrosine,
} as const;

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
    const aminoAcidsEssential = (Object.entries(food.aminoAcids.essential).sort((a, b) => b[1] - a[1])) as Array<[keyof typeof EssentialAminoAcids, number]>;
    const ActiveAminoModal = selectedAminoAcid ? AminoModalMap[selectedAminoAcid] : null;
    const aminoAcidsNonEssential = (Object.entries(food.aminoAcids.nonEssential).sort((a, b) => b[1] - a[1])) as Array<[keyof typeof NonEssentialAminoAcids, number]>;

    return (
        <>
            <Card className="max-w-md ml-4">
                <ScrollArea className="h-72">
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
                <DialogTitle>
                    <DialogContent className="">
                        {ActiveAminoModal ? <ActiveAminoModal /> : null}
                    </DialogContent>
                </DialogTitle>
            </Dialog>
        </>
    );
}