import { carbohydrateElementRegistry } from "@/data/carbohydrate-elements";
import { fatElementRegistry } from "@/data/fat-elements";
import { hormoneElementRegistry } from "@/data/hormone-elements";
import { micronutrientElementRegistry } from "@/data/micronutrient-elements";
import { proteinElementRegistry } from "@/data/protein-elements";
import type { Element, ElementId } from "@/lib/types";
import { TERM_ALIASES } from "@/lib/term-aliases";

export type GlossaryEntry = { id: ElementId; label: string };

const REGISTRIES: Record<ElementId, Element>[] = [
    carbohydrateElementRegistry,
    fatElementRegistry,
    proteinElementRegistry,
    micronutrientElementRegistry,
    hormoneElementRegistry,
];

/** Main section headings on the home page – never auto-linked. */
const EXCLUDED_ELEMENT_IDS = new Set<ElementId>([
    "fatsOverview",
    "hormonesOverview",
    "micronutrientsOverview",
]);

/** Generic category words (singular/plural) – not specific terms like „наситени мазнини“. */
const EXCLUDED_AUTO_LINK_LABELS = new Set(
    [
        "мазнини",
        "мазнина",
        "мазнините",
        "мазнината",
        "хормони",
        "хормон",
        "хормоните",
        "хормонът",
        "хормона",
        "протеини",
        "протеин",
        "протеините",
        "протеина",
        "протеинът",
        "протеинов",
        "протеинова",
        "протеиново",
        "протеинови",
        "протеиновия",
        "протеиновата",
        "протеиновият",
        "микронутриенти",
        "микронутриент",
        "микронутриентите",
        "микронутриента",
    ].map((w) => w.toLocaleLowerCase("bg")),
);

export function isExcludedAutoLinkLabel(label: string): boolean {
    return EXCLUDED_AUTO_LINK_LABELS.has(label.toLocaleLowerCase("bg"));
}

export function isExcludedElementId(id: ElementId): boolean {
    return EXCLUDED_ELEMENT_IDS.has(id);
}

/** Short codes allowed when splitting names (T3, B5, GI) – not common words like „на“. */
function isShortCodeLabel(part: string): boolean {
    return part.length === 2 && /^[A-Za-z0-9]{2}$/.test(part);
}

function isValidSplitPart(part: string): boolean {
    const p = part.trim();
    if (p.length < 2) return false;
    if (p.length >= 3) return true;
    return isShortCodeLabel(p);
}

function labelsFromElementName(name: string): string[] {
    const labels = new Set<string>([name]);
    const beforeParen = name.replace(/\s*\([^)]*\)/g, "").trim();
    if (beforeParen.length > 0) labels.add(beforeParen);
    for (const match of name.matchAll(/\(([^)]+)\)/g)) {
        const inner = match[1].trim();
        if (inner.length > 0) {
            labels.add(inner);
            // Only split on list separators, not the letter „и“ inside words (e.g. ки-се-ли-на).
            for (const part of inner.split(/\s*,\s*|\s+и\s+|\s*\/\s*/u)) {
                const p = part.trim();
                if (isValidSplitPart(p)) labels.add(p);
            }
        }
    }
    return [...labels];
}

function collectEntries(): GlossaryEntry[] {
    const byKey = new Map<string, GlossaryEntry>();

    for (const registry of REGISTRIES) {
        for (const [id, element] of Object.entries(registry)) {
            if (EXCLUDED_ELEMENT_IDS.has(id)) continue;

            const labels = [
                ...labelsFromElementName(element.name),
                ...(TERM_ALIASES[id] ?? []),
            ];
            for (const label of labels) {
                if (label.length < 2) continue;
                if (isExcludedAutoLinkLabel(label)) continue;
                const key = label.toLocaleLowerCase("bg");
                const existing = byKey.get(key);
                if (!existing || label.length > existing.label.length) {
                    byKey.set(key, { id, label });
                }
            }
        }
    }

    return [...byKey.values()].sort((a, b) => b.label.length - a.label.length);
}

let cached: GlossaryEntry[] | null = null;

/** Longest labels first – avoids partial matches (e.g. „наситени мазнини“ before „мазнини“). */
export function getSortedGlossary(): GlossaryEntry[] {
    if (!cached) cached = collectEntries();
    return cached;
}
