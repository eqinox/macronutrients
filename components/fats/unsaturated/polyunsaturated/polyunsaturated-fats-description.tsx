import { PolyunsaturatedFatTopics } from "@/lib/enums/fats";
import { PolyunsaturatedFatTopicMap } from "@/lib/fatMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function PolyunsaturatedFatsDescription() {
    const items = Object.entries(PolyunsaturatedFatTopics) as Array<
        [keyof typeof PolyunsaturatedFatTopics, string]
    >;

    return (
        <TopicListDialog
            title="Полиненаситени мазнини"
            description={
                <ul>
                    <li>Имат две или повече двойни връзки</li>
                    <li>
                        Омега-3 и омега-6 са незаменими – трябва да идват от
                        храната
                    </li>
                </ul>
            }
            items={items}
            componentMap={PolyunsaturatedFatTopicMap}
        />
    );
}
