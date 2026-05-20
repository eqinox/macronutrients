import { parseRichText } from "@/lib/parse-rich-text";
import { getElementById } from "@/lib/element-registry";
import type { ElementId } from "@/lib/types";

interface RichTextProps {
    text: string;
    onTermClick: (termId: ElementId) => void;
    className?: string;
}

export function RichText({ text, onTermClick, className }: RichTextProps) {
    const segments = parseRichText(text);

    return (
        <span className={className}>
            {segments.map((segment, index) => {
                if (segment.type === "text") {
                    return <span key={index}>{segment.value}</span>;
                }

                const term = getElementById(segment.id);
                const label = segment.label ?? term?.name ?? segment.id;

                return (
                    <button
                        key={index}
                        type="button"
                        className="cursor-pointer font-medium text-primary underline underline-offset-2 hover:text-primary/80"
                        onClick={() => onTermClick(segment.id)}
                    >
                        {label}
                    </button>
                );
            })}
        </span>
    );
}
