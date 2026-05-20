import { UnsaturatedFatTopics } from "@/lib/enums/fats";
import { UnsaturatedFatTopicMap } from "@/lib/fatMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function UnsaturatedFatsDescription() {
    const items = Object.entries(UnsaturatedFatTopics) as Array<
        [keyof typeof UnsaturatedFatTopics, string]
    >;

    return (
        <TopicListDialog
            title="Ненаситени мазнини"
            description={
                <ul>
                    <li>Имат поне една двойна връзка в мастната киселина</li>
                    <li>
                        Обикновено са течни на стайна температура (олиа, риба,
                        ядки)
                    </li>
                </ul>
            }
            items={items}
            componentMap={UnsaturatedFatTopicMap}
        />
    );
}
