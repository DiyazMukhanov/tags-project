import { Position } from "@/types/position";
import { useState } from "react";

type UsePositionOptions = {
    yOffset?: number
    xOffset?: number
};

export const usePosition = (options?: UsePositionOptions) => {
    const [position, setPosition] = useState<Position | null>(null);

    const { yOffset = 10, xOffset = 0 } = options || {}

    const onMouseEventHandler = (event: React.MouseEvent) => {
        const hoveredElement = event.currentTarget as HTMLElement;
        setPosition({
            top: hoveredElement.getBoundingClientRect().bottom + yOffset,
            left: hoveredElement.getBoundingClientRect().left + + xOffset,
        });
    };

    return { position, setPosition, onMouseEventHandler }
}

