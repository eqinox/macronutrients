import { AppetiteTopics } from "@/lib/enums/hormones";
import { AppetiteTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function AppetiteDescription() {
    const items = Object.entries(AppetiteTopics) as Array<
        [keyof typeof AppetiteTopics, string]
    >;

    return (
        <TopicListDialog
            title="Апетит и метаболизъм"
            description={
                <ul>
                    <li>Грелин – глад (от стомаха)</li>
                    <li>Лептин – ситост (от мастна тъкан)</li>
                </ul>
            }
            items={items}
            componentMap={AppetiteTopicMap}
        />
    );
}
