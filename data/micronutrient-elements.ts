import { Element, ElementId } from "@/lib/types";

export const micronutrientsOverview: Element = {
    name: "Роля на микронутриентите",
    description:
        "Витамини и минерали, нужни в малки количества, но критични за имунитет, енергия, кости, нерви и възстановяване. Не дават калории като макронутриентите, но без тях метаболизмът не работи оптимално.",
    properties: [
        {
            action: "Всички витамини (13)",
            itemsAboutAction: [
                {
                    startingPhrase: "Витамин A",
                    termId: "vitaminA",
                    description: "Мазниноразтворим – зрение, кожа, имунитет.",
                },
                {
                    startingPhrase: "Витамин D",
                    termId: "vitaminD",
                    description: "Мазниноразтворим – кости, имунитет.",
                },
                {
                    startingPhrase: "Витамин E",
                    termId: "vitaminE",
                    description: "Мазниноразтворим – антиоксидант.",
                },
                {
                    startingPhrase: "Витамин K",
                    termId: "vitaminK",
                    description: "Мазниноразтворим – съсирване, кости.",
                },
                {
                    startingPhrase: "Витамин C",
                    termId: "vitaminC",
                    description: "Водоразтворим – колаген, имунитет, желязо.",
                },
                {
                    startingPhrase: "Витамин B1",
                    termId: "vitaminB1",
                    description: "Тиамин – енергия от въглехидрати.",
                },
                {
                    startingPhrase: "Витамин B2",
                    termId: "vitaminB2",
                    description: "Рибофлавин – енергия, кожа, очи.",
                },
                {
                    startingPhrase: "Витамин B3",
                    termId: "vitaminB3",
                    description: "Ниацин – енергия, нерви, кожа.",
                },
                {
                    startingPhrase: "Витамин B5",
                    termId: "vitaminB5",
                    description: "Пантотенова киселина – енергия, хормони.",
                },
                {
                    startingPhrase: "Витамин B6",
                    termId: "vitaminB6",
                    description: "Пиридоксин – аминокиселини, кръв.",
                },
                {
                    startingPhrase: "Витамин B7",
                    termId: "vitaminB7",
                    description: "Биотин – коса, кожа, метаболизъм.",
                },
                {
                    startingPhrase: "Витамин B9",
                    termId: "vitaminB9",
                    description: "Фолат – клетъчно делене, ДНК.",
                },
                {
                    startingPhrase: "Витамин B12",
                    termId: "vitaminB12",
                    description: "Кобаламин – кръв, нерви.",
                },
            ],
        },
        {
            action: "Всички минерали (17)",
            itemsAboutAction: [
                {
                    startingPhrase: "Калций",
                    termId: "calcium",
                    description: "Макроминерал – кости, зъби, мускули.",
                },
                {
                    startingPhrase: "Фосфор",
                    termId: "phosphorus",
                    description: "Макроминерал – кости, АТФ, енергия.",
                },
                {
                    startingPhrase: "Магнезий",
                    termId: "magnesium",
                    description: "Макроминерал – мускули, нерви, енергия.",
                },
                {
                    startingPhrase: "Натрий",
                    termId: "sodium",
                    description: "Макроминерал – течности, електролити.",
                },
                {
                    startingPhrase: "Калий",
                    termId: "potassium",
                    description: "Макроминерал – сърце, кръвно налягане.",
                },
                {
                    startingPhrase: "Хлорид",
                    termId: "chloride",
                    description: "Макроминерал – електролит, храносмилане.",
                },
                {
                    startingPhrase: "Сяра",
                    termId: "sulfur",
                    description: "Макроминерал – аминокиселини, детоксикация.",
                },
                {
                    startingPhrase: "Желязо",
                    termId: "iron",
                    description: "Микроелемент – кислород, енергия.",
                },
                {
                    startingPhrase: "Цинк",
                    termId: "zinc",
                    description: "Микроелемент – имунитет, рани.",
                },
                {
                    startingPhrase: "Мед",
                    termId: "copper",
                    description: "Микроелемент – желязо, колаген.",
                },
                {
                    startingPhrase: "Манган",
                    termId: "manganese",
                    description: "Микроелемент – кости, антиоксиданти.",
                },
                {
                    startingPhrase: "Йод",
                    termId: "iodine",
                    description: "Микроелемент – щитовидна жлеза.",
                },
                {
                    startingPhrase: "Селен",
                    termId: "selenium",
                    description: "Микроелемент – антиоксидант, щитовидна.",
                },
                {
                    startingPhrase: "Хром",
                    termId: "chromium",
                    description: "Микроелемент – инсулин, кръвна захар.",
                },
                {
                    startingPhrase: "Молибден",
                    termId: "molybdenum",
                    description: "Микроелемент – ензими, детоксикация.",
                },
                {
                    startingPhrase: "Флуорид",
                    termId: "fluoride",
                    description: "Микроелемент – зъбен емайл.",
                },
                {
                    startingPhrase: "Кобалт",
                    termId: "cobalt",
                    description: "Микроелемент – част от витамин B12.",
                },
            ],
        },
    ],
};

