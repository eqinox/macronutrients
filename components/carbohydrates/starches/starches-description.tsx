import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StarchesDescription() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Нишестета</CardTitle>
                <CardDescription>
                    <ul>
                        <li>

                            Нишестетата са по-сложни въглехидрати и се усвояват по-бавно от организма, предоставяйки по-дълготрайна енергия
                        </li>
                        <li>
                            Те са важни за поддръжката на здравето и могат да помогнат за контролиране на нивата на кръвната захар.
                        </li>
                    </ul>

                </CardDescription>
            </CardHeader>
        </Card>
    )
}