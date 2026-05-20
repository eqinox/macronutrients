import { MacromineralTopics } from "@/lib/enums/micronutrients";
import { MacromineralTopicMap } from "@/lib/micronutrientMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function MacromineralsDescription() {
    const items = Object.entries(MacromineralTopics) as Array<
        [keyof typeof MacromineralTopics, string]
    >;

    return (
        <TopicListDialog
            title="Макроминерали"
            description={
                <ul>
                    <li>7 макроминерала – нужни в по-големи дневни количества</li>
                    <li>
                        Калций, фосфор, магнезий, натрий, калий, хлорид и сяра
                    </li>
                </ul>
            }
            items={items}
            componentMap={MacromineralTopicMap}
        />
    );
}