export const vitaminA: Element = {
    name: "Витамин A",
    description:
        "Мазниноразтворим витамин, важен за зрение, кожа и имунитет. В храната често идва като бета-каротин от растителни източници.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                { startingPhrase: "Зрение", description: "Поддържа нощното виждане и здравето на роговицата." },
                { startingPhrase: "Имунитет", description: "Подпомага бариерната функция на кожата и лигавиците." },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Животински", description: "Черен дроб, рибени масла, яйчен жълтък." },
                { startingPhrase: "Растителни (провитамин A)", description: "Моркови, сладък картоф, тиква, спанак." },
            ],
        },
    ],
};

export const vitaminD: Element = {
    name: "Витамин D",
    description:
        "Мазниноразтворим „слънчев витамин“, ключов за усвояване на {{calcium|калций}} и здравето на костите.",
    properties: [
        {
            action: "Защо е важен",
            itemsAboutAction: [
                { startingPhrase: "Кости", description: "Регулира калций и фосфор в костната тъкан." },
                { startingPhrase: "Имунитет и мускули", description: "Свързан с имунна функция и мускулна сила." },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Слънце", description: "Кожата синтезира витамин D при UV лъчение." },
                { startingPhrase: "Храна", description: "Мазна риба, яйчен жълтък, обогатени млечни продукти." },
            ],
        },
    ],
};

export const vitaminE: Element = {
    name: "Витамин E",
    description: "Мазниноразтворим антиоксидант, който защитава клетъчните мембрани от окислителен стрес.",
    properties: [
        {
            action: "Роля",
            itemsAboutAction: [
                { startingPhrase: "Антиоксидант", description: "Нейтрализира свободни радикали в мазнините на клетките." },
                { startingPhrase: "Кожа", description: "Често използван в грижа за кожата поради защитната роля." },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Ядки и семена", description: "Слънчогледови семки, бадеми, лешници." },
                { startingPhrase: "Масла", description: "Зехтин, слънчогледово масло, пшеничен зародиш." },
            ],
        },
    ],
};

export const vitaminK: Element = {
    name: "Витамин K",
    description: "Мазниноразтворим витамин, необходим за съсирване на кръвта и метаболизма на костите.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                { startingPhrase: "Кръвосъсирване", description: "Активира протеини, нужни за нормално съсирване." },
                { startingPhrase: "Кости", description: "Участва в отлагането на калций в костната тъкан." },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Зелени листни", description: "Спанак, кейл, броколи, маруля." },
                { startingPhrase: "Ферментация", description: "Частично се произвежда от чревната микрофлора." },
            ],
        },
    ],
};

export const vitaminC: Element = {
    name: "Витамин C",
    description:
        "Водоразтворим антиоксидант. Подпомага имунитета, усвояването на {{iron|желязо}} и синтеза на колаген.",
    properties: [
        {
            action: "Ползи",
            itemsAboutAction: [
                { startingPhrase: "Колаген", description: "Важен за кожа, сухожилия, кости и заздравяване на рани." },
                { startingPhrase: "Антиоксидант", description: "Защитава клетките при стрес и тренировки." },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Плодове", description: "Цитруси, киви, ягоди, папая." },
                { startingPhrase: "Зеленчуци", description: "Чушки, броколи, домати, магданоз." },
            ],
        },
    ],
};

