import { Element, ElementId } from "@/lib/types";

type HormoneItem = {
    startingPhrase: string;
    description: string;
    termId?: ElementId;
};

type HormoneSection = {
    action: string;
    itemsAboutAction: HormoneItem[];
};

function hormoneElement(
    name: string,
    description: string,
    sections: HormoneSection[],
): Element {
    return { name, description, properties: sections };
}

function section(action: string, items: HormoneItem[]): HormoneSection {
    return { action, itemsAboutAction: items };
}

const role = (items: HormoneItem[]) => section("За какво служи", items);
const origin = (items: HormoneItem[]) =>
    section("Как се произвежда / откъде идва", items);
const benefits = (items: HormoneItem[]) => section("Ползи при нормални нива", items);
const imbalance = (items: HormoneItem[]) =>
    section("Дисбаланс – вреди и симптоми", items);

// ——— Overview & types ———

export const hormonesOverview: Element = {
    name: "Роля на хормоните",
    description:
        "Хормоните са химични „посълния“, които жлезите и органите изпращат в кръвта (или в тъканите) до клетките. Регулират растеж, енергия, настроение, размножение, стрес, сън и много други процеси – без тях тялото не може да поддържа баланс (хомеостаза).",
    properties: [
        {
            action: "Какво правят хормоните",
            itemsAboutAction: [
                {
                    startingPhrase: "Сигнализация",
                    description:
                        "Казват на клетките какво да правят – да поглъщат захар, да горят мазнини, да се делят, да се отпуснат или да се стресират.",
                },
                {
                    startingPhrase: "Бавни и бързи ефекти",
                    description:
                        "Някои действат за секунди (адреналин), други за часове или дни (кортизол, полови хормони, щитовидни).",
                },
                {
                    startingPhrase: "Малки количества",
                    description:
                        "Нужни са микроскопични дози – малко повече или малко по-малко може да има голям ефект.",
                },
            ],
        },
        {
            action: "Три вида хормони",
            itemsAboutAction: [
                {
                    startingPhrase: "Пептидни и протеинови",
                    termId: "peptideHormonesOverview",
                    description: "От аминокиселини – инсулин, растежен хормон, TSH.",
                },
                {
                    startingPhrase: "Стероидни",
                    termId: "steroidHormonesOverview",
                    description:
                        "От {{cholesterol|холестерол}} – кортизол, полови хормони, алдостерон.",
                },
                {
                    startingPhrase: "Аминови",
                    termId: "amineHormonesOverview",
                    description:
                        "От {{tyrosine|тирозин}} или {{tryptophan|триптофан}} – щитовидни, адреналин, мелатонин.",
                },
            ],
        },
        {
            action: "По жлези и органи",
            itemsAboutAction: [
                {
                    startingPhrase: "Хипоталамус и хипофиза",
                    termId: "hypothalamusPituitaryOverview",
                    description: "„Команден център“ – управляват много други жлези.",
                },
                {
                    startingPhrase: "Щитовидна",
                    termId: "thyroidOverview",
                    description: "Метаболизъм, енергия, температура.",
                },
                {
                    startingPhrase: "Надбъбречни",
                    termId: "adrenalOverview",
                    description: "Стрес, кръвно налягане, сол.",
                },
                {
                    startingPhrase: "Панкреас",
                    termId: "pancreasOverview",
                    description: "{{insulin|Инсулин}} и {{glucagon|глюкагон}} – кръвна захар.",
                },
                {
                    startingPhrase: "Полови жлези",
                    termId: "gonadsOverview",
                    description: "Естроген, прогестерон, тестостерон.",
                },
                {
                    startingPhrase: "Епифиза",
                    termId: "melatonin",
                    description: "{{melatonin|Мелатонин}} – сън и циркаден ритъм.",
                },
                {
                    startingPhrase: "Апетит",
                    description:
                        "{{ghrelin|Грелин}} (глад) и {{leptin|Лептин}} (ситост) – от стомах и мастна тъкан.",
                },
            ],
        },
    ],
};

