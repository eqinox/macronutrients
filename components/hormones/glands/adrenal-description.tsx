import { AdrenalTopics } from "@/lib/enums/hormones";
import { AdrenalTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function AdrenalDescription() {
    const items = Object.entries(AdrenalTopics) as Array<
        [keyof typeof AdrenalTopics, string]
    >;

    return (
        <TopicListDialog
            title="Надбъбречни жлези"
            description={
                <ul>
                    <li>Кортизол, алдостерон, адреналин, норадреналин</li>
                    <li>Стрес, сол, кръвно налягане, бърз отговор</li>
                </ul>
            }
            items={items}
            componentMap={AdrenalTopicMap}
        />
    );
}
