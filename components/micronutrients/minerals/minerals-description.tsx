import { MineralTopics } from "@/lib/enums/micronutrients";
import { MineralTopicMap } from "@/lib/micronutrientMappings";
import { TopicListDialog } from "@/components/topic-list-dialog";

export default function MineralsDescription() {
    const items = Object.entries(MineralTopics) as Array<
        [keyof typeof MineralTopics, string]
    >;

    return (
        <TopicListDialog
            title="Минерали"
            description={
                <ul>
                    <li>17 минерала, необходими за човешкото тяло</li>
                    <li>
                        Макроминерали (7): калций, фосфор, магнезий, натрий,
                        калий, хлорид, сяра
                    </li>
                    <li>
                        Микроелементи (10): желязо, цинк, мед, манган, йод,
                        селен, хром, молибден, флуорид, кобалт
                    </li>
                </ul>
            }
            items={items}
            componentMap={MineralTopicMap}
        />
    );
}
