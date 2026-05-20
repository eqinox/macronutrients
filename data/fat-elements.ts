import { Element, ElementId } from "@/lib/types";

export const triglyceride: Element = {
    name: "Триглицерид",
    description:
        "Основната форма, в която мазнините се съхраняват в храната и в тялото. Състои се от глицерол + три мастни киселини.",
    properties: [
        {
            action: "В храната и в тялото",
            itemsAboutAction: [
                {
                    startingPhrase: "Диетни мазнини",
                    description:
                        "Повечето мазнини в масло, олио, ядки и месо са триглицериди.",
                },
                {
                    startingPhrase: "Складиране",
                    description:
                        "Излишната енергия се депозира в мастна тъкан под формата на триглицериди.",
                },
            ],
        },
    ],
};

export const fatsOverview: Element = {
    name: "Роля на мазнините в тялото",
    description:
        "Мазнините са концентриран източник на енергия (9 kcal/г) и са нужни за хормони, клетъчни мембрани и усвояване на разтворими витамини (A, D, E, K). В диетата основно идват като {{triglyceride|триглицериди}}.",
    properties: [
        {
            action: "Основни функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Енергия",
                    description:
                        "Осигуряват енергия в покой и при нискоинтензивни дейности; гликогенът е по-важен при висок интензитет.",
                },
                {
                    startingPhrase: "Клетъчни мембрани",
                    description:
                        "Мастните киселини влияят на гъвкавостта и сигнализацията на клетките.",
                },
                {
                    startingPhrase: "Хормони",
                    description:
                        "Холестеролът е градивен елемент за стероидни хормони (тестостерон, естроген, кортизол).",
                },
            ],
        },
        {
            action: "Как се делят мазнините",
            itemsAboutAction: [
                {
                    startingPhrase: "Наситени",
                    termId: "saturatedFat",
                    description: "По-стабилни на стайна температура, често твърди.",
                },
                {
                    startingPhrase: "Ненаситени",
                    termId: "monounsaturatedFat",
                    description:
                        "Включват {{monounsaturatedFat|моно-}} и {{omega3|омега-3}}/{{omega6|омега-6}} полиненаситени.",
                },
                {
                    startingPhrase: "Транс",
                    termId: "transFat",
                    description: "Нежелани за редовна консумация.",
                },
            ],
        },
    ],
};

export const saturatedFat: Element = {
    name: "Наситени мазнини",
    description:
        "Мастни киселини без двойни връзки между въглеродните атоми. На стайна температура често са твърди (масло, кокосово масло, мазнини в месо).",
    properties: [
        {
            action: "Хранителни източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Животински продукти",
                    description:
                        "Говеждо, свинско, масло, сирена, пълномаслено мляко.",
                },
                {
                    startingPhrase: "Растителни източници",
                    description:
                        "Кокосово масло, палмово масло, какаово масло.",
                },
            ],
        },
        {
            action: "Здравословен контекст",
            itemsAboutAction: [
                {
                    startingPhrase: "Умереност",
                    description:
                        "Не е нужно да ги избягваш напълно, но е разумно да не доминират в менюто.",
                },
                {
                    startingPhrase: "Баланс",
                    description:
                        "Комбинирай с {{monounsaturatedFat|мононенаситени}} и {{omega3|омега-3}} за по-добър липиден профил.",
                },
            ],
        },
    ],
};

export const monounsaturatedFat: Element = {
    name: "Мононенаситени мазнини",
    description:
        "Имат една двойна връзка в мастната киселина. Считат се за полезни за сърдечно-съдовото здраве, особено в рамките на средиземноморски тип хранене.",
    properties: [
        {
            action: "Основни източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Зехтин",
                    description:
                        "Богат на олеинова киселина – основен източник в Средиземноморието.",
                },
                {
                    startingPhrase: "Ядки и авокадо",
                    description: "Бадеми, фъстъци, авокадо, маслини.",
                },
            ],
        },
        {
            action: "Ползи",
            itemsAboutAction: [
                {
                    startingPhrase: "Липиден профил",
                    description:
                        "Могат да помогнат за по-добър баланс на „добрия“ и „лошия“ холестерол при замяна на част от наситените мазнини.",
                },
                {
                    startingPhrase: "Практичен съвет",
                    description:
                        "Използвай зехтин за салати и готвене на умерен огън вместо излишък от твърди мазнини.",
                },
            ],
        },
    ],
};

