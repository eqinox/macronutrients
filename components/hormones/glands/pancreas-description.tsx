import { PancreasTopics } from "@/lib/enums/hormones";
import { PancreasTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function PancreasDescription() {
    const items = Object.entries(PancreasTopics) as Array<
        [keyof typeof PancreasTopics, string]
    >;

    return (
        <TopicListDialog
            title="Панкреас"
            description={
                <ul>
                    <li>Инсулин и глюкагон – баланс на кръвната захар</li>
                    <li>Директна връзка с въглехидратите в храната</li>
                </ul>
            }
            items={items}
            componentMap={PancreasTopicMap}
        />
    );
}
