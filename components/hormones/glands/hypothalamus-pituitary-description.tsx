import { HypothalamusPituitaryTopics } from "@/lib/enums/hormones";
import { HypothalamusPituitaryTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function HypothalamusPituitaryDescription() {
    const items = Object.entries(HypothalamusPituitaryTopics) as Array<
        [keyof typeof HypothalamusPituitaryTopics, string]
    >;

    return (
        <TopicListDialog
            title="Хипоталамус и хипофиза"
            description={
                <ul>
                    <li>Управляват щитовидната, надбъбречните, половите жлези</li>
                    <li>8 хормона с отделни обяснения</li>
                </ul>
            }
            items={items}
            componentMap={HypothalamusPituitaryTopicMap}
        />
    );
}
