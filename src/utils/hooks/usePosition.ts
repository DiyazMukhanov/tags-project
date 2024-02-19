import { useState } from "react";

type Position = {
    top: number
    left: number
}

export const usePosition = () => {
    const [position, setPosition] = useState<Position | null>(null);

    const onMouseEventHandler = (event: React.MouseEvent) => {
        const hoveredElement = event.currentTarget as HTMLElement;
        setPosition({
            top: hoveredElement.getBoundingClientRect().bottom + 10,
            left: hoveredElement.getBoundingClientRect().left,
        });
    };

    return { position, setPosition, onMouseEventHandler }
}

