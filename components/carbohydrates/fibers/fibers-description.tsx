import { FiberTopics } from "@/lib/enums/carbohydrates";
import { FiberTopicMap } from "@/lib/carbohydrateMappings";
import { CarbohydrateTopicList } from "../carbohydrate-topic-list";

export default function FibersDescription() {
    const items = Object.entries(FiberTopics) as Array<
        [keyof typeof FiberTopics, string]
    >;

    return (
        <CarbohydrateTopicList
            title="Фибри"
            description={
                <ul>
                    <li>
                        Фибрите са въглехидрати, които не се усвояват в тънките
                        черва
                    </li>
                    <li>
                        Подпомагат храносмилането, ситостта и здравето на червата
                    </li>
                </ul>
            }
            items={items}
            componentMap={FiberTopicMap}
        />
    );
}
