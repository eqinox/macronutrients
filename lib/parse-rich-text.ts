export type RichTextSegment =
    | { type: "text"; value: string }
    | { type: "term"; id: string; label?: string };

const TERM_PATTERN = /\{\{([^}|]+)(?:\|([^}]+))?\}\}/g;

/** Parses `{{termId}}` or `{{termId|visible label}}` markers inside plain text. */
export function parseRichText(text: string): RichTextSegment[] {
    const segments: RichTextSegment[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(TERM_PATTERN)) {
        const index = match.index ?? 0;
        if (index > lastIndex) {
            segments.push({ type: "text", value: text.slice(lastIndex, index) });
        }
        segments.push({
            type: "term",
            id: match[1].trim(),
            label: match[2]?.trim(),
        });
        lastIndex = index + match[0].length;
    }

    if (lastIndex < text.length) {
        segments.push({ type: "text", value: text.slice(lastIndex) });
    }

    return segments.length > 0 ? segments : [{ type: "text", value: text }];
}