export const bComplexOverview: Element = {
    name: "Витамини от група B",
    description:
        "Водоразтворима група от 8 витамина, които помагат за превръщането на храната в енергия и поддържат нервната система.",
    properties: [
        {
            action: "Всички витамини от група B",
            itemsAboutAction: [
                {
                    startingPhrase: "B1 (тиамин)",
                    termId: "vitaminB1",
                    description: "Енергия от въглехидрати.",
                },
                {
                    startingPhrase: "B2 (рибофлавин)",
                    termId: "vitaminB2",
                    description: "Енергия, кожа, очи.",
                },
                {
                    startingPhrase: "B3 (ниацин)",
                    termId: "vitaminB3",
                    description: "Енергия, нерви.",
                },
                {
                    startingPhrase: "B5 (пантотенова киселина)",
                    termId: "vitaminB5",
                    description: "Енергия, хормони.",
                },
                {
                    startingPhrase: "B6 (пиридоксин)",
                    termId: "vitaminB6",
                    description: "Аминокиселини, кръв.",
                },
                {
                    startingPhrase: "B7 (биотин)",
                    termId: "vitaminB7",
                    description: "Коса, кожа, метаболизъм.",
                },
                {
                    startingPhrase: "B9 (фолат)",
                    termId: "vitaminB9",
                    description: "ДНК, клетъчно делене.",
                },
                {
                    startingPhrase: "B12 (кобаламин)",
                    termId: "vitaminB12",
                    description: "Кръв, нерви.",
                },
            ],
        },
        {
            action: "Обща роля",
            itemsAboutAction: [
                {
                    startingPhrase: "Енергийен метаболизъм",
                    description: "Участват в обработката на въглехидрати, мазнини и протеини.",
                },
                {
                    startingPhrase: "Нерви и кръв",
                    description:
                        "{{vitaminB6|B6}}, {{vitaminB9|B9}} и {{vitaminB12|B12}} са ключови за невротрансмитери и кръвообразуване.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Цели зърна", description: "Овес, кафяв ориз, пълнозърнест хляб." },
                { startingPhrase: "Бобови и месо", description: "Боб, леща, говеждо, пилешко, черен дроб." },
            ],
        },
    ],
};

export const vitaminB1: Element = {
    name: "Витамин B1 (тиамин)",
    description: "Помага за превръщането на въглехидратите в енергия и поддържа нервната система.",
    properties: [
        {
            action: "Източници и бележки",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Свинско, бобови, ориз, слънчогледови семки." },
                { startingPhrase: "Дефицит", description: "Рядък при балансирано хранене; по-чест при висок прием на алкохол." },
            ],
        },
    ],
};

export const vitaminB2: Element = {
    name: "Витамин B2 (рибофлавин)",
    description: "Участва в енергийния метаболизъм и поддържа здравето на кожата и очите.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Мляко, яйца, бадеми, спанак, говеждо." },
                { startingPhrase: "Светлочувствителност", description: "Разрушава се от продължителна силна светлина – съхранявай млякото на тъмно." },
            ],
        },
    ],
};

export const vitaminB3: Element = {
    name: "Витамин B3 (ниацин)",
    description: "Подпомага производството на енергия и здравето на кожата и нервната система.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Пилешко, риба тон, фъстъци, гъби, пълнозърнести." },
                { startingPhrase: "Тялото", description: "Може да се синтезира частично от аминокиселината триптофан." },
            ],
        },
    ],
};

export const vitaminB5: Element = {
    name: "Витамин B5 (пантотенова киселина)",
    description:
        "Необходим за синтеза на коензим A и метаболизма на мазнини, въглехидрати и протеини.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Енергия",
                    description: "Участва в производството на енергия в митохондриите.",
                },
                {
                    startingPhrase: "Хормони",
                    description: "Подпомага синтеза на стероидни хормони и невротрансмитери.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Храни",
                    description:
                        "Гъби, яйца, пилешко, говеждо, авокадо, броколи, цели зърна.",
                },
                {
                    startingPhrase: "Разпространение",
                    description:
                        "Среща се в почти всички храни, затова дефицитът е рядък.",
                },
            ],
        },
    ],
};

