import { Disaccharides } from "@/lib/enums/carbohydrates";
import { DisaccharideMap } from "@/lib/carbohydrateMappings";
import { CarbohydrateTopicList } from "../carbohydrate-topic-list";

export default function DisaccharidesDescription() {
    const items = Object.entries(Disaccharides) as Array<
        [keyof typeof Disaccharides, string]
    >;

    return (
        <CarbohydrateTopicList
            title="Дизахариди"
            description={
                <ul>
                    <li>Съставени са от 2 монозахарида</li>
                    <li>
                        Тялото трябва да ги разгради до монозахариди, за да ги
                        използва
                    </li>
                </ul>
            }
            items={items}
            componentMap={DisaccharideMap}
        />
    );
}
