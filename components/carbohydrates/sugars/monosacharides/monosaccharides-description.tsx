import { Monosaccharides } from "@/lib/enums/carbohydrates";
import { MonosaccharideMap } from "@/lib/carbohydrateMappings";
import { CarbohydrateTopicList } from "../../carbohydrate-topic-list";

export default function MonosaccharidesDescription() {
    const items = Object.entries(Monosaccharides) as Array<
        [keyof typeof Monosaccharides, string]
    >;

    return (
        <CarbohydrateTopicList
            title="Монозахариди"
            description={
                <ul>
                    <li>Това са единични захарни молекули</li>
                    <li>Тялото ги абсорбира директно в кръвната захар</li>
                </ul>
            }
            items={items}
            componentMap={MonosaccharideMap}
        />
    );
}
