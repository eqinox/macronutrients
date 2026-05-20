import type { ComponentType } from "react";
import { ElementView } from "@/components/carbohydrates/element-view";
import type { Element } from "@/lib/types";

export function createElementView(element: Element): ComponentType {
    function ElementTopicView() {
        return <ElementView element={element} />;
    }
    ElementTopicView.displayName = element.name;
    return ElementTopicView;
}
