import { BVitaminTopics } from "@/lib/enums/micronutrients";
import { BVitaminTopicMap } from "@/lib/micronutrientMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function BVitaminsDescription() {
    const items = Object.entries(BVitaminTopics) as Array<
        [keyof typeof BVitaminTopics, string]
    >;

    return (
        <TopicListDialog
            title="Витамини от група B"
            description={
                <ul>
                    <li>8 витамина от група B – всеки с отделно обяснение</li>
                    <li>
                        B1, B2, B3, B5, B6, B7, B9, B12
                    </li>
                </ul>
            }
            items={items}
            componentMap={BVitaminTopicMap}
        />
    );
}
