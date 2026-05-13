import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tyrosine() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Тирозин</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>Прекурсор на невротрансмитерите</li>
                    <li>Важна за производството на тироидни хормони</li>
                </ul>
            </CardContent>
        </Card>
    );
}