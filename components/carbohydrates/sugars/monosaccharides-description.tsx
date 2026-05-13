import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonosaccharidesDescription() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Монозахариди</CardTitle>
                <CardDescription>
                    <ul>
                        <li>
                            Това са единични захарни молекули
                        </li>
                        <li>
                            Тялото ги абсорбира директно в кръвта
                        </li>
                    </ul>
                </CardDescription>
                <CardContent>
                    <ul>
                        <li className="cursor-pointer hover:underline">Глюкоза</li>
                        <li className="cursor-pointer hover:underline">Фруктоза</li>
                        <li className="cursor-pointer hover:underline">Галактоза</li>
                    </ul>
                </CardContent>
            </CardHeader>
        </Card>
    )
}