import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tryptophan() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Триптофан</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>Превръща се в серотонин → настроение, сън</li>
                    <li>Превръща се и в мелатонин</li>
                </ul>
            </CardContent>
        </Card>
    );
}
