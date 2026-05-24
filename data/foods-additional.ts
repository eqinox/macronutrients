import type { FoodData, FoodFatEntry, FoodHormoneInfluence } from "@/lib/types";
import { FOOD_PORTION_PER_100G } from "@/lib/types";

function vegFat(s: number, m: number, p: number): FoodFatEntry[] {
    return [
        { termId: "saturatedFat", label: "Наситени", grams: s },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: m },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: p },
    ];
}

const carbVegHormones: FoodHormoneInfluence[] = [
    {
        termId: "insulin",
        label: "Инсулин",
        effect: "Въглехидратите повишават инсулина – степенът зависи от вида и готвенето.",
    },
    {
        termId: "leptin",
        label: "Лептин",
        effect: "Фибри и вода подобряват ситостта на калория.",
    },
    {
        termId: "ghrelin",
        label: "Грелин",
        effect: "По-бавно усвояване → по-малко глад след хранене.",
    },
];

const fruitHormones: FoodHormoneInfluence[] = [
    {
        termId: "insulin",
        label: "Инсулин",
        effect: "Плодните захари дават умерен до по-висок инсулинов отговор.",
    },
    {
        termId: "leptin",
        label: "Лептин",
        effect: "Фибрите в плодовете смекчават скока в захарта.",
    },
    {
        termId: "melatonin",
        label: "Мелатонин",
        effect: "Триптофанът (в малки количества) – индиректна връзка със съня.",
    },
];

const meatHormones: FoodHormoneInfluence[] = [
    {
        termId: "insulin",
        label: "Инсулин",
        effect: "Умерен отговор – аминокиселини без въглехидрати.",
    },
    {
        termId: "testosterone",
        label: "Тестостерон",
        effect: "Цинк, желязо и протеин подкрепят стероидния баланс.",
    },
    {
        termId: "growthHormone",
        label: "Растежен хормон (GH)",
        effect: "Левцин и протеин – за възстановяване след натоварване.",
    },
    {
        termId: "thyroidHormones",
        label: "T3 / T4",
        effect: "Селен и протеин – за щитовидната и метаболитна функция.",
    },
];

function meatAmino(proteinG: number): FoodData["aminoAcids"] {
    const f = proteinG / 31;
    return {
        essential: {
            Leucine: round2(2.17 * f),
            Isoleucine: round2(1.53 * f),
            Valine: round2(1.44 * f),
            Lysine: round2(2.46 * f),
            Methionine: round2(0.8 * f),
            Phenylalanine: round2(1.15 * f),
            Threonine: round2(1.22 * f),
            Tryptophan: round2(0.34 * f),
            Histidine: round2(0.9 * f),
        },
        nonEssential: {
            GlutamicAcid: round2(4.33 * f),
            AsparticAcid: round2(2.58 * f),
            Alanine: round2(1.58 * f),
            Arginine: round2(1.75 * f),
            Glycine: round2(1.42 * f),
            Proline: round2(1.19 * f),
            Serine: round2(1.0 * f),
            Tyrosine: round2(0.98 * f),
            Cysteine: round2(0.37 * f),
        },
    };
}

function round2(n: number) {
    return Math.round(n * 100) / 100;
}

function meatFatBreakdown(
    fats: number,
    satRatio = 0.35,
    monoRatio = 0.45,
    polyRatio = 0.2,
): FoodFatEntry[] {
    return [
        {
            termId: "saturatedFat",
            label: "Наситени",
            grams: round2(fats * satRatio),
        },
        {
            termId: "monounsaturatedFat",
            label: "Мононенаситени",
            grams: round2(fats * monoRatio),
        },
        {
            termId: "polyunsaturatedFat",
            label: "Полиненаситени",
            grams: round2(fats * polyRatio),
        },
        {
            termId: "cholesterol",
            label: "Холестерол",
            amount: `${Math.round(fats * 25 + 50)} mg`,
        },
    ];
}