export const omega3: Element = {
    name: "Омега-3 мастни киселини",
    description:
        "Полиненаситени мазнини с противовъзпалителна роля. Важни за сърцето, мозъка и възстановяването след тренировка.",
    properties: [
        {
            action: "Видове и източници",
            itemsAboutAction: [
                {
                    startingPhrase: "ALA (растителен)",
                    description:
                        "Ленено семе, чиа, орехи – тялото го превръща частично в EPA/DHA.",
                },
                {
                    startingPhrase: "EPA и DHA (морски)",
                    description:
                        "Сьомга, сардини, скумрия, херинга – най-директните форми за тялото.",
                },
            ],
        },
        {
            action: "Защо са важни",
            itemsAboutAction: [
                {
                    startingPhrase: "Сърце и мозък",
                    description:
                        "Подпомагат сърдечно-съдовата функция и когнитивното здраве.",
                },
                {
                    startingPhrase: "Баланс с омега-6",
                    description:
                        "Съвременната диета често има твърде много {{omega6|омега-6}} спрямо омега-3 – стреми се към по-добро съотношение.",
                },
            ],
        },
    ],
};

export const omega6: Element = {
    name: "Омега-6 мастни киселини",
    description:
        "Също полиненаситени и необходими, но в излишък могат да насърчат възпалителни процеси, ако не са балансирани с {{omega3|омега-3}}.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Растителни масла",
                    description:
                        "Слънчогледово, царевично, соево, шафраново масло.",
                },
                {
                    startingPhrase: "Преработени храни",
                    description:
                        "Често срещани в пакетирани продукти и ресторански готвене.",
                },
            ],
        },
        {
            action: "Баланс в менюто",
            itemsAboutAction: [
                {
                    startingPhrase: "Не са „лоши“",
                    description:
                        "Тялото се нуждае от тях, но ключът е съотношението омега-6 : омега-3.",
                },
                {
                    startingPhrase: "Практика",
                    description:
                        "Повече риба, ленено семе и по-малко преработени снекове с растителни масла.",
                },
            ],
        },
    ],
};

export const transFat: Element = {
    name: "Транс мазнини",
    description:
        "Мастни киселини с неестествена геометрия (често от индустриално хидрогениране). Свързват се с по-лош липиден профил и по-висок кардиоваскуларен риск.",
    properties: [
        {
            action: "Откъде идват",
            itemsAboutAction: [
                {
                    startingPhrase: "Преработени храни",
                    description:
                        "Маргарини, пакетирани сладки изделия, бисквити, пържени полуфабрикати.",
                },
                {
                    startingPhrase: "Етикет",
                    description:
                        "Търси „частично хидрогенирани“ масла или много нискокачествени готвени продукти.",
                },
            ],
        },
        {
            action: "Препоръка",
            itemsAboutAction: [
                {
                    startingPhrase: "Минимизирай",
                    description:
                        "Колкото е по-близо до нула в ежедневието, толкова по-добре.",
                },
                {
                    startingPhrase: "Замени",
                    description:
                        "Предпочитай {{monounsaturatedFat|зехтин}}, ядки и цели храни вместо индустриални сладкиши.",
                },
            ],
        },
    ],
};

export const cholesterol: Element = {
    name: "Холестерол",
    description:
        "Стерол, важен за клетъчни мембрани и производство на хормони. Тялото произвежда собствен холестерол; хранителният холестерол има по-малък ефект при повечето хора от наситените и {{transFat|транс мазнините}}.",
    properties: [
        {
            action: "В храната",
            itemsAboutAction: [
                {
                    startingPhrase: "Източници",
                    description:
                        "Жълтък, месо, морски храни, масло, сирена.",
                },
                {
                    startingPhrase: "Яйца",
                    description:
                        "Яйцата са богати на холестерол, но съдържат и качествен протеин и микронутриенти.",
                },
            ],
        },
        {
            action: "Кръвен холестерол",
            itemsAboutAction: [
                {
                    startingPhrase: "LDL и HDL",
                    description:
                        "„Лошият“ (LDL) и „добрият“ (HDL) холестерол зависят от цялостния начин на хранене, активност и генетика.",
                },
                {
                    startingPhrase: "Какво помага",
                    description:
                        "Фибри, {{omega3|омега-3}}, {{monounsaturatedFat|мононенаситени мазнини}} и движение.",
                },
            ],
        },
    ],
};

const elementRegistry: Record<ElementId, Element> = {
    triglyceride,
    fatsOverview,
    saturatedFat,
    monounsaturatedFat,
    omega3,
    omega6,
    transFat,
    cholesterol,
};

export function getElementById(id: ElementId): Element | undefined {
    return elementRegistry[id];
}
