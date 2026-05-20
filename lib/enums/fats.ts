export const MainFatTopics = {
    Overview: "Роля на мазнините",
    Triglyceride: "Триглицерид",
    Saturated: "Наситени мазнини",
    Unsaturated: "Ненаситени мазнини",
    Trans: "Транс мазнини",
    Cholesterol: "Холестерол",
} as const;

export const UnsaturatedFatTopics = {
    Monounsaturated: "Мононенаситени",
    Polyunsaturated: "Полиненаситени",
} as const;

export const PolyunsaturatedFatTopics = {
    Overview: "Какво са полиненаситените",
    EssentialFattyAcids: "Незаменими мастни киселини",
    Omega3: "Омега-3",
    Omega6: "Омега-6",
} as const;

export type MainFatTopicKey = keyof typeof MainFatTopics;
export type UnsaturatedFatTopicKey = keyof typeof UnsaturatedFatTopics;
export type PolyunsaturatedFatTopicKey = keyof typeof PolyunsaturatedFatTopics;
