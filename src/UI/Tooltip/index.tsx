import { usePosition } from '@/utils/hooks/usePosition';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    content: ReactNode;
    children: (
        onMouseEnter: (event: React.MouseEvent) => void,
        onMouseLeave: () => void,
    ) => JSX.Element
    className?: string
};

export function Tooltip({ children, content }: Props) {
    const { position, setPosition, onMouseEventHandler } = usePosition()

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
