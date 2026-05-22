import { createElement, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import { Dialog, DialogContent } from "./ui/dialog";
import { EssentialAminoAcids, NonEssentialAminoAcids } from "@/lib/enums/aminoAcids";
import { ElementView } from "@/components/carbohydrates/element-view";
import { AminoMap } from "@/lib/aminoAcidMappings";
import { getElementById } from "@/lib/element-registry";
import { formatMacroGramsWithKcal } from "@/lib/format-food-macros";
import {
    FOOD_PORTION_PER_100G,
    type ElementId,
    type FoodData,
    type FoodFatEntry,
    type FoodNutrientEntry,
} from "@/lib/types";

type OpenTerm = { id: ElementId; title: string };

function asNutrientList(
    value: FoodNutrientEntry[] | Record<string, string> | undefined,
): FoodNutrientEntry[] {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return Object.entries(value).map(([label, amount]) => ({
        termId: label,
        label,
        amount,
    }));
}

function CollapsiblePanel({ children }: { children: ReactNode }) {
    return (
        <div className="mt-1 max-h-48 overflow-x-hidden overflow-y-auto overscroll-contain rounded-md border p-4 [scrollbar-gutter:stable]">
            {children}
        </div>
    );
}

function getFatItems(food: FoodData): FoodFatEntry[] {
    if (food.fatBreakdown && food.fatBreakdown.length > 0) {
        return food.fatBreakdown;
    }
    if (food.fats > 0) {
        return [
            {
                termId: "fatsOverview",
                label: "Мазнини (общо)",
                grams: food.fats,
            },
        ];
    }
    return [];
}

export default function Details({ food }: { food: FoodData }) {
    const topRef = useRef<HTMLDivElement>(null);
    const [isFatsOpen, setIsFatsOpen] = useState(false);
    const [isAminoOpen, setIsAminoOpen] = useState(false);
    const [isVitaminsOpen, setIsVitaminsOpen] = useState(false);
    const [isMineralsOpen, setIsMineralsOpen] = useState(false);
    const [isHormonesOpen, setIsHormonesOpen] = useState(false);
    const [openAminoAcids, setOpenAminoAcids] = useState<
        Array<
            keyof typeof EssentialAminoAcids | keyof typeof NonEssentialAminoAcids
        >
    >([]);
    const [openTerms, setOpenTerms] = useState<OpenTerm[]>([]);

    const openTerm = (id: ElementId, title: string) => {
        setOpenTerms((prev) =>
            prev.some((t) => t.id === id) ? prev : [...prev, { id, title }],
        );
    };

    const closeTerm = (id: ElementId) => {
        setOpenTerms((prev) => prev.filter((t) => t.id !== id));
    };

    const openAminoAcid = (
        aminoAcid:
            | keyof typeof EssentialAminoAcids
            | keyof typeof NonEssentialAminoAcids,
    ) => {
        setOpenAminoAcids((prev) =>
            prev.includes(aminoAcid) ? prev : [...prev, aminoAcid],
        );
    };

    const closeAminoAcid = (
        aminoAcid:
            | keyof typeof EssentialAminoAcids
            | keyof typeof NonEssentialAminoAcids,
    ) => {
        setOpenAminoAcids((prev) => prev.filter((entry) => entry !== aminoAcid));
    };

    const getAminoAcidTitle = (
        aminoAcid:
            | keyof typeof EssentialAminoAcids
            | keyof typeof NonEssentialAminoAcids,
    ) =>
        aminoAcid in EssentialAminoAcids
            ? EssentialAminoAcids[
                  aminoAcid as keyof typeof EssentialAminoAcids
              ]
            : NonEssentialAminoAcids[
                  aminoAcid as keyof typeof NonEssentialAminoAcids
              ];

    const aminoAcidsEssential = Object.entries(food.aminoAcids.essential)
        .filter(
            (entry): entry is [keyof typeof EssentialAminoAcids, number] =>
                entry[1] !== undefined,
        )
        .sort((a, b) => b[1] - a[1]);

    const portionLabel = food.portionLabel ?? FOOD_PORTION_PER_100G;
    const fatItems = getFatItems(food);
    const hasHormones =
        Array.isArray(food.hormoneInfluence) && food.hormoneInfluence.length > 0;
    const vitamins = asNutrientList(
        food.vitamins as FoodNutrientEntry[] | Record<string, string>,
    );
    const minerals = asNutrientList(
        food.minerals as FoodNutrientEntry[] | Record<string, string>,
    );

    useEffect(() => {
        topRef.current?.scrollIntoView({ block: "start" });
    }, [food.name]);

    const aminoAcidsNonEssential = Object.entries(food.aminoAcids.nonEssential)
        .filter(
            (entry): entry is [keyof typeof NonEssentialAminoAcids, number] =>
                entry[1] !== undefined,
        )
        .sort((a, b) => b[1] - a[1]);

    const nutrientList = (
        entries: { termId: ElementId; label: string; amount?: string; effect?: string }[],
    ) => (
        <ul className="space-y-2">
            {entries.map((entry) => (
                <li key={entry.termId}>
                    <button
                        type="button"
                        className="cursor-pointer font-medium text-primary underline underline-offset-2 hover:text-primary/80"
                        onClick={() => openTerm(entry.termId, entry.label)}
                    >
                        {entry.label}
                    </button>
                    {entry.amount != null && (
                        <span className="text-muted-foreground">
                            : {entry.amount}
                        </span>
                    )}
                    {entry.effect != null && (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {entry.effect}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <Card className="min-w-0 w-full max-w-full border-0 bg-transparent py-0 shadow-none">
                <div ref={topRef} className="scroll-mt-4" />
                <CardHeader>
                    <CardTitle>{food.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                    <section>
                        <h3 className="font-bold">Какво ти дава ({portionLabel})</h3>
                        <p className="text-sm text-muted-foreground">
                            {food.summary}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold">Макронутриенти ({portionLabel})</h3>
                        <ul className="text-sm">
                            <li>
                                Протеин:{" "}
                                {formatMacroGramsWithKcal(food.protein, "protein")}
                            </li>
                            <li>
                                Мазнини:{" "}
                                <strong>
                                    {formatMacroGramsWithKcal(food.fats, "fats")}
                                </strong>
                            </li>
                            <li
                                className={
                                    food.carbs === 0
                                        ? "text-muted-foreground"
                                        : undefined
                                }
                            >
                                Въглехидрати:{" "}
                                {formatMacroGramsWithKcal(food.carbs, "carbs")}
                            </li>
                            <li>
                                Общо калории: <strong>{food.calories} kcal</strong>
                            </li>
                        </ul>
                    </section>

                    {fatItems.length > 0 && (
                        <Collapsible
                            className="min-w-0"
                            open={isFatsOpen}
                            onOpenChange={setIsFatsOpen}
                        >
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                                >
                                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                    <span className="font-bold">
                                        Мазнини
                                    </span>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CollapsiblePanel>
                                    {nutrientList(
                                        fatItems.map((fat) => ({
                                            termId: fat.termId,
                                            label: fat.label,
                                            amount:
                                                fat.grams != null
                                                    ? `${fat.grams} г`
                                                    : fat.amount,
                                        })),
                                    )}
                                </CollapsiblePanel>
                            </CollapsibleContent>
                        </Collapsible>
                    )}

                    <Collapsible
                        className="min-w-0"
                        open={isAminoOpen}
                        onOpenChange={setIsAminoOpen}
                    >
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                            >
                                <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                <span className="font-bold">Аминокиселини</span>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <CollapsiblePanel>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <h5>Незаменими</h5>
                                        <ul>
                                            {aminoAcidsEssential.map(
                                                ([key, value]) => (
                                                    <li
                                                        onClick={() =>
                                                            openAminoAcid(key)
                                                        }
                                                        key={key}
                                                        className="cursor-pointer hover:underline"
                                                    >
                                                        {EssentialAminoAcids[key]}:{" "}
                                                        {value} г
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h5>Заменими</h5>
                                        <ul>
                                            {aminoAcidsNonEssential.map(
                                                ([key, value]) => (
                                                    <li
                                                        onClick={() =>
                                                            openAminoAcid(key)
                                                        }
                                                        key={key}
                                                        className="cursor-pointer hover:underline"
                                                    >
                                                        {
                                                            NonEssentialAminoAcids[
                                                                key
                                                            ]
                                                        }
                                                        : {value} г
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </CollapsiblePanel>
                        </CollapsibleContent>
                    </Collapsible>

                    {vitamins.length > 0 && (
                        <Collapsible
                            className="min-w-0"
                            open={isVitaminsOpen}
                            onOpenChange={setIsVitaminsOpen}
                        >
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                                >
                                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                    <span className="font-bold">Витамини</span>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CollapsiblePanel>
                                    {nutrientList(vitamins)}
                                </CollapsiblePanel>
                            </CollapsibleContent>
                        </Collapsible>
                    )}

                    {minerals.length > 0 && (
                        <Collapsible
                            className="min-w-0"
                            open={isMineralsOpen}
                            onOpenChange={setIsMineralsOpen}
                        >
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                                >
                                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                    <span className="font-bold">Минерали</span>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CollapsiblePanel>
                                    {nutrientList(minerals)}
                                </CollapsiblePanel>
                            </CollapsibleContent>
                        </Collapsible>
                    )}

                    {hasHormones && (
                        <Collapsible
                            className="min-w-0"
                            open={isHormonesOpen}
                            onOpenChange={setIsHormonesOpen}
                        >
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                                >
                                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                    <span className="font-bold">
                                        Влияние върху хормони
                                    </span>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CollapsiblePanel>
                                    {nutrientList(food.hormoneInfluence!)}
                                </CollapsiblePanel>
                            </CollapsibleContent>
                        </Collapsible>
                    )}
                </CardContent>
            </Card>

            {openAminoAcids.map((key) => (
                <Dialog
                    key={key}
                    open
                    onOpenChange={(open) => !open && closeAminoAcid(key)}
                >
                    <DialogContent title={getAminoAcidTitle(key)}>
                        {createElement(AminoMap[key])}
                    </DialogContent>
                </Dialog>
            ))}

            {openTerms.map(({ id, title }) => {
                const element = getElementById(id);
                if (!element) return null;
                return (
                    <Dialog
                        key={id}
                        open
                        onOpenChange={(open) => !open && closeTerm(id)}
                    >
                        <DialogContent title={element.name || title}>
                            <ElementView element={element} />
                        </DialogContent>
                    </Dialog>
                );
            })}
        </>
    );
}
