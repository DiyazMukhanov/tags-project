import { forwardRef } from 'react';
import styles from './Counter.module.css';

type Props = {
    count: number
    onMouseEnter: (event: React.MouseEvent) => void
    onMouseLeave: (event: React.MouseEvent) => void
    onClick?: (event: React.MouseEvent) => void
}

export const Counter = forwardRef<HTMLDivElement, Props>(({ count, onMouseEnter, onMouseLeave, onClick }, ref) => {

    return (
        <div
            className={styles.counter}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={ref}
            onClick={onClick}
        >
            +{count}
        </div>
    )
})