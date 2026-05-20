import { WaterSolubleVitaminTopics } from "@/lib/enums/micronutrients";
import { WaterSolubleVitaminTopicMap } from "@/lib/micronutrientMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function WaterSolubleVitaminsDescription() {
    const items = Object.entries(WaterSolubleVitaminTopics) as Array<
        [keyof typeof WaterSolubleVitaminTopics, string]
    >;

    return (
        <TopicListDialog
            title="Водоразтворими витамини"
            description={
                <ul>
                    <li>Не се съхраняват дълго – нужен е редовен прием</li>
                    <li>Излишъкът обикновено се изхвърля с урината</li>
                </ul>
            }
            items={items}
            componentMap={WaterSolubleVitaminTopicMap}
        />
    );
}
