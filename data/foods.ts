import type { FoodData, FoodFatEntry, FoodHormoneInfluence, FoodNutrientEntry } from "@/lib/types";
import { FOOD_PORTION_PER_100G } from "@/lib/types";
import { partitionFoodsByPredominantMacro } from "@/lib/food-macro-groups";

/** Среден размер – 1 броя яйце (смесено С/M/L, ~58 g). */
export const MEDIUM_EGG_WEIGHT_G = 58;

export function foodPortionLabelPerPiece(weightG = MEDIUM_EGG_WEIGHT_G): string {
    return `на 1 бр. (~${weightG} g)`;
}

function round1(value: number): number {
    return Math.round(value * 10) / 10;
}

function round2(value: number): number {
    return Math.round(value * 100) / 100;
}

function scaleAmount(amount: string, factor: number): string {
    const match = amount.match(/^([\d.]+)\s*(.+)$/);
    if (!match) return amount;
    const value = parseFloat(match[1]) * factor;
    const unit = match[2].trim();
    if (unit === "mg") return `${Math.round(value)} mg`;
    if (unit === "µg") return `${round1(value)} µg`;
    if (unit === "IU") return `${Math.round(value)} IU`;
    return `${round1(value)} ${unit}`;
}

function scaleAminoAcids(
    amino: FoodData["aminoAcids"],
    factor: number,
): FoodData["aminoAcids"] {
    const scaleRecord = <T extends Record<string, number | undefined>>(
        record: Partial<T>,
    ) =>
        Object.fromEntries(
            Object.entries(record).map(([key, value]) => [
                key,
                value !== undefined ? round2(value * factor) : undefined,
            ]),
        ) as Partial<T>;

    return {
        essential: scaleRecord(amino.essential) as FoodData["aminoAcids"]["essential"],
        nonEssential: scaleRecord(
            amino.nonEssential,
        ) as FoodData["aminoAcids"]["nonEssential"],
    };
}

function eggPerPiece(
    basePer100g: FoodData,
    options: {
        name: string;
        summary: string;
        searchTerms: string[];
    },
): FoodData {
    const factor = MEDIUM_EGG_WEIGHT_G / 100;

    return {
        ...basePer100g,
        name: options.name,
        portionLabel: foodPortionLabelPerPiece(),
        summary: options.summary,
        searchTerms: [
            "яйце",
            "яйца",
            "1 яйце",
            "едно яйце",
            ...options.searchTerms,
        ],
        protein: round1(basePer100g.protein * factor),
        fats: round1(basePer100g.fats * factor),
        carbs: round1(basePer100g.carbs * factor),
        calories: Math.round(basePer100g.calories * factor),
        aminoAcids: scaleAminoAcids(basePer100g.aminoAcids, factor),
        fatBreakdown: basePer100g.fatBreakdown.map(
            (fat): FoodFatEntry => ({
                ...fat,
                grams:
                    fat.grams != null ? round2(fat.grams * factor) : undefined,
                amount:
                    fat.amount != null
                        ? scaleAmount(fat.amount, factor)
                        : undefined,
            }),
        ),
        vitamins: basePer100g.vitamins.map(
            (v): FoodNutrientEntry => ({
                ...v,
                amount: scaleAmount(v.amount, factor),
            }),
        ),
        minerals: basePer100g.minerals.map(
            (m): FoodNutrientEntry => ({
                ...m,
                amount: scaleAmount(m.amount, factor),
            }),
        ),
        hormoneInfluence: basePer100g.hormoneInfluence.map(
            (h): FoodHormoneInfluence => ({ ...h }),
        ),
    };
}

