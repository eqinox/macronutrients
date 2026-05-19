import { StarchTopics } from "@/lib/enums/carbohydrates";
import { StarchTopicMap } from "@/lib/carbohydrateMappings";
import { CarbohydrateTopicList } from "../carbohydrate-topic-list";

export default function StarchesDescription() {
    const items = Object.entries(StarchTopics) as Array<
        [keyof typeof StarchTopics, string]
    >;

    return (
        <CarbohydrateTopicList
            title="Нишестета"
            description={
                <ul>
                    <li>
                        Нишестетата са сложни въглехидрати и се усвояват по-бавно
                        от захарите, давайки по-дълготрайна енергия
                    </li>
                    <li>
                        Важни са за ситост, тренировки и по-стабилна кръвна захар
                    </li>
                </ul>
            }
            items={items}
            componentMap={StarchTopicMap}
        />
    );
}