export const hormoneTypesOverview: Element = {
    name: "Видове хормони",
    description:
        "Всички хормони са биологично активни молекули, но се различават по структура – това определя от какво се правят и как пътуват в тялото.",
    properties: [
        {
            action: "Трите основни класа",
            itemsAboutAction: [
                {
                    startingPhrase: "Пептидни / протеинови",
                    termId: "peptideHormonesOverview",
                    description:
                        "Верига от аминокиселини; не влизат директно в клетката – се свързват с рецептор на мембраната.",
                },
                {
                    startingPhrase: "Стероидни",
                    termId: "steroidHormonesOverview",
                    description:
                        "Мазниноподобни; произвеждат се от холестерол; често влизат в клетката.",
                },
                {
                    startingPhrase: "Аминови",
                    termId: "amineHormonesOverview",
                    description:
                        "Производни на отделни аминокиселини; подгрупа на по-малки молекули.",
                },
            ],
        },
    ],
};

export const peptideHormonesOverview: Element = {
    name: "Пептидни и протеинови хормони",
    description:
        "Изградени от {{leucine|аминокиселини}} (протеини). Водоразтворими; съхраняват се във везикули в жлезата и се освобождават при нужда.",
    properties: [
        {
            action: "Примери в тялото",
            itemsAboutAction: [
                { startingPhrase: "Инсулин", termId: "insulin", description: "Кръвна захар." },
                { startingPhrase: "Глюкагон", termId: "glucagon", description: "Повишава захарта." },
                { startingPhrase: "Растежен хормон", termId: "growthHormone", description: "Растеж, възстановяване." },
                { startingPhrase: "TSH, ACTH, FSH, LH", description: "От хипофизата – командват други жлези." },
                { startingPhrase: "Окситоцин, ADH", termId: "oxytocin", description: "Раждане, социална връзка; вода." },
            ],
        },
        {
            action: "Общи ползи и риск",
            itemsAboutAction: [
                {
                    startingPhrase: "Ползи",
                    description:
                        "Точна, бърза регулация на метаболизъм, растеж, размножение и течности.",
                },
                {
                    startingPhrase: "При дисбаланс",
                    description:
                        "Диабет (инсулин), акромегалия (излишък GH), нарушена фертилност (FSH/LH) и др.",
                },
            ],
        },
    ],
};

export const steroidHormonesOverview: Element = {
    name: "Стероидни хормони",
    description:
        "Произвеждат се от {{cholesterol|холестерол}}. Мазниноподобни – могат да преминат през клетъчната мембрана и да действат вътре в клетката.",
    properties: [
        {
            action: "Примери",
            itemsAboutAction: [
                { startingPhrase: "Кортизол", termId: "cortisol", description: "Стрес, енергия." },
                { startingPhrase: "Алдостерон", termId: "aldosterone", description: "Сол и вода." },
                { startingPhrase: "Естроген", termId: "estrogen", description: "Женски полови хормон." },
                { startingPhrase: "Прогестерон", termId: "progesterone", description: "Бременност, цикъл." },
                { startingPhrase: "Тестостерон", termId: "testosterone", description: "Мъжки полови хормон." },
            ],
        },
        {
            action: "Ползи и вреди",
            itemsAboutAction: [
                {
                    startingPhrase: "Ползи",
                    description:
                        "Адаптация към стрес, полово развитие, поддържане на кръвно налягане и минерали.",
                },
                {
                    startingPhrase: "При излишък или дефицит",
                    description:
                        "Синдром на Кушинг (кортизол), задържане на сол (алдостерон), хормонални нарушения при полови жлези.",
                },
            ],
        },
    ],
};

export const amineHormonesOverview: Element = {
    name: "Аминови хормони",
    description:
        "Производни на {{tyrosine|тирозин}} или {{tryptophan|триптофан}}. По-малки молекули от протеините, но с много силно действие.",
    properties: [
        {
            action: "Примери",
            itemsAboutAction: [
                {
                    startingPhrase: "Щитовидни (T3, T4)",
                    termId: "thyroidHormones",
                    description: "От тирозин + йод – метаболизъм.",
                },
                {
                    startingPhrase: "Адреналин и норадреналин",
                    termId: "epinephrine",
                    description: "От тирозин – „бий или бягай“.",
                },
                {
                    startingPhrase: "Мелатонин",
                    termId: "melatonin",
                    description: "От триптофан – сън.",
                },
            ],
        },
    ],
};

