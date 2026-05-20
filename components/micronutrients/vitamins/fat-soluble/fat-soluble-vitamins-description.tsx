import { FatSolubleVitaminTopics } from "@/lib/enums/micronutrients";
import { FatSolubleVitaminTopicMap } from "@/lib/micronutrientMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function FatSolubleVitaminsDescription() {
    const items = Object.entries(FatSolubleVitaminTopics) as Array<
        [keyof typeof FatSolubleVitaminTopics, string]
    >;

    return (
        <TopicListDialog
            title="Мазниноразтворими витамини"
            description={
                <ul>
                    <li>Усвояват се заедно с мазнините в храната</li>
                    <li>Могат да се съхраняват в тялото (черен дроб, мазнина)</li>
                </ul>
            }
            items={items}
            componentMap={FatSolubleVitaminTopicMap}
        />
    );
}
