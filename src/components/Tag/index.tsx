import { MouseEventHandler, ReactNode } from 'react'
import styles from './Tag.module.css'
import classNames from 'classnames'

type Props = {
    color: string
    children?: ReactNode
    text: string
    isShort?: boolean
    size: 'small' | 'large'
    id: number
    onMouseEnter?: MouseEventHandler<HTMLDivElement>
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
    onClick?: MouseEventHandler<HTMLDivElement>
}

export default function Tag({ color, children, text, isShort, size, onMouseEnter, onMouseLeave, onClick, id }: Props) {
    return (
        <div
            className={classNames(
                styles.tag,
                styles[size]
            )
            }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={{
                backgroundColor: color
            }}
            key={id}
        >
            <div
                className={classNames(
                    styles.content,
                    { [styles.short]: isShort })
                }
            >
                {text}
            </div>
            {children && <div className={styles.children}>
                {children}
            </div>}

        </div>
    )
}