// ——— Gland overviews ———

export const hypothalamusPituitaryOverview: Element = {
    name: "Хипоталамус и хипофиза",
    description:
        "Хипоталамусът (в мозъка) получава сигнали от тялото и дава заповеди на хипофизата („мастер жлеза“). Хипофизата изпуска хормони, които командват щитовидната, надбъбреките, половите жлези и др.",
    properties: [
        role([
            {
                startingPhrase: "Командна верига",
                description:
                    "Хипоталамус → освобождава освобождаващи хормони → хипофиза → TSH, ACTH, GH, FSH, LH и др. → целеви жлези.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Координация",
                description:
                    "Синхронизира растеж, метаболизъм, стрес, размножение и денонощен ритъм.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Тумор на хипофизата",
                description:
                    "Може да повиши един хормон и да потисне други – нужна е медицинска диагностика.",
            },
            {
                startingPhrase: "Дефицит",
                description:
                    "Може да доведе до недостатъчна функция на щитовидната, половите жлези или надбъбречните.",
            },
        ]),
    ],
};

export const thyroidOverview: Element = {
    name: "Щитовидна жлеза",
    description:
        "Жлеза на врата. Произвежда {{thyroidHormones|T3 и T4}}, които задават „скоростта“ на метаболизма – колко бързо гориш енергия, колко топло/активно се чувстваш.",
    properties: [
        role([
            {
                startingPhrase: "Метаболизъм",
                description:
                    "Влияе на сърцебиене, температура, тегло, концентрация и храносмилане.",
            },
        ]),
        origin([
            {
                startingPhrase: "Йод",
                description:
                    "T3/T4 се правят от тирозин + йод от храната (риба, йодирана сол).",
            },
            {
                startingPhrase: "TSH",
                termId: "tsh",
                description: "Хипофизата пуска TSH, за да каже на щитовидната да работи повече или по-малко.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Хипотиреоидизъм",
                description: "Бавен метаболизъм – умора, студ, качване на тегло.",
            },
            {
                startingPhrase: "Хипертиреоидизъм",
                description: "Бърз метаболизъм – треперене, топлина, отслабване.",
            },
        ]),
    ],
};

export const adrenalOverview: Element = {
    name: "Надбъбречни жлези",
    description:
        "Малки жлези върху бъбреците. Кората произвежда {{cortisol|кортизол}} и {{aldosterone|алдостерон}}; ядрото – {{epinephrine|адреналин}} и {{norepinephrine|норадреналин}}.",
    properties: [
        role([
            {
                startingPhrase: "Стрес и оцеляване",
                description: "Подготвят тялото за опасност – енергия, внимание, кръвно налягане.",
            },
            {
                startingPhrase: "Сол и вода",
                description: "Алдостеронът задържа натрий и вода.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Хроничен стрес",
                description: "Дълготрайно висок кортизол – умора, коремни мазнини, нарушен сън.",
            },
            {
                startingPhrase: "Недостатъчност",
                description: "Болест на Адисон – слабост, ниско кръвно, нужда от лечение.",
            },
        ]),
    ],
};

export const pancreasOverview: Element = {
    name: "Панкреас",
    description:
        "Жлеза зад стомаха. Произвежда храносмилателни ензими и хормони {{insulin|инсулин}} + {{glucagon|глюкагон}} в „островчета“ (Лангерханс).",
    properties: [
        role([
            {
                startingPhrase: "Кръвна захар",
                description:
                    "След хранене инсулинът сваля {{glucose|глюкозата}}; между хранения глюкагонът я повишава при нужда.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Диабет тип 1",
                description: "Липса на инсулин – нужни инжекции.",
            },
            {
                startingPhrase: "Диабет тип 2",
                description: "Клетките не реагират добре на инсулин – храна, движение, лекарства.",
            },
        ]),
    ],
};