export const vitaminB6: Element = {
    name: "Витамин B6",
    description: "Важен за метаболизма на аминокиселини, формиране на червени кръвни клетки и нервна функция.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Пиле, риба, картофи, банани, нахут." },
                { startingPhrase: "Спорт", description: "При интензивни тренировки нуждите могат леко да се покачат." },
            ],
        },
    ],
};

export const vitaminB7: Element = {
    name: "Витамин B7 (биотин)",
    description:
        "Подпомага метаболизма на мазнини, въглехидрати и протеини. Често се свързва с коса, кожа и нокти.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Метаболизъм",
                    description: "Кофактор за ензими, които обработват хранителните вещества.",
                },
                {
                    startingPhrase: "Коса и кожа",
                    description:
                        "При дефицит може да има косопад и кожни промени.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Храни",
                    description:
                        "Яйчен жълтък, фъстъци, бадеми, сладък картоф, спанак, черен дроб.",
                },
                {
                    startingPhrase: "Чревна флора",
                    description:
                        "Частично се произвежда от бактериите в червата.",
                },
            ],
        },
    ],
};

export const vitaminB9: Element = {
    name: "Витамин B9 (фолат)",
    description: "Критичен за деленето на клетки, синтеза на ДНК и здравословна бременност.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Зелени листни, бобови, цитруси, обогатени зърнени." },
                { startingPhrase: "Готвене", description: "Фолатът е чувствителен на топлина – включвай и пресни зеленчуци." },
            ],
        },
    ],
};

export const vitaminB12: Element = {
    name: "Витамин B12",
    description: "Необходим за кръвообразуване, нервна система и енергия. Липсва в чисто растителни източници.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Животински", description: "Месо, риба, яйца, млечни продукти." },
                { startingPhrase: "Веган диета", description: "Нужни са обогатени храни или добавка под наблюдение." },
            ],
        },
    ],
};

export const calcium: Element = {
    name: "Калций",
    description:
        "Най-изобилният минерал в тялото. Основен градивен елемент на костите и зъбите; важен за мускулна контракция и нервни импулси.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                { startingPhrase: "Кости", description: "Работи заедно с {{vitaminD|витамин D}} и {{magnesium|магнезий}}." },
                { startingPhrase: "Мускули", description: "Нужен за съкращение и сърдечен ритъм." },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Млечни", description: "Мляко, кисело мляко, сирена." },
                { startingPhrase: "Растителни", description: "Сусам, броколи, бобови, обогатени напитки." },
            ],
        },
    ],
};

export const magnesium: Element = {
    name: "Магнезий",
    description: "Участва в над 300 ензимни реакции – енергия, мускули, нерви и качество на съня.",
    properties: [
        {
            action: "Ползи",
            itemsAboutAction: [
                { startingPhrase: "Мускули", description: "Свързан с по-малко крампи и по-добро възстановяване." },
                { startingPhrase: "Стрес и сън", description: "Подпомага релаксацията на нервната система." },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Тъмно шоколадо, ядки, семена, спанак, боб." },
                { startingPhrase: "Дефицит", description: "Чест при ниски калории, висок стрес и интензивен спорт." },
            ],
        },
    ],
};

export const sodium: Element = {
    name: "Натрий",
    description: "Електролит, важен за течности, нервна проводимост и мускулна функция. В диетата идва основно от сол.",
    properties: [
        {
            action: "Баланс",
            itemsAboutAction: [
                {
                    startingPhrase: "С {{potassium|калий}}",
                    description: "Твърде много натрий и малко калий са свързани с високо кръвно налягане.",
                },
                { startingPhrase: "Спорт", description: "При много потене може да са нужни електролити, не само вода." },
            ],
        },
        {
            action: "Практика",
            itemsAboutAction: [
                { startingPhrase: "Ограничи преработените", description: "Готови ястия, колбаси, снекове." },
                { startingPhrase: "Готви вкъщи", description: "По-добър контрол на солта." },
            ],
        },
    ],
};

