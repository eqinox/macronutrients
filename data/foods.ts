import type { FoodData, FoodFatEntry, FoodHormoneInfluence, FoodNutrientEntry } from "@/lib/types";
import { FOOD_PORTION_PER_100G } from "@/lib/types";
import { partitionFoodsByPredominantMacro } from "@/lib/food-macro-groups";
import { additionalFoods } from "@/data/foods-additional";

/** Среден размер – 1 броя яйце (смесено С/M/L, ~58 g). */
export const MEDIUM_EGG_WEIGHT_G = 58;

/** Средно авокадо – ядимата част без костилка и люспа (~150 g). */
export const MEDIUM_AVOCADO_WEIGHT_G = 150;

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

function foodPerPiece(
    basePer100g: FoodData,
    pieceWeightG: number,
    options: {
        name: string;
        summary: string;
        searchTerms: string[];
        sharedSearchTerms?: string[];
    },
): FoodData {
    const factor = pieceWeightG / 100;

    return {
        ...basePer100g,
        name: options.name,
        portionLabel: foodPortionLabelPerPiece(pieceWeightG),
        summary: options.summary,
        searchTerms: [
            ...(options.sharedSearchTerms ?? []),
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

function eggPerPiece(
    basePer100g: FoodData,
    options: {
        name: string;
        summary: string;
        searchTerms: string[];
    },
): FoodData {
    return foodPerPiece(basePer100g, MEDIUM_EGG_WEIGHT_G, {
        ...options,
        sharedSearchTerms: ["яйце", "яйца", "1 яйце", "едно яйце"],
    });
}

const oilHormoneInfluence: FoodHormoneInfluence[] = [
    {
        termId: "leptin",
        label: "Лептин",
        effect: "Чиста мазнина → много калории на малък обем; важна е порцията.",
    },
    {
        termId: "ghrelin",
        label: "Грелин",
        effect: "Забавя празненето на стомаха – по-малко глад след добавка към ястие.",
    },
    {
        termId: "insulin",
        label: "Инсулин",
        effect: "Без въглехидрати и протеин – почти не предизвиква инсулинов отговор.",
    },
    {
        termId: "glucagon",
        label: "Глюкагон",
        effect: "При ниски въглехидрати мазнините се ползват като основен източник на енергия.",
    },
];

function cookingOilPer100g(options: {
    name: string;
    summary: string;
    searchTerms: string[];
    fatBreakdown: FoodFatEntry[];
    vitamins: FoodNutrientEntry[];
    minerals?: FoodNutrientEntry[];
}): FoodData {
    return {
        name: options.name,
        portionLabel: FOOD_PORTION_PER_100G,
        searchTerms: options.searchTerms,
        protein: 0,
        fats: 100,
        carbs: 0,
        calories: 884,
        summary: options.summary,
        aminoAcids: { essential: {}, nonEssential: {} },
        fatBreakdown: options.fatBreakdown,
        vitamins: options.vitamins,
        minerals: options.minerals ?? [
            { termId: "sodium", label: "Натрий", amount: "0 mg" },
        ],
        hormoneInfluence: oilHormoneInfluence,
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

/** Сурово авокадо, на 100 g – ориентировъчни стойности (USDA). */
export const avocadoRaw: FoodData = {
    name: "Авокадо (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["авокадо 100г", "100 г авокадо", "avocado per 100g"],
    protein: 2.0,
    fats: 14.7,
    carbs: 8.5,
    calories: 160,
    summary:
        "Много мононенаситени мазнини, калий и фибри – ниска захар, добра ситост; богато на K, E, фолат.",
    aminoAcids: {
        essential: {
            Leucine: 0.14,
            Isoleucine: 0.1,
            Valine: 0.11,
            Lysine: 0.13,
            Methionine: 0.04,
            Phenylalanine: 0.1,
            Threonine: 0.07,
            Tryptophan: 0.03,
            Histidine: 0.05,
        },
        nonEssential: {
            GlutamicAcid: 0.24,
            AsparticAcid: 0.22,
            Alanine: 0.11,
            Arginine: 0.13,
            Glycine: 0.1,
            Proline: 0.11,
            Serine: 0.1,
            Tyrosine: 0.06,
            Cysteine: 0.03,
        },
    },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 2.1 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 9.8 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 1.8 },
        { termId: "omega3", label: "Омега-3", grams: 0.11 },
    ],
    vitamins: [
        { termId: "vitaminK", label: "K", amount: "21 µg" },
        { termId: "vitaminE", label: "E", amount: "2.1 mg" },
        { termId: "vitaminC", label: "C", amount: "10 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "81 µg" },
        { termId: "vitaminB5", label: "B5 (пантотенова)", amount: "1.4 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.26 mg" },
        { termId: "vitaminB3", label: "B3 (ниацин)", amount: "1.7 mg" },
        { termId: "vitaminA", label: "A", amount: "146 IU" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "485 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "29 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "52 mg" },
        { termId: "sodium", label: "Натрий", amount: "7 mg" },
        { termId: "calcium", label: "Калций", amount: "12 mg" },
        { termId: "iron", label: "Желязо", amount: "0.6 mg" },
        { termId: "zinc", label: "Цинк", amount: "0.6 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Мазнини + фибри → по-дълга ситост след хранене.",
        },
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Умерен отговор – малко въглехидрати, ниска гликемична реакция.",
        },
        {
            termId: "ghrelin",
            label: "Грелин",
            effect: "Мазнините забавят празненето на стомаха → по-малко глад след ястие.",
        },
        {
            termId: "cortisol",
            label: "Кортизол",
            effect: "Калий и B витамини подкрепят надбъбречниците при стрес.",
        },
        {
            termId: "thyroidHormones",
            label: "T3 / T4",
            effect: "Магнезий и цинк – за нормална щитовидна и метаболитна функция.",
        },
    ],
};

export const avocadoOne = foodPerPiece(avocadoRaw, MEDIUM_AVOCADO_WEIGHT_G, {
    name: "Авокадо (1 бр., ~150 g)",
    summary:
        "Средно авокадо (ядима част) – повече калий, мазнини и фолат на 1 броя (~150 g).",
    searchTerms: [
        "авокадо",
        "авокадото",
        "1 авокадо",
        "едно авокадо",
        "avocado",
        "hass",
    ],
});

/** Слънчогледово олио, на 100 g (USDA). */
export const sunflowerOil: FoodData = cookingOilPer100g({
    name: "Олио (слънчогледово, на 100 г)",
    summary:
        "Почти само мазнини – много полиненаситени (омега-6), богато на витамин E; без протеин и въглехидрати.",
    searchTerms: [
        "олио",
        "слънчогледово",
        "слънчогледово олио",
        "oil",
        "sunflower oil",
    ],
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 11.4 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 19.5 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 65.7 },
        { termId: "omega3", label: "Омега-3", grams: 0.03 },
    ],
    vitamins: [
        { termId: "vitaminE", label: "E", amount: "41 mg" },
        { termId: "vitaminK", label: "K", amount: "5.4 µg" },
    ],
});

/** Зехтин (екстра върджин), на 100 g (USDA). */
export const oliveOil: FoodData = cookingOilPer100g({
    name: "Зехтин (на 100 г)",
    summary:
        "Предимно мононенаситени мазнини (олеинова киселина), витамин E и K – класика за салати и готвене.",
    searchTerms: [
        "зехтин",
        "зехтина",
        "маслиново",
        "маслиново олио",
        "olive oil",
        "extra virgin",
    ],
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 13.8 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 73.0 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 10.5 },
        { termId: "omega3", label: "Омега-3", grams: 0.76 },
    ],
    vitamins: [
        { termId: "vitaminE", label: "E", amount: "14 mg" },
        { termId: "vitaminK", label: "K", amount: "60 µg" },
    ],
});

