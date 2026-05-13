import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DisaccharidesDescription() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Дизахариди</CardTitle>
                <CardDescription>
                    <ul>
                        <li>
                            Съставени са от 2 монозахарида
                        </li>
                        <li>
                            Тялото трябва да ги разгради до монозахариди, за да ги използва
                        </li>
                    </ul>
                </CardDescription>
                <CardContent>
                    <ul>
                        <li className="cursor-pointer hover:underline">Захароза = глюкоза + фруктоза
                            (трапезна захар)</li>
                        <li className="cursor-pointer hover:underline">Лактоза = глюкоза + галактоза
                            (мляко)</li>
                        <li className="cursor-pointer hover:underline">Малтоза = глюкоза + глюкоза
                            (разграждане на нишесте)</li>
                    </ul>
                </CardContent>
            </CardHeader>
        </Card>
    )
}