export const chickenFilletPanFried: FoodData = {
    name: "Пилешко филе на тиган",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["пиле", "пилешко", "филе", "пилешко филе", "chicken"],
    protein: 31,
    fats: 3.5,
    carbs: 0,
    calories: 170,
    summary:
        "Много протеин, малко мазнини, без въглехидрати – подходящо за мускули и възстановяване.",
    aminoAcids: {
        essential: {
            Leucine: 2.17,
            Isoleucine: 1.53,
            Valine: 1.44,
            Lysine: 2.46,
            Methionine: 0.8,
            Phenylalanine: 1.15,
            Threonine: 1.22,
            Tryptophan: 0.34,
            Histidine: 0.9,
        },
        nonEssential: {
            GlutamicAcid: 4.33,
            AsparticAcid: 2.58,
            Alanine: 1.58,
            Arginine: 1.75,
            Glycine: 1.42,
            Proline: 1.19,
            Serine: 1.0,
            Tyrosine: 0.98,
            Cysteine: 0.37,
        },
    },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 1.0 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 1.2 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 0.8 },
        { termId: "omega3", label: "Омега-3", grams: 0.05 },
        { termId: "cholesterol", label: "Холестерол", amount: "85 mg" },
    ],
    vitamins: [
        { termId: "vitaminB3", label: "B3 (ниацин)", amount: "14.8 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.6 mg" },
        { termId: "vitaminB5", label: "B5 (пантотенова)", amount: "1.0 mg" },
        { termId: "vitaminB2", label: "B2 (рибофлавин)", amount: "0.1 mg" },
        { termId: "vitaminB1", label: "B1 (тиамин)", amount: "0.07 mg" },
        { termId: "vitaminB12", label: "B12", amount: "0.3 µg" },
        { termId: "vitaminA", label: "A", amount: "13 IU" },
        { termId: "vitaminE", label: "E", amount: "0.3 mg" },
        { termId: "vitaminK", label: "K", amount: "0.3 µg" },
    ],
    minerals: [
        { termId: "phosphorus", label: "Фосфор", amount: "200 mg" },
        { termId: "potassium", label: "Калий", amount: "250 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "25 mg" },
        { termId: "sodium", label: "Натрий", amount: "70 mg" },
        { termId: "zinc", label: "Цинк", amount: "1 mg" },
        { termId: "selenium", label: "Селен", amount: "25 µg" },
        { termId: "iron", label: "Желязо", amount: "1 mg" },
        { termId: "calcium", label: "Калций", amount: "12 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Умерен отговор след хранене – доставка на аминокиселини в мускулите.",
        },
        {
            termId: "glucagon",
            label: "Глюкагон",
            effect: "Поддържа енергия от аминокиселини при ниска захар.",
        },
        {
            termId: "growthHormone",
            label: "Растежен хормон (GH)",
            effect: "Левцинът подпомага възстановяване и мускулна маса.",
        },
        {
            termId: "testosterone",
            label: "Тестостерон",
            effect: "Цинкът и протеинът подкрепят хормоналния баланс.",
        },
        {
            termId: "thyroidHormones",
            label: "T3 / T4",
            effect: "Селен и тирозин – за щитовидната функция.",
        },
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Висок протеин → по-добра ситост.",
        },
        {
            termId: "ghrelin",
            label: "Грелин",
            effect: "По-малко чувство на глад след хранене.",
        },
        {
            termId: "melatonin",
            label: "Мелатонин",
            effect: "Триптофан – предшественик (индиректно за сън).",
        },
    ],
};