export const gonadsOverview: Element = {
    name: "Полови жлези",
    description:
        "Яйчници (при жени) и тестиси (при мъже). Произвеждат {{estrogen|естроген}}, {{progesterone|прогестерон}} и {{testosterone|тестостерон}} – развитие на полови признаци, плодовитост, либидо, кости.",
    properties: [
        role([
            {
                startingPhrase: "Размножение",
                description: "Менструален цикъл, овулация, сперматогенеза, бременност.",
            },
            {
                startingPhrase: "Вторични полови признаци",
                description: "Глас, окосмяване, разпределение на мазнини, мускулна маса.",
            },
        ]),
        origin([
            {
                startingPhrase: "От холестерол",
                description:
                    "Стероидни полови хормони – връзка с {{cholesterol|холестерола}} и {{fatsOverview|мазнините}} в диетата (не само от тях, но са от същия „семейство“).",
            },
        ]),
        imbalance([
            {
                startingPhrase: "ПМС и менопауза",
                description: "Промени в естроген/прогестерон.",
            },
            {
                startingPhrase: "Ниско тестостерон",
                description: "Умора, намалено либидо, загуба на мускул – при мъже.",
            },
        ]),
    ],
};

// ——— Individual hormones ———

export const insulin = hormoneElement(
    "Инсулин",
    "Пептиден хормон от панкреаса. „Ключът“, който позволява на {{glucose|глюкозата}} да влезе в клетките след хранене.",
    [
        role([
            {
                startingPhrase: "Кръвна захар",
                description: "Сваля глюкозата в кръвта; насърчава складиране като гликоген и мазнини.",
            },
            {
                startingPhrase: "Анаболизъм",
                description: "Подпомага изграждането на протеин и възстановяване след храна.",
            },
        ]),
        origin([
            {
                startingPhrase: "Бета клетки",
                description:
                    "Произвежда се в островчетата на панкреаса, когато кръвната захар се покачи.",
            },
            {
                startingPhrase: "Стимул",
                description: "Въглехидрати (особено бързи) и протеин силно стимулират освобождаването.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Енергия за клетки",
                description: "Мускули и мозък получават захар за работа.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Диабет",
                description: "Липса или резистентност → висока захар, жажда, умора.",
            },
            {
                startingPhrase: "Хипогликемия",
                description:
                    "Твърде много инсулин → треперене, слабост – нужна бърза захар.",
            },
        ]),
    ],
);

export const glucagon = hormoneElement(
    "Глюкагон",
    "Пептиден хормон от панкреаса – „противник“ на {{insulin|инсулина}}. Повишава кръвната захар, когато е ниска.",
    [
        role([
            {
                startingPhrase: "Освобождава глюкоза",
                description:
                    "Разгражда гликоген в черния дроб и освобождава {{glucose|глюкоза}} в кръвта.",
            },
        ]),
        origin([
            {
                startingPhrase: "Алфа клетки",
                description: "Панкреас – се освобождава при ниска захар или между хранения.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Защита от хипогликемия",
                description: "Предпазва мозъка и тялото от твърде ниска захар.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Рядко изолиран проблем",
                description:
                    "Обикновено се говори в контекста на баланс инсулин–глюкагон при диабет.",
            },
        ]),
    ],
);

export const growthHormone = hormoneElement(
    "Растежен хормон (GH)",
    "Протеинов хормон от хипофизата. Важен за растеж при деца и за възстановяване, мазнини и мускули при възрастни.",
    [
        role([
            {
                startingPhrase: "Растеж",
                description: "Кости, хрущяли, органи при децата и юноши.",
            },
            {
                startingPhrase: "Възстановяване",
                description: "Подпомага ремонт на тъкани и метаболизъм на мазнини.",
            },
        ]),
        origin([
            {
                startingPhrase: "Хипофиза",
                description:
                    "Освобождава се най-много по време на дълбок сън; стимулиран от {{leucine|левцин}} в храната и тренировки.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Мускули и мазнини",
                description: "Помага за поддържане на мускулна маса и окисляване на мазнини.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Дефицит при деца",
                description: "Ниск ръст – лечение с GH.",
            },
            {
                startingPhrase: "Излишък",
                description: "Акромегалия – удебеляване на ръце, лице, органи.",
            },
        ]),
    ],
);