export const greenBellPepper: FoodData = {
    name: "Чушка (зелена, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "чушка",
        "зелена чушка",
        "зелени чушки",
        "green pepper",
        "bell pepper",
    ],
    protein: 0.9,
    fats: 0.2,
    carbs: 4.6,
    calories: 20,
    summary: "По-малко захар от червената – добър витамин C с малко калории.",
    aminoAcids: {
        essential: {
            Leucine: 0.03,
            Isoleucine: 0.02,
            Valine: 0.02,
            Lysine: 0.03,
            Methionine: 0.01,
            Phenylalanine: 0.02,
            Threonine: 0.02,
            Tryptophan: 0.01,
            Histidine: 0.01,
        },
        nonEssential: {
            GlutamicAcid: 0.1,
            AsparticAcid: 0.09,
            Alanine: 0.03,
            Arginine: 0.03,
            Glycine: 0.02,
            Proline: 0.02,
            Serine: 0.02,
            Tyrosine: 0.01,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: vegFat(0.03, 0.01, 0.08),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "80 mg" },
        { termId: "vitaminA", label: "A", amount: "370 IU" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.22 mg" },
        { termId: "vitaminK", label: "K", amount: "7.4 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "175 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "10 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "20 mg" },
        { termId: "sodium", label: "Натрий", amount: "3 mg" },
    ],
    hormoneInfluence: carbVegHormones,
};

export const potatoBoiled: FoodData = {
    name: "Картофи (варени, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "картоф",
        "картофи",
        "варени картофи",
        "boiled potato",
        "potato boiled",
    ],
    protein: 1.9,
    fats: 0.1,
    carbs: 20.1,
    calories: 87,
    summary:
        "Нишесте и калий – по-нисък гликемичен индекс от пържените; подходящи след варене с кожа.",
    aminoAcids: {
        essential: {
            Leucine: 0.07,
            Isoleucine: 0.05,
            Valine: 0.06,
            Lysine: 0.07,
            Methionine: 0.02,
            Phenylalanine: 0.05,
            Threonine: 0.05,
            Tryptophan: 0.02,
            Histidine: 0.02,
        },
        nonEssential: {
            GlutamicAcid: 0.28,
            AsparticAcid: 0.2,
            Alanine: 0.04,
            Arginine: 0.06,
            Glycine: 0.04,
            Proline: 0.04,
            Serine: 0.05,
            Tyrosine: 0.03,
            Cysteine: 0.02,
        },
    },
    fatBreakdown: vegFat(0.03, 0, 0.04),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "13 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.3 mg" },
        { termId: "vitaminB3", label: "B3 (ниацин)", amount: "1.4 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "9 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "379 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "22 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "54 mg" },
        { termId: "iron", label: "Желязо", amount: "0.3 mg" },
        { termId: "sodium", label: "Натрий", amount: "5 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Нишестето повишава инсулина – по-умерено от пържените картофи.",
        },
        {
            termId: "glucagon",
            label: "Глюкагон",
            effect: "При натоварване гликогенът от картофите възстановява мускулите.",
        },
        ...carbVegHormones.slice(1),
    ],
};

export const potatoBaked: FoodData = {
    name: "Картофи (печени, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "картоф",
        "картофи",
        "печени картофи",
        "baked potato",
        "potato baked",
    ],
    protein: 2.5,
    fats: 0.1,
    carbs: 21.2,
    calories: 93,
    summary:
        "Печен картоф без добавки – повече нишесте на 100 g, богат на калий и B6.",
    aminoAcids: potatoBoiled.aminoAcids,
    fatBreakdown: vegFat(0.03, 0, 0.04),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "10 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.33 mg" },
        { termId: "vitaminB3", label: "B3 (ниацин)", amount: "1.6 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "28 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "535 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "28 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "81 mg" },
        { termId: "iron", label: "Желязо", amount: "0.6 mg" },
        { termId: "sodium", label: "Натрий", amount: "10 mg" },
    ],
    hormoneInfluence: potatoBoiled.hormoneInfluence,
};

