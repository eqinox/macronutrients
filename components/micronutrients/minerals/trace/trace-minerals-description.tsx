import { TraceMineralTopics } from "@/lib/enums/micronutrients";
import { TraceMineralTopicMap } from "@/lib/micronutrientMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function TraceMineralsDescription() {
    const items = Object.entries(TraceMineralTopics) as Array<
        [keyof typeof TraceMineralTopics, string]
    >;

    return (
        <TopicListDialog
            title="Микроелементи (траси)"
            description={
                <ul>
                    <li>10 микроелемента – нужни в мили- или микрограми</li>
                    <li>
                        Желязо, цинк, мед, манган, йод, селен, хром, молибден,
                        флуорид, кобалт
                    </li>
                </ul>
            }
            items={items}
            componentMap={TraceMineralTopicMap}
        />
    );
}
