import { getElementById as getCarbohydrateElementById } from "@/data/carbohydrate-elements";
import { getElementById as getFatElementById } from "@/data/fat-elements";
import type { Element, ElementId } from "@/lib/types";

export function getElementById(id: ElementId): Element | undefined {
    return getCarbohydrateElementById(id) ?? getFatElementById(id);
}