/** Сурови домати, на 100 g (USDA). */
export const tomatoRaw: FoodData = {
    name: "Домати (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["домат", "домати", "доматите", "tomato", "tomatoes"],
    protein: 0.9,
    fats: 0.2,
    carbs: 3.9,
    calories: 18,
    summary:
        "Много вода, малко калории – ликопен, витамин C и калий; умерен гликемичен ефект.",
    aminoAcids: {
        essential: {
            Leucine: 0.03,
            Isoleucine: 0.02,
            Valine: 0.02,
            Lysine: 0.03,
            Methionine: 0.01,
            Phenylalanine: 0.03,
            Threonine: 0.02,
            Tryptophan: 0.01,
            Histidine: 0.01,
        },
        nonEssential: {
            GlutamicAcid: 0.14,
            AsparticAcid: 0.09,
            Alanine: 0.03,
            Arginine: 0.02,
            Glycine: 0.02,
            Proline: 0.02,
            Serine: 0.02,
            Tyrosine: 0.01,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 0.03 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 0.06 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 0.08 },
    ],
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "14 mg" },
        { termId: "vitaminA", label: "A", amount: "833 IU" },
        { termId: "vitaminK", label: "K", amount: "7.9 µg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "15 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "237 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "11 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "24 mg" },
        { termId: "sodium", label: "Натрий", amount: "5 mg" },
        { termId: "calcium", label: "Калций", amount: "10 mg" },
        { termId: "iron", label: "Желязо", amount: "0.3 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Малко въглехидрати → нисък инсулинов отговор.",
        },
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Вода и фибри → обем без много калории.",
        },
        {
            termId: "melatonin",
            label: "Мелатонин",
            effect: "Ликопенът (индиректно) се свързва с антиоксидантна защита.",
        },
    ],
};

