import { PinealTopics } from "@/lib/enums/hormones";
import { PinealTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function PinealDescription() {
    const items = Object.entries(PinealTopics) as Array<
        [keyof typeof PinealTopics, string]
    >;

    return (
        <TopicListDialog
            title="Епифиза"
            description={
                <ul>
                    <li>Мелатонин – хормон на тъмнината и съня</li>
                    <li>Производно на триптофан от храната</li>
                </ul>
            }
            items={items}
            componentMap={PinealTopicMap}
        />
    );
}
