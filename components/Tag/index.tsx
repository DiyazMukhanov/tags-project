import { ReactNode } from 'react'
import styles from './Tag.module.css'
import classNames from 'classnames'

type Props = {
    color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'darkBlue' | 'purple' | 'grey';
    children?: ReactNode
    text: string
}

export default function Tag({ color, children, text }: Props) {
    return (
        <div className={
            classNames(
                styles.tag,
                styles[color])
        }>
            <div className={styles.content}>
                {text}
                {children}
            </div>
        </div>
    )
}