export const potatoFried: FoodData = {
    name: "Картофи (пържени, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "картоф",
        "картофи",
        "пържени",
        "пържени картофи",
        "fries",
        "french fries",
    ],
    protein: 3.4,
    fats: 15,
    carbs: 41,
    calories: 312,
    summary:
        "Много мазнина и нишесте – високи калории; по-висок гликемичен и инсулинов отговор.",
    aminoAcids: {
        essential: {
            Leucine: 0.12,
            Isoleucine: 0.08,
            Valine: 0.09,
            Lysine: 0.11,
            Methionine: 0.03,
            Phenylalanine: 0.08,
            Threonine: 0.08,
            Tryptophan: 0.02,
            Histidine: 0.04,
        },
        nonEssential: {
            GlutamicAcid: 0.4,
            AsparticAcid: 0.3,
            Alanine: 0.08,
            Arginine: 0.09,
            Glycine: 0.06,
            Proline: 0.06,
            Serine: 0.08,
            Tyrosine: 0.05,
            Cysteine: 0.03,
        },
    },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 2.3 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 5.6 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 5.9 },
        { termId: "omega3", label: "Омега-3", grams: 0.06 },
    ],
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "6 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.3 mg" },
        { termId: "vitaminB3", label: "B3 (ниацин)", amount: "2.3 mg" },
        { termId: "vitaminK", label: "K", amount: "12 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "535 mg" },
        { termId: "sodium", label: "Натрий", amount: "210 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "64 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "24 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Високи въглехидрати + мазнина → значителен инсулинов отговор.",
        },
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Много калории на порция – лесно надхвърляне на дневния прием.",
        },
        {
            termId: "ghrelin",
            label: "Грелин",
            effect: "Бързи нишестета и мазнини – краткотрайна ситост.",
        },
    ],
};

export const beansBoiled: FoodData = {
    name: "Боб (варен, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["боб", "варен боб", "боба", "beans", "kidney beans", "фасул"],
    protein: 8.7,
    fats: 0.5,
    carbs: 22.8,
    calories: 127,
    summary:
        "Протеин + фибри + желязо – бавно усвоими въглехидрати; добър за ситост и енергия.",
    aminoAcids: {
        essential: {
            Leucine: 0.61,
            Isoleucine: 0.35,
            Valine: 0.4,
            Lysine: 0.52,
            Methionine: 0.09,
            Phenylalanine: 0.41,
            Threonine: 0.33,
            Tryptophan: 0.09,
            Histidine: 0.24,
        },
        nonEssential: {
            GlutamicAcid: 0.89,
            AsparticAcid: 0.76,
            Alanine: 0.33,
            Arginine: 0.49,
            Glycine: 0.28,
            Proline: 0.32,
            Serine: 0.38,
            Tyrosine: 0.24,
            Cysteine: 0.09,
        },
    },
    fatBreakdown: vegFat(0.07, 0.04, 0.21),
    vitamins: [
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "130 µg" },
        { termId: "vitaminB1", label: "B1 (тиамин)", amount: "0.16 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.12 mg" },
        { termId: "vitaminB3", label: "B3 (ниацин)", amount: "0.5 mg" },
        { termId: "vitaminK", label: "K", amount: "8.4 µg" },
    ],
    minerals: [
        { termId: "iron", label: "Желязо", amount: "2.9 mg" },
        { termId: "potassium", label: "Калий", amount: "403 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "35 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "142 mg" },
        { termId: "zinc", label: "Цинк", amount: "1.0 mg" },
        { termId: "calcium", label: "Калций", amount: "28 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Въглехидратите + фибри – умерен, по-бавен инсулинов отговор.",
        },
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Високи фибри и протеин → дълготрайна ситост.",
        },
        {
            termId: "glucagon",
            label: "Глюкагон",
            effect: "Протеинът поддържа стабилна кръвна захар между хранения.",
        },
    ],
};

