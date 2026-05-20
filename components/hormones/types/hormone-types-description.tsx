import { HormoneTypeTopics } from "@/lib/enums/hormones";
import { HormoneTypeTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function HormoneTypesDescription() {
    const items = Object.entries(HormoneTypeTopics) as Array<
        [keyof typeof HormoneTypeTopics, string]
    >;

    return (
        <TopicListDialog
            title="Видове хормони"
            description={
                <ul>
                    <li>Разделят се по структура и от какво се правят</li>
                    <li>
                        Пептидни (от аминокиселини), стероидни (от холестерол),
                        аминови (от тирозин/триптофан)
                    </li>
                </ul>
            }
            items={items}
            componentMap={HormoneTypeTopicMap}
        />
    );
}
