import {
    getSortedGlossary,
    isExcludedAutoLinkLabel,
    isExcludedElementId,
} from "@/lib/term-glossary";

export type RichTextSegment =
    | { type: "text"; value: string }
    | { type: "term"; id: string; label?: string };

const TERM_PATTERN = /\{\{([^}|]+)(?:\|([^}]+))?\}\}/g;

const LETTER = /\p{L}/u;

function isLetter(char: string): boolean {
    return LETTER.test(char);
}

function parseExplicitMarkers(text: string): RichTextSegment[] {
    const segments: RichTextSegment[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(TERM_PATTERN)) {
        const index = match.index ?? 0;
        if (index > lastIndex) {
            segments.push({ type: "text", value: text.slice(lastIndex, index) });
        }
        const id = match[1].trim();
        const label = match[2]?.trim();
        const visible = label ?? id;

        if (
            isExcludedElementId(id) ||
            isExcludedAutoLinkLabel(visible)
        ) {
            segments.push({ type: "text", value: visible });
        } else {
            segments.push({
                type: "term",
                id,
                label,
            });
        }
        lastIndex = index + match[0].length;
    }

    if (lastIndex < text.length) {
        segments.push({ type: "text", value: text.slice(lastIndex) });
    }

    return segments.length > 0 ? segments : [{ type: "text", value: text }];
}

function findGlossaryMatchAt(
    text: string,
    index: number,
): { id: string; label: string; length: number } | null {
    const glossary = getSortedGlossary();
    const slice = text.slice(index);

    for (const { id, label } of glossary) {
        if (slice.length < label.length) continue;
        const candidate = slice.slice(0, label.length);
        if (
            candidate.toLocaleLowerCase("bg") !== label.toLocaleLowerCase("bg")
        ) {
            continue;
        }
        const prev = index > 0 ? text[index - 1] : "";
        const next =
            index + label.length < text.length ? text[index + label.length] : "";
        if (isLetter(prev) || isLetter(next)) continue;
        return { id, label: candidate, length: label.length };
    }

    return null;
}

function autoLinkPlainText(text: string): RichTextSegment[] {
    if (!text) return [];

    const segments: RichTextSegment[] = [];
    let plainStart = 0;
    let i = 0;

    while (i < text.length) {
        const match = findGlossaryMatchAt(text, i);
        if (match) {
            if (i > plainStart) {
                segments.push({
                    type: "text",
                    value: text.slice(plainStart, i),
                });
            }
            segments.push({
                type: "term",
                id: match.id,
                label: match.label,
            });
            i += match.length;
            plainStart = i;
        } else {
            i += 1;
        }
    }

    if (plainStart < text.length) {
        segments.push({ type: "text", value: text.slice(plainStart) });
    }

    return segments;
}

function autoLinkSegments(segments: RichTextSegment[]): RichTextSegment[] {
    return segments.flatMap((segment) =>
        segment.type === "term"
            ? [segment]
            : autoLinkPlainText(segment.value),
    );
}

/**
 * Parses `{{termId}}` or `{{termId|visible label}}` markers, then auto-links
 * other known glossary terms in plain text.
 */
export function parseRichText(text: string): RichTextSegment[] {
    const withMarkers = parseExplicitMarkers(text);
    const linked = autoLinkSegments(withMarkers);
    return linked.length > 0 ? linked : [{ type: "text", value: text }];
}