export const potassium: Element = {
    name: "Калий",
    description: "Ключов електролит за сърдечен ритъм, кръвно налягане и мускулни контракции.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Плодове", description: "Банани, портокали, авокадо." },
                { startingPhrase: "Зеленчуци и бобови", description: "Картофи, спанак, боб, леща." },
            ],
        },
    ],
};

export const phosphorus: Element = {
    name: "Фосфор",
    description: "Важен за кости, АТФ (енергия) и киселинно-основния баланс. Широко разпространен в храните.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Протеинови храни", description: "Месо, риба, яйца, млечни." },
                { startingPhrase: "Добавки в храни", description: "Фосфати в газирани напитки и преработени продукти." },
            ],
        },
    ],
};

export const chloride: Element = {
    name: "Хлорид",
    description:
        "Макроминерал и електролит, работи заедно с {{sodium|натрий}} и {{potassium|калий}}. Важен за течностите в тялото и стомашната киселина (HCl).",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Електролитен баланс",
                    description: "Поддържа осмозното налягане и баланса на течностите.",
                },
                {
                    startingPhrase: "Храносмилане",
                    description: "Стомашната киселина съдържа хлоридни йони.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Сол",
                    description: "Натриевият хлорид (трапезна сол) е основният източник.",
                },
                {
                    startingPhrase: "Храни",
                    description: "Сосове, сирена, хляб, морски храни.",
                },
            ],
        },
    ],
};

export const sulfur: Element = {
    name: "Сяра",
    description:
        "Макроминерал, който влиза в аминокиселините метионин и цистеин. Важен за протеини, детоксикация и здравето на кожата.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Протеини",
                    description: "Сярата е част от структурата на много протеини.",
                },
                {
                    startingPhrase: "Детоксикация",
                    description: "Участва в глутатиона – ключов вътрешен антиоксидант.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Протеинови храни",
                    description: "Яйца, месо, риба, бобови, ядки.",
                },
                {
                    startingPhrase: "Серни зеленчуци",
                    description: "Чесън, лук, броколи, зеле.",
                },
            ],
        },
    ],
};

export const iron: Element = {
    name: "Желязо",
    description:
        "Централен минерал за пренос на кислород (хемоглобин) и енергия. Дефицитът е сред най-честите микронутриентни недостиги.",
    properties: [
        {
            action: "Видове в храната",
            itemsAboutAction: [
                {
                    startingPhrase: "Хемово (животинско)",
                    description: "По-добро усвояване – червено месо, черен дроб.",
                },
                {
                    startingPhrase: "Нехемово (растително)",
                    description:
                        "Бобове, спанак, сушени плодове – усвояването се подобрява с {{vitaminC|витамин C}}.",
                },
            ],
        },
        {
            action: "Симптоми при недостиг",
            itemsAboutAction: [
                { startingPhrase: "Умора", description: "Слабост, бледност, намалена издръжливост." },
                { startingPhrase: "Кой е рисков", description: "Жени с обилна менструация, вегетарианци, бегачи." },
            ],
        },
    ],
};

export const zinc: Element = {
    name: "Цинк",
    description: "Важен за имунитет, зарастване на рани, инсулинова функция и тестостерон.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Стриди, червено месо, тиквени семки, нахут." },
                { startingPhrase: "Спорт", description: "Интензивните тренировки увеличават загубите с пот." },
            ],
        },
    ],
};

export const selenium: Element = {
    name: "Селен",
    description: "Микроелемент с антиоксидантна роля (глутатион пероксидаза) и поддръжка на щитовидната жлеза.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Бразилски орех (много богати), риба, яйца." },
                { startingPhrase: "Умереност", description: "Прекалено високи дози от добавки могат да са токсични." },
            ],
        },
    ],
};

export const iodine: Element = {
    name: "Йод",
    description: "Необходим за синтеза на щитовидни хормони, които управляват метаболизма.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Морска храна", description: "Риба, морски дарове, йодирана сол." },
                { startingPhrase: "Дефицит", description: "Може да доведе до умора, напълняване и проблеми с щитовидната жлеза." },
            ],
        },
    ],
};

