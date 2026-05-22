"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import Details from "@/components/details";
import FoodMacroSummary from "@/components/food-macro-summary";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MACRO_FOODS_PAGE_SIZE } from "@/lib/food-macro-groups";
import {
    getMinSearchLength,
    searchFoodsInList,
} from "@/lib/search-foods";
import type { FoodData } from "@/lib/types";

const DEBOUNCE_MS = 300;

type MacroFoodsDialogProps = {
    buttonLabel: string;
    dialogTitle: string;
    foods: FoodData[];
    pageSize?: number;
};

function FoodListItem({
    food,
    onSelect,
}: {
    food: FoodData;
    onSelect: (food: FoodData) => void;
}) {
    return (
        <li>
            <button
                type="button"
                className="flex w-full flex-col gap-0.5 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-accent"
                onClick={() => onSelect(food)}
            >
                <span className="font-medium">{food.name}</span>
                <FoodMacroSummary food={food} />
            </button>
        </li>
    );
}

export default function MacroFoodsDialog({
    buttonLabel,
    dialogTitle,
    foods,
    pageSize = MACRO_FOODS_PAGE_SIZE,
}: MacroFoodsDialogProps) {
    const [isListOpen, setIsListOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(pageSize);
    const [detailFood, setDetailFood] = useState<FoodData | null>(null);

    const minLength = getMinSearchLength();

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, DEBOUNCE_MS);
        return () => window.clearTimeout(timer);
    }, [query]);

    const filteredFoods = useMemo(() => {
        if (debouncedQuery.length < minLength) return foods;
        return searchFoodsInList(foods, debouncedQuery);
    }, [foods, debouncedQuery, minLength]);

    useEffect(() => {
        setVisibleCount(pageSize);
    }, [debouncedQuery, isListOpen, pageSize]);

    const visibleFoods = filteredFoods.slice(0, visibleCount);
    const hasMore = visibleCount < filteredFoods.length;
    const isFiltering = debouncedQuery.length >= minLength;

    const loadMore = useCallback(() => {
        setVisibleCount((count) =>
            Math.min(count + pageSize, filteredFoods.length),
        );
    }, [filteredFoods.length, pageSize]);

    const handleListScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const el = event.currentTarget;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 48) {
            loadMore();
        }
    };

    const handleListOpenChange = (open: boolean) => {
        setIsListOpen(open);
        if (!open) {
            setQuery("");
            setDebouncedQuery("");
            setVisibleCount(pageSize);
        }
    };

    return (
        <>
            <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => setIsListOpen(true)}
            >
                {buttonLabel}
            </Button>

            <Dialog open={isListOpen} onOpenChange={handleListOpenChange}>
                <DialogContent title={dialogTitle} draggable>
                    <div className="flex min-h-0 flex-col gap-3">
                        <div className="relative shrink-0">
                            <Search
                                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden
                            />
                            <Input
                                type="search"
                                placeholder="Търси в този списък…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="h-10 pl-9"
                            />
                        </div>

                        {query.length > 0 && query.length < minLength && (
                            <p className="text-xs text-muted-foreground">
                                Въведи поне {minLength} букви за търсене.
                            </p>
                        )}

                        {filteredFoods.length === 0 ? (
                            <p className="py-6 text-center text-sm text-muted-foreground">
                                {isFiltering
                                    ? `Няма резултат за „${debouncedQuery}“ в този списък.`
                                    : "Все още няма храни в тази категория."}
                            </p>
                        ) : (
                            <>
                                <div
                                    className="max-h-[min(50dvh,320px)] overflow-y-auto overscroll-contain rounded-md border [scrollbar-gutter:stable]"
                                    onScroll={handleListScroll}
                                >
                                    <ul className="py-1">
                                        {visibleFoods.map((food) => (
                                            <FoodListItem
                                                key={food.name}
                                                food={food}
                                                onSelect={setDetailFood}
                                            />
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-center text-xs text-muted-foreground">
                                    {visibleFoods.length} от {filteredFoods.length}
                                    {hasMore
                                        ? " · скролни надолу за още"
                                        : ""}
                                </p>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={detailFood != null}
                onOpenChange={(open) => !open && setDetailFood(null)}
            >
                <DialogContent
                    title={
                        detailFood
                            ? `${detailFood.name} – детайли`
                            : "Детайли"
                    }
                >
                    {detailFood && <Details food={detailFood} />}
                </DialogContent>
            </Dialog>
        </>
    );
}
