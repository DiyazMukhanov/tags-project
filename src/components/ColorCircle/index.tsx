import { useState } from 'react';
import styles from './ColorCircle.module.css';

type Props = {
    color: string
    onClick: (event: React.MouseEvent) => void
}

export const ColorCircle = ({ color, onClick }: Props) => {

    return (
        <div
            className={styles.circle}
            style={{
                backgroundColor: color
            }}
            onClick={onClick}
        >
        </div>
    )

}