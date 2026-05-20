import { getElementById as getCarbohydrateElementById } from "@/data/carbohydrate-elements";
import { getElementById as getFatElementById } from "@/data/fat-elements";
import { getElementById as getMicronutrientElementById } from "@/data/micronutrient-elements";
import { getElementById as getHormoneElementById } from "@/data/hormone-elements";
import { getElementById as getProteinElementById } from "@/data/protein-elements";
import type { Element, ElementId } from "@/lib/types";

export function getElementById(id: ElementId): Element | undefined {
    return (
        getCarbohydrateElementById(id) ??
        getFatElementById(id) ??
        getMicronutrientElementById(id) ??
        getProteinElementById(id) ??
        getHormoneElementById(id)
    );
}