/** Сурова краставица, на 100 g (USDA). */
export const cucumberRaw: FoodData = {
    name: "Краставица (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["краставица", "краставици", "cucumber", "cucumbers"],
    protein: 0.7,
    fats: 0.1,
    carbs: 3.6,
    calories: 15,
    summary:
        "Почти само вода – много ниски калории, леко охлаждащо действие, малко калий.",
    aminoAcids: {
        essential: {
            Leucine: 0.02,
            Isoleucine: 0.01,
            Valine: 0.02,
            Lysine: 0.02,
            Methionine: 0.01,
            Phenylalanine: 0.02,
            Threonine: 0.01,
            Tryptophan: 0,
            Histidine: 0.01,
        },
        nonEssential: {
            GlutamicAcid: 0.06,
            AsparticAcid: 0.04,
            Alanine: 0.02,
            Arginine: 0.02,
            Glycine: 0.02,
            Proline: 0.02,
            Serine: 0.01,
            Tyrosine: 0.01,
            Cysteine: 0,
        },
    },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 0.03 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 0.01 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 0.03 },
    ],
    vitamins: [
        { termId: "vitaminK", label: "K", amount: "16.4 µg" },
        { termId: "vitaminC", label: "C", amount: "2.8 mg" },
        { termId: "vitaminB5", label: "B5 (пантотенова)", amount: "0.26 mg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "147 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "13 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "24 mg" },
        { termId: "sodium", label: "Натрий", amount: "2 mg" },
        { termId: "calcium", label: "Калций", amount: "16 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Много ниски въглехидрати – минимален инсулинов отговор.",
        },
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Висок обем, малко калории – подходящ за засищане без излишна енергия.",
        },
        {
            termId: "adh",
            label: "АДХ (вазопресин)",
            effect: "Водата и електролитите подкрепят хидратацията.",
        },
    ],
};

