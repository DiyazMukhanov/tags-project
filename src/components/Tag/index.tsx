import { MouseEventHandler, ReactNode } from 'react'
import styles from './Tag.module.css'
import classNames from 'classnames'

type Props = {
    color: string
    children?: ReactNode
    text: string
    isShort: boolean
    onMouseEnter?: MouseEventHandler<HTMLDivElement>
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
}

export default function Tag({ color, children, text, isShort, onMouseEnter, onMouseLeave, onClick }: Props) {
    return (
        <div
            className={classNames(
                styles.tag,
            )
            }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={{
                backgroundColor: color
            }}
        >
            <div
                className={classNames(
                    styles.content,
                    { [styles.short]: isShort })
                }
            >
                {text}
                {children}
            </div>
        </div>
    )
}