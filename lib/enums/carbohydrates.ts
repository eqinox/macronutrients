export const Monosaccharides = {
  Glucose: "Глюкоза",
  Fructose: "Фруктоза",
  Galactose: "Галактоза",
} as const;

export const Disaccharides = {
  Sucrose: "Захароза",
  Lactose: "Лактоза",
  Maltose: "Малтоза",
} as const;

export const StarchTopics = {
  Overview: "Какво е нишесте",
  Digestion: "Разграждане и усвояване",
  Sources: "Източници в храната",
} as const;

export const FiberTopics = {
  Overview: "Какво са фибрите",
  Soluble: "Разтворими фибри",
  Insoluble: "Неразтворими фибри",
} as const;

export type MonosaccharideKey = keyof typeof Monosaccharides;
export type DisaccharideKey = keyof typeof Disaccharides;
export type StarchTopicKey = keyof typeof StarchTopics;
export type FiberTopicKey = keyof typeof FiberTopics;