/** Суров морков, на 100 g (USDA). */
export const carrotRaw: FoodData = {
    name: "Морков (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["морков", "моркови", "морковите", "carrot", "carrots"],
    protein: 0.9,
    fats: 0.2,
    carbs: 9.6,
    calories: 41,
    summary:
        "Бета-каротин (провитамин A), фибри и естествени захари – умерен гликемичен ефект.",
    aminoAcids: {
        essential: {
            Leucine: 0.05,
            Isoleucine: 0.04,
            Valine: 0.05,
            Lysine: 0.04,
            Methionine: 0.01,
            Phenylalanine: 0.03,
            Threonine: 0.03,
            Tryptophan: 0.01,
            Histidine: 0.02,
        },
        nonEssential: {
            GlutamicAcid: 0.17,
            AsparticAcid: 0.19,
            Alanine: 0.05,
            Arginine: 0.04,
            Glycine: 0.04,
            Proline: 0.03,
            Serine: 0.04,
            Tyrosine: 0.02,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 0.04 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 0.01 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 0.1 },
    ],
    vitamins: [
        { termId: "vitaminA", label: "A", amount: "16706 IU" },
        { termId: "vitaminK", label: "K", amount: "13.2 µg" },
        { termId: "vitaminC", label: "C", amount: "5.9 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.14 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "19 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "320 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "35 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "12 mg" },
        { termId: "sodium", label: "Натрий", amount: "69 mg" },
        { termId: "calcium", label: "Калций", amount: "33 mg" },
        { termId: "iron", label: "Желязо", amount: "0.3 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Въглехидратите дават умерен инсулинов отговор – по-висок от краставицата.",
        },
        {
            termId: "thyroidHormones",
            label: "T3 / T4",
            effect: "Йод и витамин A подкрепят нормалната функция на щитовидната жлеза.",
        },
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Фибрите забавят усвояването → по-стабилна ситост.",
        },
    ],
};

/** Сурова чушка (червена, сладка), на 100 g (USDA). */
export const bellPepperRaw: FoodData = {
    name: "Чушка (червена, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "чушка",
        "чушки",
        "пипер",
        "червена чушка",
        "pepper",
        "bell pepper",
        "capsicum",
    ],
    protein: 1.0,
    fats: 0.3,
    carbs: 6.0,
    calories: 26,
    summary:
        "Много витамин C, малко калории – сладък вкус без много захар; подходяща за салати.",
    aminoAcids: {
        essential: {
            Leucine: 0.04,
            Isoleucine: 0.02,
            Valine: 0.03,
            Lysine: 0.04,
            Methionine: 0.01,
            Phenylalanine: 0.03,
            Threonine: 0.02,
            Tryptophan: 0.01,
            Histidine: 0.01,
        },
        nonEssential: {
            GlutamicAcid: 0.13,
            AsparticAcid: 0.12,
            Alanine: 0.03,
            Arginine: 0.04,
            Glycine: 0.03,
            Proline: 0.02,
            Serine: 0.03,
            Tyrosine: 0.02,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 0.06 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 0.02 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 0.15 },
    ],
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "128 mg" },
        { termId: "vitaminA", label: "A", amount: "3131 IU" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.29 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "46 µg" },
        { termId: "vitaminE", label: "E", amount: "1.6 mg" },
        { termId: "vitaminK", label: "K", amount: "4.9 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "211 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "12 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "26 mg" },
        { termId: "sodium", label: "Натрий", amount: "4 mg" },
        { termId: "calcium", label: "Калций", amount: "7 mg" },
        { termId: "iron", label: "Желязо", amount: "0.3 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Умерени въглехидрати – по-нисък от хляб, но по-висок от листни зеленчуци.",
        },
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Фибри + вода → по-добра ситост на калория.",
        },
        {
            termId: "cortisol",
            label: "Кортизол",
            effect: "Витамин C подкрепя надбъбречниците при оксидативен стрес.",
        },
    ],
};

export const allFoods: FoodData[] = [
    chickenFilletPanFried,
    eggBoiled,
    eggSoftBoiled,
    eggMediumBoiled,
    eggHardBoiled,
    avocadoRaw,
    avocadoOne,
    sunflowerOil,
    oliveOil,
    tomatoRaw,
    cucumberRaw,
    carrotRaw,
    bellPepperRaw,
    ...additionalFoods,
];

const foodsByMacro = partitionFoodsByPredominantMacro(allFoods);

/** Храни, при които най-много калории идват от протеин. */
export const proteinPredominantFoods = foodsByMacro.protein;

/** Храни, при които най-много калории идват от въглехидрати. */
export const carbPredominantFoods = foodsByMacro.carbs;

/** Храни, при които най-много калории идват от мазнини. */
export const fatPredominantFoods = foodsByMacro.fats;
