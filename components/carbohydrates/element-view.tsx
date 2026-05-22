import { useState } from "react";

import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {

    Card,

    CardContent,

    CardDescription,

    CardHeader,

    CardTitle,

} from "@/components/ui/card";

import {

    Collapsible,

    CollapsibleContent,

    CollapsibleTrigger,

} from "@/components/ui/collapsible";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { getElementById } from "@/lib/element-registry";

import type { Element, ElementId } from "@/lib/types";

import { RichText } from "./rich-text";



interface ElementViewProps {

    element: Element;

}



export function ElementView({ element }: ElementViewProps) {

    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const [openTermIds, setOpenTermIds] = useState<ElementId[]>([]);



    const handleOpenChange = (title: string, open: boolean) => {

        setOpenItems((prev) => ({

            ...prev,

            [title]: open,

        }));

    };



    const openTerm = (termId: ElementId) => {

        if (!getElementById(termId)) return;

        setOpenTermIds((prev) =>

            prev.includes(termId) ? prev : [...prev, termId],

        );

    };



    const closeTerm = (termId: ElementId) => {

        setOpenTermIds((prev) => prev.filter((id) => id !== termId));

    };



    return (

        <>

            <Card className="min-w-0 w-full border-0 bg-transparent py-0 shadow-none">

                <CardHeader>
                    <CardTitle>{element.name}</CardTitle>

                    <CardDescription>

                        <RichText

                            text={element.description}

                            onTermClick={openTerm}

                        />

                    </CardDescription>

                </CardHeader>

                <CardContent>

                    {element.properties.map((property) => (

                        <Collapsible

                            key={property.action}

                            open={openItems[property.action]}

                            onOpenChange={(open) =>

                                handleOpenChange(property.action, open)

                            }

                        >

                            <CollapsibleTrigger asChild>

                                <Button

                                    variant="ghost"

                                    size="sm"

                                    className="group w-full justify-start whitespace-normal wrap-break-word py-6 text-left transition-none hover:bg-accent hover:text-accent-foreground"

                                >

                                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />

                                    {property.action}

                                </Button>

                            </CollapsibleTrigger>

                            <CollapsibleContent>

                                {property.itemsAboutAction.map((item, index) => {
                                    const phrase = item.startingPhrase.trim();
                                    const description = item.description.trim();
                                    const itemKey =
                                        phrase || description || String(index);

                                    return (
                                        <div key={itemKey} className="py-2">
                                            {phrase ? (
                                                <span className="font-bold">
                                                    <RichText
                                                        text={item.startingPhrase}
                                                        onTermClick={openTerm}
                                                    />
                                                </span>
                                            ) : null}
                                            {description ? (
                                                <p
                                                    className={
                                                        phrase ? undefined : "m-0"
                                                    }
                                                >
                                                    <RichText
                                                        text={item.description}
                                                        onTermClick={openTerm}
                                                    />
                                                </p>
                                            ) : null}
                                        </div>
                                    );
                                })}

                            </CollapsibleContent>

                        </Collapsible>

                    ))}

                </CardContent>

            </Card>



            {openTermIds.map((termId) => {

                const termElement = getElementById(termId);

                if (!termElement) return null;



                return (

                    <Dialog

                        key={termId}

                        open

                        onOpenChange={(open) => !open && closeTerm(termId)}

                    >

                        <DialogContent title={termElement.name}>

                            <ElementView element={termElement} />

                        </DialogContent>

                    </Dialog>

                );

            })}

        </>

    );

}


