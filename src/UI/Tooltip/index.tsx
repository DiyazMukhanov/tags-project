import { usePosition } from '@/utils/hooks/usePosition';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

type UsePositionOptions = {
    yOffset?: number
    xOffset?: number
};

type Props = {
    content: ReactNode;
    children: (
        onMouseEnter: (event: React.MouseEvent) => void,
        onMouseLeave: () => void,
    ) => JSX.Element
    className?: string
    options?: UsePositionOptions
};

export function Tooltip({ children, content, options }: Props) {
    const { position, setPosition, onMouseEventHandler } = usePosition(options)

    const onMouseEnterHandler = (event: React.MouseEvent) => {
        onMouseEventHandler(event)
    }

    const onMouseLeaveHanlder = () => {
        setPosition(null);
    };

    return (
        <>
            {position &&
                createPortal(
                    <div
                        style={{
                            position: 'absolute',
                            top: position?.top,
                            left: position?.left,
                            zIndex: '1',
                        }}
                    >
                        {content}
                    </div>,
                    document.body
                )}
            {children(onMouseEnterHandler, onMouseLeaveHanlder)}
        </>
    );
}
