import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Phenylalanine() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Фенилаланин</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>Превръща се в тирозин</li>
                    <li>От него се правят допамин, адреналин, норадреналин</li>
                </ul>
            </CardContent>
        </Card>
    );
}
