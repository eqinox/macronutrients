import { useState, type ComponentType, type ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TopicListDialogProps<T extends string> {
    title: string;
    description: ReactNode;
    items: Array<[T, string]>;
    componentMap: Record<T, ComponentType>;
}

export function TopicListDialog<T extends string>({
    title,
    description,
    items,
    componentMap,
}: TopicListDialogProps<T>) {
    const [selected, setSelected] = useState<T | null>(null);
    const ActiveComponent = selected ? componentMap[selected] : null;
    const selectedLabel = selected
        ? items.find(([key]) => key === selected)?.[1]
        : title;

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
                            onClick={() => setSelected(key)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </CardContent>

            <Dialog
                open={!!selected}
                onOpenChange={(open) => !open && setSelected(null)}
            >
                <DialogContent title={selectedLabel ?? title}>
                    {ActiveComponent ? <ActiveComponent /> : null}
                </DialogContent>
            </Dialog>
        </Card>
    );
}
