import { createElementView } from "@/lib/create-element-view";
import {
    cholesterol,
    essentialFattyAcids,
    fatsOverview,
    monounsaturatedFat,
    omega3,
    omega6,
    polyunsaturatedFat,
    saturatedFat,
    transFat,
    triglyceride,
} from "@/data/fat-elements";
import UnsaturatedFatsDescription from "@/components/fats/unsaturated/unsaturated-fats-description";
import PolyunsaturatedFatsDescription from "@/components/fats/unsaturated/polyunsaturated/polyunsaturated-fats-description";

export const MainFatTopicMap = {
    Overview: createElementView(fatsOverview),
    Triglyceride: createElementView(triglyceride),
    Saturated: createElementView(saturatedFat),
    Unsaturated: UnsaturatedFatsDescription,
    Trans: createElementView(transFat),
    Cholesterol: createElementView(cholesterol),
} as const;

export const UnsaturatedFatTopicMap = {
    Monounsaturated: createElementView(monounsaturatedFat),
    Polyunsaturated: PolyunsaturatedFatsDescription,
} as const;

export const PolyunsaturatedFatTopicMap = {
    Overview: createElementView(polyunsaturatedFat),
    EssentialFattyAcids: createElementView(essentialFattyAcids),
    Omega3: createElementView(omega3),
    Omega6: createElementView(omega6),
} as const;