export const tsh = hormoneElement(
    "TSH (тиреотропен хормон)",
    "Хормон на хипофизата, който казва на {{thyroidOverview|щитовидната жлеза}} колко {{thyroidHormones|T3/T4}} да произвежда.",
    [
        role([
            {
                startingPhrase: "Регулация",
                description: "Повече TSH → щитовидната работи повече; по-малко TSH → по-бавен метаболизъм.",
            },
        ]),
        origin([
            {
                startingPhrase: "Хипофиза",
                description: "Отговаря на TRH от хипоталамуса и на нивата на T3/T4 в кръвта (обратна връзка).",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Висок TSH",
                description: "Често при хипотиреоидизъм – жлезата не отговаря, хипофизата „крещи“.",
            },
            {
                startingPhrase: "Нисък TSH",
                description: "При хипертиреоидизъм или твърде много йод/лекарства.",
            },
        ]),
    ],
);

export const acth = hormoneElement(
    "ACTH",
    "Хормон на хипофизата, който стимулира {{adrenalOverview|надбъбречната кора}} да произвежда {{cortisol|кортизол}}.",
    [
        role([
            {
                startingPhrase: "Стрес оста",
                description: "Свързва мозъка с кортизолния отговор при стрес.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Болест на Кушинг",
                description: "Излишък ACTH или кортизол – луна лице, коремни мазнини.",
            },
            {
                startingPhrase: "Недостатъчност",
                description: "Слаба надбъбречна функция – нужни стероиди.",
            },
        ]),
    ],
);

export const fsh = hormoneElement(
    "FSH",
    "Фоликулостимулиращ хормон – от хипофизата; важен за яйчници и тестиси, овулация и сперматозоиди.",
    [
        role([
            {
                startingPhrase: "Плодовитост",
                description: "При жени растеж на фоликула; при мъже подпомага образуване на сперма.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Ниски нива",
                description: "Нерегулярен цикъл, затруднено зачеване.",
            },
        ]),
    ],
);

export const lh = hormoneElement(
    "LH",
    "Лутеинизиращ хормон – пик преди овулация при жени; при мъже стимулира {{testosterone|тестостерон}}.",
    [
        role([
            {
                startingPhrase: "Овулация",
                description: "Предизвиква пускане на яйцеклетка от яйчника.",
            },
            {
                startingPhrase: "Тестостерон",
                description: "При мъже поддържа производство в тестисите.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Синдром на поликистозни яйчници",
                description: "Често повишен LH спрямо FSH.",
            },
        ]),
    ],
);

export const prolactin = hormoneElement(
    "Пролактин",
    "Хормон на хипофизата – основно стимулира производство на мляко след раждане.",
    [
        role([
            {
                startingPhrase: "Лактация",
                description: "Кърмене – пролактинът е ключов след раждане.",
            },
        ]),
        origin([
            {
                startingPhrase: "Хипофиза",
                description: "Повишава се при кърмене и при стрес; потискан от допамин.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Висок пролактин",
                description: "Може да наруши цикъл, либидо, фертилност – при двата пола.",
            },
        ]),
    ],
);

export const oxytocin = hormoneElement(
    "Окситоцин",
    "Пептиден хормон – „хормон на обятията“. Важен при раждане, кърмене и социална свързаност.",
    [
        role([
            {
                startingPhrase: "Раждане",
                description: "Силни контракции на матката; свързан с доверие и привързаност.",
            },
            {
                startingPhrase: "Стрес намаление",
                description: "Може да усещаш спокойствие при близък контакт.",
            },
        ]),
        origin([
            {
                startingPhrase: "Хипоталамус",
                description: "Съхранява се в хипофизата; освобождава се при раждане, кърмене, докосване.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Социално",
                description: "Подпомага групова кооперация и усещане за сигурност.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Рядко клиничен проблем",
                description: "По-често се говори за недостатъчно освобождаване при преждевременни раждания.",
            },
        ]),
    ],
);

