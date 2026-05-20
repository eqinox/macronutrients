import { MainMicronutrientTopics } from "@/lib/enums/micronutrients";
import { MainMicronutrientTopicMap } from "@/lib/micronutrientMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function MicronutrientsDescription() {
    const items = Object.entries(MainMicronutrientTopics) as Array<
        [keyof typeof MainMicronutrientTopics, string]
    >;

    return (
        <TopicListDialog
            title="Микронутриенти"
            description={
                <ul>
                    <li>
                        Витамини и минерали – нужни в малки количества, но
                        критични за здравето
                    </li>
                    <li>Не дават калории като макронутриентите</li>
                    <li>
                        Най-добът източник е разнообразна, цялостна храна
                    </li>
                </ul>
            }
            items={items}
            componentMap={MainMicronutrientTopicMap}
        />
    );
}
