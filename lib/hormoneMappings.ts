import { createElementView } from "@/lib/create-element-view";
import {
    acth,
    adh,
    adrenalOverview,
    aldosterone,
    amineHormonesOverview,
    calcitonin,
    cortisol,
    epinephrine,
    estrogen,
    fsh,
    ghrelin,
    glucagon,
    gonadsOverview,
    growthHormone,
    hormoneTypesOverview,
    hormonesOverview,
    hypothalamusPituitaryOverview,
    insulin,
    leptin,
    lh,
    melatonin,
    norepinephrine,
    oxytocin,
    pancreasOverview,
    peptideHormonesOverview,
    progesterone,
    prolactin,
    pth,
    steroidHormonesOverview,
    testosterone,
    thyroidHormones,
    thyroidOverview,
    tsh,
} from "@/data/hormone-elements";
import HormoneTypesDescription from "@/components/hormones/types/hormone-types-description";
import GlandsDescription from "@/components/hormones/glands/glands-description";
import HypothalamusPituitaryDescription from "@/components/hormones/glands/hypothalamus-pituitary-description";
import ThyroidDescription from "@/components/hormones/glands/thyroid-description";
import AdrenalDescription from "@/components/hormones/glands/adrenal-description";
import PancreasDescription from "@/components/hormones/glands/pancreas-description";
import GonadsDescription from "@/components/hormones/glands/gonads-description";
import PinealDescription from "@/components/hormones/glands/pineal-description";
import AppetiteDescription from "@/components/hormones/glands/appetite-description";

export const MainHormoneTopicMap = {
    Overview: createElementView(hormonesOverview),
    Types: HormoneTypesDescription,
    Glands: GlandsDescription,
} as const;

export const HormoneTypeTopicMap = {
    Overview: createElementView(hormoneTypesOverview),
    Peptide: createElementView(peptideHormonesOverview),
    Steroid: createElementView(steroidHormonesOverview),
    Amine: createElementView(amineHormonesOverview),
} as const;

export const GlandTopicMap = {
    HypothalamusPituitary: HypothalamusPituitaryDescription,
    Thyroid: ThyroidDescription,
    Adrenal: AdrenalDescription,
    Pancreas: PancreasDescription,
    Gonads: GonadsDescription,
    Pineal: PinealDescription,
    Appetite: AppetiteDescription,
} as const;

export const HypothalamusPituitaryTopicMap = {
    Overview: createElementView(hypothalamusPituitaryOverview),
    GrowthHormone: createElementView(growthHormone),
    TSH: createElementView(tsh),
    ACTH: createElementView(acth),
    FSH: createElementView(fsh),
    LH: createElementView(lh),
    Prolactin: createElementView(prolactin),
    Oxytocin: createElementView(oxytocin),
    ADH: createElementView(adh),
} as const;

export const ThyroidTopicMap = {
    Overview: createElementView(thyroidOverview),
    ThyroidHormones: createElementView(thyroidHormones),
    Calcitonin: createElementView(calcitonin),
    PTH: createElementView(pth),
} as const;

export const AdrenalTopicMap = {
    Overview: createElementView(adrenalOverview),
    Cortisol: createElementView(cortisol),
    Aldosterone: createElementView(aldosterone),
    Epinephrine: createElementView(epinephrine),
    Norepinephrine: createElementView(norepinephrine),
} as const;

export const PancreasTopicMap = {
    Overview: createElementView(pancreasOverview),
    Insulin: createElementView(insulin),
    Glucagon: createElementView(glucagon),
} as const;

export const GonadTopicMap = {
    Overview: createElementView(gonadsOverview),
    Estrogen: createElementView(estrogen),
    Progesterone: createElementView(progesterone),
    Testosterone: createElementView(testosterone),
} as const;

export const PinealTopicMap = {
    Melatonin: createElementView(melatonin),
} as const;

export const AppetiteTopicMap = {
    Ghrelin: createElementView(ghrelin),
    Leptin: createElementView(leptin),
} as const;
