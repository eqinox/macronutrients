import {
    createElement,
    useState,
    type ComponentType,
    type ReactNode,
} from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/** Topic views are always prop-less (from createElementView or thin wrappers). */
type TopicComponent = ComponentType<Record<string, never>>;

interface TopicListDialogProps<T extends string> {
    title: string;
    description: ReactNode;
    items: Array<[T, string]>;
    componentMap: Record<T, TopicComponent>;
}

export function TopicListDialog<T extends string>({
    title,
    description,
    items,
    componentMap,
}: TopicListDialogProps<T>) {
    const [openTopics, setOpenTopics] = useState<T[]>([]);

    const openTopic = (key: T) => {
        setOpenTopics((prev) => (prev.includes(key) ? prev : [...prev, key]));
    };

    const closeTopic = (key: T) => {
        setOpenTopics((prev) => prev.filter((entry) => entry !== key));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    {items.map(([key, label]) => (
                        <li
                            key={key}
                            className="cursor-pointer hover:underline"
                            onClick={() => openTopic(key)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </CardContent>

            {openTopics.map((key) => {
                const label =
                    items.find(([itemKey]) => itemKey === key)?.[1] ?? title;

                return (
                    <Dialog
                        key={key}
                        open
                        onOpenChange={(open) => !open && closeTopic(key)}
                    >
                        <DialogContent title={label}>
                            {createElement(componentMap[key])}
                        </DialogContent>
                    </Dialog>
                );
            })}
        </Card>
    );
}
