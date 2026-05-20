import { VitaminTopics } from "@/lib/enums/micronutrients";
import { VitaminTopicMap } from "@/lib/micronutrientMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function VitaminsDescription() {
    const items = Object.entries(VitaminTopics) as Array<
        [keyof typeof VitaminTopics, string]
    >;

    return (
        <TopicListDialog
            title="Витамини"
            description={
                <ul>
                    <li>13 витамина, необходими за човешкото тяло</li>
                    <li>
                        Мазниноразтворими: A, D, E, K (4)
                    </li>
                    <li>
                        Водоразтворими: C + B1, B2, B3, B5, B6, B7, B9, B12 (9)
                    </li>
                </ul>
            }
            items={items}
            componentMap={VitaminTopicMap}
        />
    );
}
