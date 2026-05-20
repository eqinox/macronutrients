import { ThyroidTopics } from "@/lib/enums/hormones";
import { ThyroidTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function ThyroidDescription() {
    const items = Object.entries(ThyroidTopics) as Array<
        [keyof typeof ThyroidTopics, string]
    >;

    return (
        <TopicListDialog
            title="Щитовидна и паращитовидна"
            description={
                <ul>
                    <li>Задават скоростта на метаболизма (T3, T4)</li>
                    <li>Калцитонин и PTH – баланс на калций</li>
                </ul>
            }
            items={items}
            componentMap={ThyroidTopicMap}
        />
    );
}
