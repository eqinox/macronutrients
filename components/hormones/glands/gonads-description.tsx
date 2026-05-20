import { GonadTopics } from "@/lib/enums/hormones";
import { GonadTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function GonadsDescription() {
    const items = Object.entries(GonadTopics) as Array<
        [keyof typeof GonadTopics, string]
    >;

    return (
        <TopicListDialog
            title="Полови жлези"
            description={
                <ul>
                    <li>Естроген, прогестерон, тестостерон</li>
                    <li>Цикъл, бременност, либидо, кости, мускули</li>
                </ul>
            }
            items={items}
            componentMap={GonadTopicMap}
        />
    );
}
