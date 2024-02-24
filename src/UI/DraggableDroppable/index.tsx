import { DndContext, useDraggable, useDroppable, PointerSensor, useSensor, MouseSensor } from '@dnd-kit/core';
import styles from './DraggableDroppable.module.css';
import { TagInterface } from '@/store/slices/sliceTypes';
import { ReactNode } from 'react';

type Props = {
    tag: TagInterface
    children: ReactNode
    icon: ReactNode
}

export const DraggableDroppableTag = ({ tag, children, icon }: Props) => {
    const { attributes, listeners, setNodeRef: setDragNodeRef, transform } = useDraggable({ id: tag.id.toString() });
    const { setNodeRef: setDropNodeRef } = useDroppable({ id: tag.id.toString() });

    const setNodeRefs = (node: HTMLElement | null) => {
        setDragNodeRef(node);
        setDropNodeRef(node);
    };

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined

    return (
        <div ref={setNodeRefs} style={style} className={styles.dndBlock}>
            <div {...listeners} {...attributes} style={{ cursor: 'grab' }} className={styles.icon}>{icon}</div>
            {children}
        </div>
    );
};