export const adh = hormoneElement(
    "ADH (вазопресин)",
    "Антидиуретичен хормон – задържа вода в тялото; намалява количеството урина.",
    [
        role([
            {
                startingPhrase: "Воден баланс",
                description: "Концентрира урината, когато трябва да пестиш вода.",
            },
        ]),
        origin([
            {
                startingPhrase: "Хипоталамус / хипофиза",
                description: "Освобождава се при дехидратация или висока осмоларност на кръвта.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Недостатъчност",
                description: "Диабет insipidus – много урина, жажда.",
            },
            {
                startingPhrase: "SIADH",
                description: "Твърде много ADH – задържане на вода, ниска натрий.",
            },
        ]),
    ],
);

export const thyroidHormones = hormoneElement(
    "T3 и T4 (щитовидни хормони)",
    "Аминови хормони от {{thyroidOverview|щитовидната жлеза}}. T4 (тироксин) се превръща в по-активния T3 в тъканите.",
    [
        role([
            {
                startingPhrase: "Метаболизъм",
                description:
                    "Задават темпото на енергия, сърцебиене, температура и мозъчна активност.",
            },
        ]),
        origin([
            {
                startingPhrase: "Йод + тирозин",
                description:
                    "Нужен {{tyrosine|тирозин}} от протеини и йод от храна; без йод – зоб и хипотиреоидизъм.",
            },
            {
                startingPhrase: "TSH",
                termId: "tsh",
                description: "Хипофизата регулира производството.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Енергия и концентрация",
                description: "При нормални нива – бодрост, стабилно тегло.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Хипо / хипер",
                description:
                    "Бавен или прекалено бърз метаболизъм – лечение с левотироксин или антитиреоидни.",
            },
        ]),
    ],
);

export const calcitonin = hormoneElement(
    "Калцитонин",
    "Хормон от щитовидната (C клетки). Помага да се намали {{calcium|калций}} в кръвта – противоположен на {{pth|PTH}}.",
    [
        role([
            {
                startingPhrase: "Калций",
                description: "Насърчава отлагане в костите; по-слаб ефект от PTH.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Костна защита",
                description: "Част от баланса калций–кости–кръв.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Рядко клиничен",
                description: "По-важен е балансът с PTH и {{vitaminD|витамин D}} в кръвта.",
            },
        ]),
    ],
);

export const pth = hormoneElement(
    "Паратхормон (PTH)",
    "Хормон от паращитовидните жлези (до щитовидната). Повишава {{calcium|калция}} в кръвта.",
    [
        role([
            {
                startingPhrase: "Калций и кости",
                description: "Освобождава калций от костите; активира витамин D в бъбреците.",
            },
        ]),
        origin([
            {
                startingPhrase: "Ниска калций",
                description: "Се освобождава, когато калций в кръвта е нисък.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Висок PTH",
                description: "Може да отслабне костите (остеопороза) – нужен калций/витамин D.",
            },
        ]),
    ],
);

export const cortisol = hormoneElement(
    "Кортизол",
    "Стероиден „хормон на стреса“ от {{adrenalOverview|надбъбречната кора}}. Помага при опасност, но хроничният излишък е вреден.",
    [
        role([
            {
                startingPhrase: "Стрес",
                description: "Освобождава глюкоза, повишава вниманието и кръвното налягане.",
            },
            {
                startingPhrase: "Възпаление",
                description: "Потиска възпалителен отговор – основа на кортизонови лекарства.",
            },
        ]),
        origin([
            {
                startingPhrase: "ACTH",
                termId: "acth",
                description: "Хипофизата пуска ACTH сутрин (циркаден ритъм) и при стрес.",
            },
            {
                startingPhrase: "От холестерол",
                description: "Стероид – връзка с {{cholesterol|холестерола}}.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Оцеляване",
                description: "Краткосрочно – енергия при инфекция, травма, психически стрес.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Хроничен излишък",
                description: "Качване на тегло, безсъние, висока захар, отслабен имунитет.",
            },
            {
                startingPhrase: "Дефицит",
                description: "Слабост, ниско кръвно – болест на Адисон.",
            },
        ]),
    ],
);