export const beefSteak: FoodData = {
    name: "Телешка пържола (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "телешко",
        "телешка",
        "пържола",
        "телешка пържола",
        "beef",
        "steak",
        "говеждо",
    ],
    protein: 26,
    fats: 17,
    carbs: 0,
    calories: 271,
    summary:
        "Много протеин и желязо – наситени мазнини и креатин; подходящо за мускули и сила.",
    aminoAcids: meatAmino(26),
    fatBreakdown: meatFatBreakdown(17, 0.4, 0.45, 0.1),
    vitamins: [
        { termId: "vitaminB12", label: "B12", amount: "2.5 µg" },
        { termId: "vitaminB3", label: "B3 (ниацин)", amount: "5.4 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.5 mg" },
        { termId: "vitaminB2", label: "B2 (рибофлавин)", amount: "0.2 mg" },
        { termId: "vitaminA", label: "A", amount: "0 IU" },
    ],
    minerals: [
        { termId: "iron", label: "Желязо", amount: "2.6 mg" },
        { termId: "zinc", label: "Цинк", amount: "5.8 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "200 mg" },
        { termId: "potassium", label: "Калий", amount: "315 mg" },
        { termId: "selenium", label: "Селен", amount: "22 µg" },
        { termId: "magnesium", label: "Магнезий", amount: "22 mg" },
    ],
    hormoneInfluence: meatHormones,
};

export const porkSteak: FoodData = {
    name: "Свинска пържола (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "свинско",
        "свинска",
        "пържола",
        "свинска пържола",
        "pork",
        "steak",
        "котлет",
    ],
    protein: 27,
    fats: 14,
    carbs: 0,
    calories: 242,
    summary:
        "Висок протеин, умерени мазнини – B1 и цинк; по-високо съдържание на мазнини от пилешкото.",
    aminoAcids: meatAmino(27),
    fatBreakdown: meatFatBreakdown(14, 0.38, 0.48, 0.12),
    vitamins: [
        { termId: "vitaminB1", label: "B1 (тиамин)", amount: "0.7 mg" },
        { termId: "vitaminB3", label: "B3 (ниацин)", amount: "6.5 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.5 mg" },
        { termId: "vitaminB12", label: "B12", amount: "0.6 µg" },
    ],
    minerals: [
        { termId: "zinc", label: "Цинк", amount: "2.4 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "220 mg" },
        { termId: "potassium", label: "Калий", amount: "380 mg" },
        { termId: "selenium", label: "Селен", amount: "35 µg" },
        { termId: "iron", label: "Желязо", amount: "0.9 mg" },
    ],
    hormoneInfluence: meatHormones,
};

