import { MainHormoneTopics } from "@/lib/enums/hormones";
import { MainHormoneTopicMap } from "@/lib/hormoneMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function HormonesDescription() {
    const items = Object.entries(MainHormoneTopics) as Array<
        [keyof typeof MainHormoneTopics, string]
    >;

    return (
        <TopicListDialog
            title="Хормони"
            description={
                <ul>
                    <li>
                        Хормоните не дават калории, но управляват как тялото
                        използва храната
                    </li>
                    <li>
                        Три вида: пептидни, стероидни и аминови – всеки с
                        отделно обяснение
                    </li>
                    <li>
                        Организирани по жлези: хипофиза, щитовидна, надбъбречни,
                        панкреас, полови и др.
                    </li>
                </ul>
            }
            items={items}
            componentMap={MainHormoneTopicMap}
        />
    );
}
