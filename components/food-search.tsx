"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Search } from "lucide-react";

import Details from "@/components/details";
import FoodMacroSummary from "@/components/food-macro-summary";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getMinSearchLength, searchFoods } from "@/lib/search-foods";
import type { FoodData } from "@/lib/types";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 350;
const SEARCH_DELAY_MS = 200;

export default function FoodSearch() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [results, setResults] = useState<FoodData[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openFoods, setOpenFoods] = useState<FoodData[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const minLength = getMinSearchLength();
    const showPanel = isOpen && debouncedQuery.length >= minLength;

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, DEBOUNCE_MS);
        return () => window.clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length < minLength) {
            setResults([]);
            setIsSearching(false);
            setHasSearched(false);
            return;
        }

        setIsSearching(true);
        setHasSearched(false);

        const timer = window.setTimeout(() => {
            setResults(searchFoods(debouncedQuery));
            setIsSearching(false);
            setHasSearched(true);
        }, SEARCH_DELAY_MS);

        return () => window.clearTimeout(timer);
    }, [debouncedQuery, minLength]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const openFood = useCallback((food: FoodData) => {
        setOpenFoods((prev) =>
            prev.some((f) => f.name === food.name) ? prev : [...prev, food],
        );
        setIsOpen(false);
    }, []);

    const closeFood = useCallback((name: string) => {
        setOpenFoods((prev) => prev.filter((f) => f.name !== name));
    }, []);

    return (
        <>
            <section
                ref={containerRef}
                data-slot="food-search"
                className="relative z-10 w-full px-1 sm:px-2"
                aria-label="Търсене на храни"
            >
                <label htmlFor="food-search" className="sr-only">
                    Търсене на храна
                </label>
                <div className="relative">
                    <Search
                        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
                        aria-hidden
                    />
                    <Input
                        id="food-search"
                        ref={inputRef}
                        type="search"
                        role="combobox"
                        aria-expanded={showPanel}
                        aria-controls="food-search-results"
                        aria-autocomplete="list"
                        placeholder="Търси храна – напр. пиле, яйце…"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        className={cn(
                            "h-14 w-full rounded-xl border-2 pr-12 pl-12 text-base shadow-sm",
                            "placeholder:text-muted-foreground/80",
                            "focus-visible:border-primary focus-visible:ring-primary/20",
                        )}
                    />
                    {isSearching && (
                        <Loader2
                            className="absolute top-1/2 right-4 size-5 -translate-y-1/2 animate-spin text-primary"
                            aria-hidden
                        />
                    )}
                </div>

                {showPanel && (
                    <div
                        id="food-search-results"
                        role="listbox"
                        className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg"
                    >
                        {isSearching ? (
                            <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground">
                                <Loader2 className="size-4 shrink-0 animate-spin text-primary" />
                                Търсене…
                            </div>
                        ) : results.length > 0 ? (
                            <ul className="max-h-72 overflow-y-auto py-1 [scrollbar-gutter:stable]">
                                {results.map((food) => (
                                    <li key={food.name} role="option">
                                        <button
                                            type="button"
                                            className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-accent"
                                            onClick={() => openFood(food)}
                                        >
                                            <span className="font-medium">
                                                {food.name}
                                            </span>
                                            <FoodMacroSummary food={food} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : hasSearched ? (
                            <div className="px-4 py-5 text-center text-sm">
                                <p className="font-medium text-foreground">
                                    Няма намерена храна
                                </p>
                                <p className="mt-1 text-muted-foreground">
                                    Нямаме информация за „{debouncedQuery}“.
                                    Опитай друго име.
                                </p>
                            </div>
                        ) : null}
                    </div>
                )}

                {query.length > 0 && query.length < minLength && isOpen && (
                    <p className="mt-2 px-1 text-xs text-muted-foreground">
                        Въведи поне {minLength} букви за търсене.
                    </p>
                )}
            </section>

            {openFoods.map((food) => (
                <Dialog
                    key={food.name}
                    open
                    onOpenChange={(open) => !open && closeFood(food.name)}
                >
                    <DialogContent title={`${food.name} – детайли`}>
                        <Details food={food} />
                    </DialogContent>
                </Dialog>
            ))}
        </>
    );
}
