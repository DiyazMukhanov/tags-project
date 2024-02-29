import { ReactNode } from 'react';
import styles from './Paper.module.css';
import classNames from 'classnames';

type Props = {
    children: ReactNode
    radius: 'small' | 'medium' | 'large'
    className: string
}

export const Paper = ({
    children,
    radius = 'medium',
    className,
}: Props) => {
    return (
        <div className={classNames(
            className,
            styles.paper,
            styles[radius],
        )}
        >
            {children}
        </div>
    )
}