export const copper: Element = {
    name: "Мед",
    description: "Участва в усвояването на {{iron|желязо}}, формирането на колаген и енергийния метаболизъм.",
    properties: [
        {
            action: "Източници",
            itemsAboutAction: [
                { startingPhrase: "Храни", description: "Черен дроб, морски дарове, ядки, семена." },
                { startingPhrase: "Баланс", description: "Работи в тясна връзка с {{zinc|цинка}} – не са нужни мегадози." },
            ],
        },
    ],
};

export const manganese: Element = {
    name: "Манган",
    description:
        "Микроелемент за костна формация, метаболизъм на въглехидрати и антиоксидантна защита (супероксид дисмутаза).",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Кости",
                    description: "Подпомага формирането на костна тъкан заедно с {{calcium|калций}}.",
                },
                {
                    startingPhrase: "Метаболизъм",
                    description: "Участва в обработката на аминокиселини и холестерол.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Храни",
                    description: "Пълнозърнести, орехи, бобови, спанак, чай.",
                },
            ],
        },
    ],
};

export const chromium: Element = {
    name: "Хром",
    description:
        "Микроелемент, свързан с действието на инсулина и метаболизма на {{glucose|глюкоза}}.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Инсулин",
                    description: "Подпомага клетъчната чувствителност към инсулин.",
                },
                {
                    startingPhrase: "Кръвна захар",
                    description: "Може да помага за по-стабилни нива на глюкоза при дефицит.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Храни",
                    description: "Броколи, грозде, пълнозърнести, месо.",
                },
            ],
        },
    ],
};

export const molybdenum: Element = {
    name: "Молибден",
    description:
        "Микроелемент, който активира ензими за детоксикация и метаболизъм на съдържащи сяра съединения.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Ензими",
                    description: "Нужен за работата на сулфит оксидаза и други ензими.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Храни",
                    description: "Бобове, грах, фъстъци, зърнени, черен дроб.",
                },
            ],
        },
    ],
};

export const fluoride: Element = {
    name: "Флуорид",
    description:
        "Микроелемент, който укрепва зъбния емайл и намалява риска от кариес.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Зъби",
                    description: "Прави емайла по-устойчив на киселини от бактериите.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Вода",
                    description: "Флуорирана питейна вода.",
                },
                {
                    startingPhrase: "Дентални продукти",
                    description: "Паста за зъби с флуорид.",
                },
            ],
        },
    ],
};

export const cobalt: Element = {
    name: "Кобалт",
    description:
        "Микроелемент, който е централната част на молекулата {{vitaminB12|витамин B12}}. Без кобалт тялото не може да използва B12.",
    properties: [
        {
            action: "Функции",
            itemsAboutAction: [
                {
                    startingPhrase: "Витамин B12",
                    description: "Кобалтът е неразделна част от кобаламина.",
                },
                {
                    startingPhrase: "Кръв и нерви",
                    description: "Чрез B12 подпомага кръвообразуването и нервната система.",
                },
            ],
        },
        {
            action: "Източници",
            itemsAboutAction: [
                {
                    startingPhrase: "Животински храни",
                    description: "Месо, риба, яйца, млечни – заедно с B12.",
                },
            ],
        },
    ],
};

const elementRegistry: Record<ElementId, Element> = {
    micronutrientsOverview,
    vitaminA,
    vitaminD,
    vitaminE,
    vitaminK,
    vitaminC,
    bComplexOverview,
    vitaminB1,
    vitaminB2,
    vitaminB3,
    vitaminB5,
    vitaminB6,
    vitaminB7,
    vitaminB9,
    vitaminB12,
    calcium,
    phosphorus,
    magnesium,
    sodium,
    potassium,
    chloride,
    sulfur,
    iron,
    zinc,
    copper,
    manganese,
    iodine,
    selenium,
    chromium,
    molybdenum,
    fluoride,
    cobalt,
};

export function getElementById(id: ElementId): Element | undefined {
    return elementRegistry[id];
}
