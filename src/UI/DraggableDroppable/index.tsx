import { DndContext, useDraggable, useDroppable, PointerSensor, useSensor, MouseSensor } from '@dnd-kit/core';
import styles from './DraggableDroppable.module.css';

export const DraggableDroppableTag = ({ tag, children, icon }) => {
    const { attributes, listeners, setNodeRef: setDragNodeRef, transform } = useDraggable({ id: tag.id.toString() });
    const { setNodeRef: setDropNodeRef } = useDroppable({ id: tag.id.toString() });

    const setNodeRefs = (node) => {
        setDragNodeRef(node);
        setDropNodeRef(node);
    };

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined

    return (
        <div ref={setNodeRefs} style={style} className={styles.dndBlock}>
            <div {...listeners} {...attributes} style={{ cursor: 'grab' }}>{icon}</div>
            {children}
        </div>
    );
};