export const aldosterone = hormoneElement(
    "Алдостерон",
    "Стероиден хормон от надбъбречната кора. Задържа {{sodium|натрий}} и вода; губи {{potassium|калий}}.",
    [
        role([
            {
                startingPhrase: "Кръвно налягане",
                description: "Повече обем течности → по-високо налягане.",
            },
        ]),
        origin([
            {
                startingPhrase: "Ренин",
                description:
                    "Бъбреците пускат ренин при ниско налягане → алдостерон.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Излишък",
                description: "Задържане на сол, подуване, високо кръвно.",
            },
            {
                startingPhrase: "Дефицит",
                description: "Ниско налягане, дехидратация.",
            },
        ]),
    ],
);

export const epinephrine = hormoneElement(
    "Адреналин (епинефрин)",
    "Аминов хормон от мозъчната част на надбъбречните. „Бий или бягай“ – мигновен отговор.",
    [
        role([
            {
                startingPhrase: "Бързина",
                description:
                    "Учащен пулс, разширени зеници, повече {{glucose|глюкоза}} в кръвта, готовност за действие.",
            },
        ]),
        origin([
            {
                startingPhrase: "От тирозин",
                description:
                    "Производно на {{tyrosine|тирозин}}; освобождава се при страх, болка, интензивна тренировка.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Оцеляване",
                description: "Спасява при опасност – сила и фокус за секунди.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Хроничен стрес",
                description: "Постоянно „включен“ режим – тревожност, умора.",
            },
        ]),
    ],
);

export const norepinephrine = hormoneElement(
    "Норадреналин",
    "Близък до {{epinephrine|адреналина}} – повече кръвно налягане и будност; важен и като невротрансмитер в мозъка.",
    [
        role([
            {
                startingPhrase: "Внимание",
                description: "Поддържа будност и тонус на кръвоносните съдове.",
            },
        ]),
        origin([
            {
                startingPhrase: "Надбъбречни + нерви",
                description: "От тирозин; част от симпатиковата нервна система.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Тревожност",
                description: "Може да участва при паника и високо кръвно.",
            },
        ]),
    ],
);

export const estrogen = hormoneElement(
    "Естроген",
    "Основен женски полов хормон (естрадиол и др.). Стероид от яйчници (и малко от други тъкани).",
    [
        role([
            {
                startingPhrase: "Полово развитие",
                description: "Гърди, таз, менструален цикъл, костна плътност.",
            },
            {
                startingPhrase: "Сърце и кожа",
                description: "Влияе на кръвоносни съдове и хидратация на кожата.",
            },
        ]),
        origin([
            {
                startingPhrase: "Яйчници",
                description: "Фоликула по време на цикъл; спада при менопауза.",
            },
            {
                startingPhrase: "От холестерол",
                description: "Стероиден – връзка с {{cholesterol|холестерола}}.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Кости",
                description: "Защитава от остеопороза при нормални нива в репродуктивна възраст.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "ПМС / менопауза",
                description: "Промени в настроение, приливи, сухота.",
            },
            {
                startingPhrase: "Излишък",
                description: "Риск при някои тумори – нужен лекарски контрол.",
            },
        ]),
    ],
);

export const progesterone = hormoneElement(
    "Прогестерон",
    "Стероиден хормон след овулация. Подготвя матката за бременност; важен за цикъл.",
    [
        role([
            {
                startingPhrase: "Бременност",
                description: "Поддържа ендометриума; предотвратява нови овулации.",
            },
        ]),
        origin([
            {
                startingPhrase: "Тяло на жълтото",
                description: "Образувано в яйчника след овулация.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Ниски нива",
                description: "Затруднено зачеване, нереден цикъл.",
            },
        ]),
    ],
);

