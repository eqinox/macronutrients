import { ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export default function AminoacidDescription() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Протеини -Аминокиселини</CardTitle>
                <CardDescription>
                    Протеините се разграждат до аминокиселини
                </CardDescription>
            </CardHeader>
            <CardContent>
                Видове:
                <Collapsible>
                    <CollapsibleTrigger>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                        >
                            <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                            Незаменими
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <p>Незаменими - не могат да се синтезират от организма, трябва да се набавят чрез храната</p>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                    <CollapsibleTrigger>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                        >
                            <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                            Заменими
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <p>Заменими - могат да се синтезират от организма</p>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
}