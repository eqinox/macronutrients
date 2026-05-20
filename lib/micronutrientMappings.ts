import { createElementView } from "@/lib/create-element-view";
import {
    bComplexOverview,
    calcium,
    chloride,
    chromium,
    cobalt,
    copper,
    fluoride,
    iodine,
    iron,
    magnesium,
    manganese,
    micronutrientsOverview,
    molybdenum,
    phosphorus,
    potassium,
    selenium,
    sodium,
    sulfur,
    vitaminA,
    vitaminB1,
    vitaminB12,
    vitaminB2,
    vitaminB3,
    vitaminB5,
    vitaminB6,
    vitaminB7,
    vitaminB9,
    vitaminC,
    vitaminD,
    vitaminE,
    vitaminK,
    zinc,
} from "@/data/micronutrient-elements";
import VitaminsDescription from "@/components/micronutrients/vitamins/vitamins-description";
import MineralsDescription from "@/components/micronutrients/minerals/minerals-description";
import FatSolubleVitaminsDescription from "@/components/micronutrients/vitamins/fat-soluble/fat-soluble-vitamins-description";
import WaterSolubleVitaminsDescription from "@/components/micronutrients/vitamins/water-soluble/water-soluble-vitamins-description";
import BVitaminsDescription from "@/components/micronutrients/vitamins/water-soluble/b-vitamins-description";
import MacromineralsDescription from "@/components/micronutrients/minerals/macrominerals/macrominerals-description";
import TraceMineralsDescription from "@/components/micronutrients/minerals/trace/trace-minerals-description";

export const MainMicronutrientTopicMap = {
    Overview: createElementView(micronutrientsOverview),
    Vitamins: VitaminsDescription,
    Minerals: MineralsDescription,
} as const;

export const VitaminTopicMap = {
    FatSoluble: FatSolubleVitaminsDescription,
    WaterSoluble: WaterSolubleVitaminsDescription,
} as const;

export const FatSolubleVitaminTopicMap = {
    VitaminA: createElementView(vitaminA),
    VitaminD: createElementView(vitaminD),
    VitaminE: createElementView(vitaminE),
    VitaminK: createElementView(vitaminK),
} as const;

export const WaterSolubleVitaminTopicMap = {
    VitaminC: createElementView(vitaminC),
    BComplex: BVitaminsDescription,
} as const;

export const BVitaminTopicMap = {
    B1: createElementView(vitaminB1),
    B2: createElementView(vitaminB2),
    B3: createElementView(vitaminB3),
    B5: createElementView(vitaminB5),
    B6: createElementView(vitaminB6),
    B7: createElementView(vitaminB7),
    B9: createElementView(vitaminB9),
    B12: createElementView(vitaminB12),
} as const;

export const MineralTopicMap = {
    Macrominerals: MacromineralsDescription,
    TraceMinerals: TraceMineralsDescription,
} as const;

export const MacromineralTopicMap = {
    Calcium: createElementView(calcium),
    Phosphorus: createElementView(phosphorus),
    Magnesium: createElementView(magnesium),
    Sodium: createElementView(sodium),
    Potassium: createElementView(potassium),
    Chloride: createElementView(chloride),
    Sulfur: createElementView(sulfur),
} as const;

export const TraceMineralTopicMap = {
    Iron: createElementView(iron),
    Zinc: createElementView(zinc),
    Copper: createElementView(copper),
    Manganese: createElementView(manganese),
    Iodine: createElementView(iodine),
    Selenium: createElementView(selenium),
    Chromium: createElementView(chromium),
    Molybdenum: createElementView(molybdenum),
    Fluoride: createElementView(fluoride),
    Cobalt: createElementView(cobalt),
} as const;
