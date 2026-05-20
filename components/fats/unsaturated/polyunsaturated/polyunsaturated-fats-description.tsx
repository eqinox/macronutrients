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
                        Омега-3, омега-6 и незаменимите мастни киселини – всеки
                        с отделно обяснение
                    </li>
                </ul>
            }
            items={items}
            componentMap={PolyunsaturatedFatTopicMap}
        />
    );
}