export const apricotFresh: FoodData = {
    name: "Кайсии (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["кайсия", "кайсии", "apricot", "apricots"],
    protein: 1.4,
    fats: 0.4,
    carbs: 11.1,
    calories: 48,
    summary: "Бета-каротин, калий и фибри – сладки, умерени въглехидрати.",
    aminoAcids: {
        essential: {
            Leucine: 0.08,
            Isoleucine: 0.04,
            Valine: 0.05,
            Lysine: 0.06,
            Methionine: 0.01,
            Phenylalanine: 0.04,
            Threonine: 0.04,
            Tryptophan: 0.01,
            Histidine: 0.02,
        },
        nonEssential: {
            GlutamicAcid: 0.1,
            AsparticAcid: 0.15,
            Alanine: 0.05,
            Arginine: 0.04,
            Glycine: 0.03,
            Proline: 0.04,
            Serine: 0.04,
            Tyrosine: 0.02,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: vegFat(0.03, 0.08, 0.17),
    vitamins: [
        { termId: "vitaminA", label: "A", amount: "1926 IU" },
        { termId: "vitaminC", label: "C", amount: "10 mg" },
        { termId: "vitaminE", label: "E", amount: "0.9 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "9 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "259 mg" },
        { termId: "calcium", label: "Калций", amount: "13 mg" },
        { termId: "iron", label: "Желязо", amount: "0.4 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "10 mg" },
    ],
    hormoneInfluence: fruitHormones,
};

export const bananaFresh: FoodData = {
    name: "Банан (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["банан", "банани", "banana", "bananas"],
    protein: 1.1,
    fats: 0.3,
    carbs: 22.8,
    calories: 89,
    summary: "Калий и бързи въглехидрати – подходящ преди/след тренировка.",
    aminoAcids: {
        essential: {
            Leucine: 0.07,
            Isoleucine: 0.04,
            Valine: 0.05,
            Lysine: 0.05,
            Methionine: 0.01,
            Phenylalanine: 0.04,
            Threonine: 0.04,
            Tryptophan: 0.01,
            Histidine: 0.04,
        },
        nonEssential: {
            GlutamicAcid: 0.15,
            AsparticAcid: 0.12,
            Alanine: 0.04,
            Arginine: 0.05,
            Glycine: 0.04,
            Proline: 0.03,
            Serine: 0.04,
            Tyrosine: 0.02,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: vegFat(0.1, 0.03, 0.07),
    vitamins: [
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.37 mg" },
        { termId: "vitaminC", label: "C", amount: "8.7 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "20 µg" },
        { termId: "vitaminA", label: "A", amount: "64 IU" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "358 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "27 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "22 mg" },
        { termId: "manganese", label: "Манган", amount: "0.27 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "По-висок гликемичен отговор – бърза енергия след хранене.",
        },
        ...fruitHormones.slice(1),
    ],
};

export const appleFresh: FoodData = {
    name: "Ябълка (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["ябълка", "ябълки", "apple", "apples"],
    protein: 0.3,
    fats: 0.2,
    carbs: 13.8,
    calories: 52,
    summary: "Фибри (пектин), витамин C – по-нисък гликемичен ефект от банана.",
    aminoAcids: {
        essential: {
            Leucine: 0.01,
            Isoleucine: 0.01,
            Valine: 0.01,
            Lysine: 0.01,
            Methionine: 0,
            Phenylalanine: 0.01,
            Threonine: 0.01,
            Tryptophan: 0,
            Histidine: 0,
        },
        nonEssential: {
            GlutamicAcid: 0.03,
            AsparticAcid: 0.04,
            Alanine: 0.01,
            Arginine: 0.01,
            Glycine: 0.01,
            Proline: 0.01,
            Serine: 0.01,
            Tyrosine: 0.01,
            Cysteine: 0,
        },
    },
    fatBreakdown: vegFat(0.03, 0.01, 0.05),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "4.6 mg" },
        { termId: "vitaminK", label: "K", amount: "2.2 µg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "3 µg" },
        { termId: "vitaminA", label: "A", amount: "54 IU" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "107 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "11 mg" },
        { termId: "calcium", label: "Калций", amount: "6 mg" },
        { termId: "iron", label: "Желязо", amount: "0.1 mg" },
    ],
    hormoneInfluence: fruitHormones,
};

export const orangeFresh: FoodData = {
    name: "Портокал (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["портокал", "портокали", "orange", "oranges"],
    protein: 0.9,
    fats: 0.1,
    carbs: 11.8,
    calories: 47,
    summary: "Много витамин C и фолат – цитрусови захари с умерен гликемичен ефект.",
    aminoAcids: {
        essential: {
            Leucine: 0.02,
            Isoleucine: 0.02,
            Valine: 0.02,
            Lysine: 0.03,
            Methionine: 0.01,
            Phenylalanine: 0.02,
            Threonine: 0.02,
            Tryptophan: 0.01,
            Histidine: 0.01,
        },
        nonEssential: {
            GlutamicAcid: 0.18,
            AsparticAcid: 0.09,
            Alanine: 0.02,
            Arginine: 0.04,
            Glycine: 0.02,
            Proline: 0.02,
            Serine: 0.03,
            Tyrosine: 0.01,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: vegFat(0.02, 0.02, 0.03),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "53 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "40 µg" },
        { termId: "vitaminB1", label: "B1 (тиамин)", amount: "0.1 mg" },
        { termId: "vitaminA", label: "A", amount: "225 IU" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "181 mg" },
        { termId: "calcium", label: "Калций", amount: "40 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "10 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "14 mg" },
    ],
    hormoneInfluence: fruitHormones,
};

export const cabbageRaw: FoodData = {
    name: "Зеле (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["зеле", "зелето", "cabbage", "кисело зеле"],
    protein: 1.3,
    fats: 0.1,
    carbs: 5.8,
    calories: 25,
    summary: "Много фибри, витамин C и K – ниски калории, подходящо за обем.",
    aminoAcids: {
        essential: {
            Leucine: 0.04,
            Isoleucine: 0.03,
            Valine: 0.04,
            Lysine: 0.04,
            Methionine: 0.01,
            Phenylalanine: 0.03,
            Threonine: 0.03,
            Tryptophan: 0.01,
            Histidine: 0.02,
        },
        nonEssential: {
            GlutamicAcid: 0.12,
            AsparticAcid: 0.09,
            Alanine: 0.04,
            Arginine: 0.05,
            Glycine: 0.03,
            Proline: 0.03,
            Serine: 0.03,
            Tyrosine: 0.02,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: vegFat(0.02, 0.01, 0.04),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "36 mg" },
        { termId: "vitaminK", label: "K", amount: "76 µg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.12 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "43 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "170 mg" },
        { termId: "calcium", label: "Калций", amount: "40 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "12 mg" },
        { termId: "sodium", label: "Натрий", amount: "18 mg" },
    ],
    hormoneInfluence: carbVegHormones,
};

export const onionYellowCooked: FoodData = {
    name: "Лук (жълт, сготвен, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "лук",
        "жълт лук",
        "сготвен лук",
        "onion",
        "yellow onion",
        "cooked onion",
    ],
    protein: 1.4,
    fats: 0.2,
    carbs: 9.7,
    calories: 42,
    summary:
        "Сготвеният лук е по-сладък и по-лесен за стомаха – по-малко остри съединения.",
    aminoAcids: {
        essential: {
            Leucine: 0.03,
            Isoleucine: 0.02,
            Valine: 0.03,
            Lysine: 0.03,
            Methionine: 0.01,
            Phenylalanine: 0.02,
            Threonine: 0.02,
            Tryptophan: 0.01,
            Histidine: 0.01,
        },
        nonEssential: {
            GlutamicAcid: 0.2,
            AsparticAcid: 0.1,
            Alanine: 0.03,
            Arginine: 0.04,
            Glycine: 0.02,
            Proline: 0.03,
            Serine: 0.02,
            Tyrosine: 0.02,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: vegFat(0.04, 0.02, 0.06),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "5 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.13 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "19 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "157 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "32 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "11 mg" },
        { termId: "sodium", label: "Натрий", amount: "3 mg" },
    ],
    hormoneInfluence: carbVegHormones,
};

export const onionGreen: FoodData = {
    name: "Зелен лук (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "зелен лук",
        "праз",
        "scallion",
        "spring onion",
        "green onion",
    ],
    protein: 1.8,
    fats: 0.2,
    carbs: 7.3,
    calories: 32,
    summary: "По-малко калории от жълтия – витамин K и C, лек луков вкус.",
    aminoAcids: {
        essential: {
            Leucine: 0.04,
            Isoleucine: 0.03,
            Valine: 0.04,
            Lysine: 0.04,
            Methionine: 0.01,
            Phenylalanine: 0.03,
            Threonine: 0.03,
            Tryptophan: 0.01,
            Histidine: 0.02,
        },
        nonEssential: {
            GlutamicAcid: 0.14,
            AsparticAcid: 0.1,
            Alanine: 0.04,
            Arginine: 0.05,
            Glycine: 0.03,
            Proline: 0.03,
            Serine: 0.03,
            Tyrosine: 0.02,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: vegFat(0.03, 0.02, 0.08),
    vitamins: [
        { termId: "vitaminK", label: "K", amount: "173 µg" },
        { termId: "vitaminC", label: "C", amount: "18 mg" },
        { termId: "vitaminA", label: "A", amount: "997 IU" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "64 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "276 mg" },
        { termId: "calcium", label: "Калций", amount: "72 mg" },
        { termId: "iron", label: "Желязо", amount: "1.5 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "20 mg" },
    ],
    hormoneInfluence: carbVegHormones,
};

export const onionRedRaw: FoodData = {
    name: "Лук (червен, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["лук", "червен лук", "red onion", "onion red"],
    protein: 1.1,
    fats: 0.1,
    carbs: 9.3,
    calories: 40,
    summary:
        "Антоциани (червен пигмент), витамин C – по-остър вкус суров, подходящ за салати.",
    aminoAcids: onionYellowCooked.aminoAcids,
    fatBreakdown: vegFat(0.02, 0.01, 0.04),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "7 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.12 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "19 µg" },
        { termId: "vitaminK", label: "K", amount: "0.4 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "190 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "29 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "10 mg" },
        { termId: "calcium", label: "Калций", amount: "23 mg" },
    ],
    hormoneInfluence: carbVegHormones,
};

export const zucchiniRaw: FoodData = {
    name: "Тиквичка (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "тиквичка",
        "тиквички",
        "zucchini",
        "courgette",
    ],
    protein: 1.2,
    fats: 0.3,
    carbs: 3.1,
    calories: 17,
    summary: "Много вода, малко калории – лек вкус, подходящ за готвене и салати.",
    aminoAcids: {
        essential: {
            Leucine: 0.04,
            Isoleucine: 0.02,
            Valine: 0.03,
            Lysine: 0.03,
            Methionine: 0.01,
            Phenylalanine: 0.02,
            Threonine: 0.02,
            Tryptophan: 0.01,
            Histidine: 0.01,
        },
        nonEssential: {
            GlutamicAcid: 0.1,
            AsparticAcid: 0.09,
            Alanine: 0.03,
            Arginine: 0.04,
            Glycine: 0.02,
            Proline: 0.02,
            Serine: 0.03,
            Tyrosine: 0.01,
            Cysteine: 0.01,
        },
    },
    fatBreakdown: vegFat(0.06, 0.02, 0.09),
    vitamins: [
        { termId: "vitaminC", label: "C", amount: "18 mg" },
        { termId: "vitaminB6", label: "B6 (пиридоксин)", amount: "0.16 mg" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "24 µg" },
        { termId: "vitaminK", label: "K", amount: "4.3 µg" },
    ],
    minerals: [
        { termId: "potassium", label: "Калий", amount: "261 mg" },
        { termId: "magnesium", label: "Магнезий", amount: "18 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "38 mg" },
        { termId: "manganese", label: "Манган", amount: "0.16 mg" },
    ],
    hormoneInfluence: carbVegHormones,
};

const cheeseHormones: FoodHormoneInfluence[] = [
    {
        termId: "insulin",
        label: "Инсулин",
        effect: "Малко въглехидрати (сирене) или почти никакви (кашкавал) – умерен отговор.",
    },
    {
        termId: "leptin",
        label: "Лептин",
        effect: "Мазнини + протеин → добра ситост, но много калории на 100 g.",
    },
    {
        termId: "testosterone",
        label: "Тестостерон",
        effect: "Мазнини и цинк – градивни елементи за стероидни хормони.",
    },
    {
        termId: "growthHormone",
        label: "Растежен хормон (GH)",
        effect: "Пълноценен протеин (особено кашкавал) – за възстановяване.",
    },
];

export const kashkaval: FoodData = {
    name: "Кашкавал (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "кашкавал",
        "кашкавала",
        "kashkaval",
        "yellow cheese",
        "сирене кашкавал",
    ],
    protein: 25,
    fats: 30,
    carbs: 0.6,
    calories: 379,
    summary:
        "Твърдо жълто сирене – много протеин и мазнини, калций и B12; концентрирани калории.",
    aminoAcids: meatAmino(25),
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 19 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 8.5 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 1.2 },
        { termId: "cholesterol", label: "Холестерол", amount: "78 mg" },
    ],
    vitamins: [
        { termId: "vitaminB12", label: "B12", amount: "1.1 µg" },
        { termId: "vitaminA", label: "A", amount: "1002 IU" },
        { termId: "vitaminB2", label: "B2 (рибофлавин)", amount: "0.38 mg" },
        { termId: "vitaminB5", label: "B5 (пантотенова)", amount: "0.4 mg" },
        { termId: "vitaminD", label: "D", amount: "24 IU" },
    ],
    minerals: [
        { termId: "calcium", label: "Калций", amount: "710 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "455 mg" },
        { termId: "sodium", label: "Натрий", amount: "621 mg" },
        { termId: "zinc", label: "Цинк", amount: "3.1 mg" },
        { termId: "selenium", label: "Селен", amount: "14 µg" },
    ],
    hormoneInfluence: cheeseHormones,
};

export const sirene: FoodData = {
    name: "Сирене (бяло, на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: [
        "сирене",
        "сиренето",
        "бяло сирене",
        "feta",
        "sirene",
        "brined cheese",
    ],
    protein: 14,
    fats: 21,
    carbs: 4,
    calories: 264,
    summary:
        "Бяло салатно сирене – солено, калций и протеин; повече вода и малко въглехидрати от кашкавала.",
    aminoAcids: meatAmino(14),
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 15 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 4.6 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 0.9 },
        { termId: "cholesterol", label: "Холестерол", amount: "89 mg" },
    ],
    vitamins: [
        { termId: "vitaminB12", label: "B12", amount: "1.7 µg" },
        { termId: "vitaminB2", label: "B2 (рибофлавин)", amount: "0.5 mg" },
        { termId: "vitaminA", label: "A", amount: "422 IU" },
        { termId: "vitaminB9", label: "B9 (фолат)", amount: "32 µg" },
    ],
    minerals: [
        { termId: "calcium", label: "Калций", amount: "493 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "337 mg" },
        { termId: "sodium", label: "Натрий", amount: "1116 mg" },
        { termId: "zinc", label: "Цинк", amount: "2.9 mg" },
        { termId: "selenium", label: "Селен", amount: "8.5 µg" },
    ],
    hormoneInfluence: [
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Малко въглехидрати (лактоза) – лек инсулинов отговор.",
        },
        ...cheeseHormones.slice(1),
    ],
};

export const butter: FoodData = {
    name: "Масло (на 100 г)",
    portionLabel: FOOD_PORTION_PER_100G,
    searchTerms: ["масло", "краве масло", "butter", "сливочно масло"],
    protein: 0.9,
    fats: 81,
    carbs: 0.1,
    calories: 717,
    summary:
        "Почти чиста мазнина – много наситени, витамин A; без протеин и въглехидрати на практика.",
    aminoAcids: { essential: {}, nonEssential: {} },
    fatBreakdown: [
        { termId: "saturatedFat", label: "Наситени", grams: 51 },
        { termId: "monounsaturatedFat", label: "Мононенаситени", grams: 21 },
        { termId: "polyunsaturatedFat", label: "Полиненаситени", grams: 3.3 },
        { termId: "cholesterol", label: "Холестерол", amount: "215 mg" },
    ],
    vitamins: [
        { termId: "vitaminA", label: "A", amount: "2499 IU" },
        { termId: "vitaminE", label: "E", amount: "2.3 mg" },
        { termId: "vitaminK", label: "K", amount: "7 µg" },
        { termId: "vitaminB12", label: "B12", amount: "0.2 µg" },
    ],
    minerals: [
        { termId: "calcium", label: "Калций", amount: "24 mg" },
        { termId: "sodium", label: "Натрий", amount: "643 mg" },
        { termId: "phosphorus", label: "Фосфор", amount: "24 mg" },
        { termId: "potassium", label: "Калий", amount: "24 mg" },
    ],
    hormoneInfluence: [
        {
            termId: "leptin",
            label: "Лептин",
            effect: "Много калории на малък обем – лесно надхвърляне на дневния прием.",
        },
        {
            termId: "insulin",
            label: "Инсулин",
            effect: "Почти нулеви въглехидрати – минимален инсулинов отговор.",
        },
        {
            termId: "testosterone",
            label: "Тестостерон",
            effect: "Холестеролът е предшественик на стероидните хормони.",
        },
        {
            termId: "ghrelin",
            label: "Грелин",
            effect: "Мазнините забавят гладa при добавка към храна.",
        },
    ],
};

export const additionalFoods: FoodData[] = [
    greenBellPepper,
    potatoFried,
    potatoBoiled,
    potatoBaked,
    beansBoiled,
    beefSteak,
    porkSteak,
    apricotFresh,
    bananaFresh,
    appleFresh,
    orangeFresh,
    cabbageRaw,
    onionYellowCooked,
    onionGreen,
    onionRedRaw,
    zucchiniRaw,
    kashkaval,
    sirene,
    butter,
];