export const testosterone = hormoneElement(
    "Тестостерон",
    "Основен андроген – при мъже от тестиси, при жени в малки количества от яйчници и надбъбречни.",
    [
        role([
            {
                startingPhrase: "Мускули и кости",
                description: "Анаболен ефект, плътност на костите, либидо.",
            },
            {
                startingPhrase: "Настроение и енергия",
                description: "Влияе на мотивация и увереност.",
            },
        ]),
        origin([
            {
                startingPhrase: "LH",
                termId: "lh",
                description: "Стимулира тестисите; от холестерол.",
            },
        ]),
        benefits([
            {
                startingPhrase: "Здраве",
                description: "Нормални нива поддържат мускул, кости, либидо.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Ниско",
                description: "Умора, загуба на мускул, еректилна дисфункция.",
            },
            {
                startingPhrase: "Високо",
                description: "Агресия, акне, косопад при жени – синдром на поликистозни яйчници.",
            },
        ]),
    ],
);

export const melatonin = hormoneElement(
    "Мелатонин",
    "Хормон на {{pinealTopics|епифизата}} – „тъмнината“. Подсказва на тялото, че е време за сън.",
    [
        role([
            {
                startingPhrase: "Циркаден ритъм",
                description: "Синхронизира вътрешния часовник с ден/нощ.",
            },
        ]),
        origin([
            {
                startingPhrase: "От триптофан",
                description:
                    "Производно на {{tryptophan|триптофан}}; освобождава се при тъмнина, спада при светлина (екрани!).",
            },
        ]),
        benefits([
            {
                startingPhrase: "Сън",
                description: "Помага за заспиване при редовен режим и тъмна стая.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Смяна на смени",
                description: "Нарушен ритъм – трудно заспиване.",
            },
        ]),
    ],
);

export const ghrelin = hormoneElement(
    "Грелин",
    "„Хормон на глада“ – от стомаха. Нива са високи преди хранене, ниски след това.",
    [
        role([
            {
                startingPhrase: "Апетит",
                description: "Стимулира желание за храна; сигнализира „трябва енергия“.",
            },
        ]),
        origin([
            {
                startingPhrase: "Стомах",
                description: "Празен стомах → повече грелин; разтягане → по-малко.",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Липса на сън",
                description: "Малко сън → повече грелин → по-голям глад.",
            },
        ]),
    ],
);

export const leptin = hormoneElement(
    "Лептин",
    "„Хормон на ситостта“ – от мастната тъкан. Казва на мозъка, че има достатъчно запаси.",
    [
        role([
            {
                startingPhrase: "Ситост",
                description: "Намалява апетит при нормална чувствителност на мозъка.",
            },
        ]),
        origin([
            {
                startingPhrase: "Мастни клетки",
                description: "Повече мазнини → повече лептин (но може да има „резистентност“).",
            },
        ]),
        imbalance([
            {
                startingPhrase: "Резистентност",
                description:
                    "При наднормено тегло мозъкът не чува лептина добре – продължаваш да огладняваш.",
            },
        ]),
    ],
);

const elementRegistry: Record<ElementId, Element> = {
    hormonesOverview,
    hormoneTypesOverview,
    peptideHormonesOverview,
    steroidHormonesOverview,
    amineHormonesOverview,
    hypothalamusPituitaryOverview,
    thyroidOverview,
    adrenalOverview,
    pancreasOverview,
    gonadsOverview,
    insulin,
    glucagon,
    growthHormone,
    tsh,
    acth,
    fsh,
    lh,
    prolactin,
    oxytocin,
    adh,
    thyroidHormones,
    calcitonin,
    pth,
    cortisol,
    aldosterone,
    epinephrine,
    norepinephrine,
    estrogen,
    progesterone,
    testosterone,
    melatonin,
    ghrelin,
    leptin,
};

export function getElementById(id: ElementId): Element | undefined {
    return elementRegistry[id];
}
