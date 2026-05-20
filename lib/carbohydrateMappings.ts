import { createElementView } from "@/lib/create-element-view";
import {
    fiberOverview,
    fructose,
    galactose,
    glucose,
    glycemicIndex,
    glycemicLoad,
    insolubleFiber,
    lactose,
    maltose,
    resistantStarch,
    solubleFiber,
    starchDigestion,
    starchOverview,
    starchSources,
    sucrose,
} from "@/data/carbohydrate-elements";

export const MonosaccharideMap = {
    Glucose: createElementView(glucose),
    Fructose: createElementView(fructose),
    Galactose: createElementView(galactose),
} as const;

export const DisaccharideMap = {
    Sucrose: createElementView(sucrose),
    Lactose: createElementView(lactose),
    Maltose: createElementView(maltose),
} as const;

export const StarchTopicMap = {
    Overview: createElementView(starchOverview),
    Digestion: createElementView(starchDigestion),
    Sources: createElementView(starchSources),
    GlycemicIndex: createElementView(glycemicIndex),
    GlycemicLoad: createElementView(glycemicLoad),
    ResistantStarch: createElementView(resistantStarch),
} as const;

export const FiberTopicMap = {
    Overview: createElementView(fiberOverview),
    Soluble: createElementView(solubleFiber),
    Insoluble: createElementView(insolubleFiber),
} as const;
