import { MainFatTopics } from "@/lib/enums/fats";
import { MainFatTopicMap } from "@/lib/fatMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function FatsDescription() {
    const items = Object.entries(MainFatTopics) as Array<
        [keyof typeof MainFatTopics, string]
    >;

    return (
        <TopicListDialog
            title="Мазнини"
            description={
                <ul>
                    <li>
                        Концентриран източник на енергия (9 kcal/г) и важни за
                        хормони и клетъчни мембрани
                    </li>
                    <li>
                        По химична структура се делят на наситени, ненаситени и
                        транс мазнини
                    </li>
                    <li>
                        Холестеролът е отделен липид, свързан с мазнините в
                        храненето
                    </li>
                </ul>
            }
            items={items}
            componentMap={MainFatTopicMap}
        />
    );
}