/** Варено яйце (цяло), на 100 г – ориентировъчни стойности. */
export const eggBoiled: FoodData = {
    name: "Яйце (варено, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["яйце 100г", "100 г яйце", "egg per 100g"],
    protein: 12.6,
    fats: 10.6,
    carbs: 1.1,
    calories: 155,
    summary:
        "Пълен протеин, повече мазнини и холестерол – богато на B12, D, селен и холин.",
    aminoAcids: {
        essential: {
            Leucine: 1.09,
            Isoleucine: 0.68,
            Valine: 0.86,
            Lysine: 0.93,
            Methionine: 0.38,
            Phenylalanine: 0.68,
            Threonine: 0.6,
            Tryptophan: 0.17,
            Histidine: 0.31,
        },
        nonEssential: {
            GlutamicAcid: 1.64,
            AsparticAcid: 1.33,
            Alanine: 0.7,
            Arginine: 0.82,
            Glycine: 0.42,
            Proline: 0.5,
            Serine: 0.93,
            Tyrosine: 0.5,
            Cysteine: 0.29,
        },
    },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 3.3 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 4.1 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 1.4 },
        { termId: "omega3", label: "Омега-3", grams: 0.05 },
        { termId: "cholesterol", label: "Холестерол", amount: "373 mg" },
    ],
    vitamins: [
        { termId: "vitaminB12", label: "B12", amount: "1.1 µg" },
        { termId: "vitaminB2", label: "B2 (рибофлавин)", amount: "0.46 mg" },
        { termId: "vitaminD", label: "D", amount: "87 IU" },
        { termId: "vitaminA", label: "A", amount: "520 IU" },
        { termId: "vitaminB5", label: "B5 (пантотенова)", amount: "1.4 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "44 µg" },
        { termId: "vitaminE", label: "E", amount: "1.0 mg" },
        { termId: "vitaminK", label: "K", amount: "0.3 µg" },
    ],
    minerals: [
        { termId: "selenium", label: "Селен", amount: "31 µg" },
        { termId: "phosphorus", label: "Фосфор", amount: "198 mg" },
        { termId: "potassium", label: "Калий", amount: "126 mg" },
        { termId: "sodium", label: "Натрий", amount: "124 mg" },
        { termId: "calcium", label: "Калций", amount: "50 mg" },
        { termId: "iron", label: "Желязо", amount: "1.2 mg" },
        { termId: "zinc", label: "Цинк", amount: "1.0 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Лек протеин + малко въглехидрати – умерен инсулинов отговор.",
        },
        {
            termId: "testosterone",
            label: "Тестостерон",
            effect: "Холестеролът е градивен елемент за стероидни хормони.",
        },
        {
            termId: "thyroidHormones",
            label: "T3 / T4",
            effect: "Селен и йод (при редовна консумация) – за щитовидната жлеза.",
        },
        {
            termId: "melatonin",
            label: "Мелатонин",
            effect: "Триптофан – предшественик на серотонин и мелатонин.",
        },
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Протеин + мазнини → добра ситост при закуска/хранене.",
        },
    ],
};

export const eggSoftBoiled = eggPerPiece(eggBoiled, {
    name: "Яйце рохко (1 бр., ~58 g)",
    summary: "Меко сварено – течен жълтък, по-малко на 1 броя (~58 g).",
    searchTerms: ["рохко", "меко", "меко сварено", "soft"],
});

export const eggMediumBoiled = eggPerPiece(eggBoiled, {
    name: "Яйце средно сварено (1 бр., ~58 g)",
    summary: "Жълтъкът е частично стегнат – баланс между рохко и твърдо (~58 g).",
    searchTerms: ["средно", "средно сварено", "medium"],
});

export const eggHardBoiled = eggPerPiece(eggBoiled, {
    name: "Яйце твърдо сварено (1 бр., ~58 g)",
    summary: "Напълно стегнато – класическо твърдо яйце (~58 g).",
    searchTerms: ["твърдо", "твърдо сварено", "hard", "варено"],
});

export const allFoods: FoodData[] = [
    chickenFilletPanFried,
    eggBoiled,
    eggSoftBoiled,
    eggMediumBoiled,
    eggHardBoiled,
];

const foodsByMacro = partitionFoodsByPredominantMacro(allFoods);

/** Храни, при които най-много калории идват от протеин. */
export const proteinPredominantFoods = foodsByMacro.protein;

/** Храни, при които най-много калории идват от въглехидрати. */
export const carbPredominantFoods = foodsByMacro.carbs;

/** Храни, при които най-много калории идват от мазнини. */
export const fatPredominantFoods = foodsByMacro.fats;
