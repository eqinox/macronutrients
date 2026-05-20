import { GlandTopics } from "@/lib/enums/hormones";
import { GlandTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function GlandsDescription() {
    const items = Object.entries(GlandTopics) as Array<
        [keyof typeof GlandTopics, string]
    >;

    return (
        <TopicListDialog
            title="Хормони по жлези и органи"
            description={
                <ul>
                    <li>Всяка жлеза произвежда специфични хормони</li>
                    <li>
                        Хипоталамус и хипофиза координират останалите – „команден
                        център“
                    </li>
                </ul>
            }
            items={items}
            componentMap={GlandTopicMap}
        />
    );
}
