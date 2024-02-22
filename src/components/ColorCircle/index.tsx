import styles from './ColorCircle.module.css';

type Props = {
    chosen: boolean
    color: string
    id: number
    onClick: () => void
}

const Circle = ({ color }: { color: string }) => {
    return (
        <div
            className={styles.circle}
            style={{
                backgroundColor: color
            }}
        >
        </div>
    )

}

export const ColorCircle = ({ chosen, color, id, onClick }: Props) => {
    return (
        <div onClick={onClick} className={styles.circleBlock}>
            {chosen ? <div
                className={styles.chosenContainer}
                style={{ borderColor: color }}
            >
                <Circle color={color} />
            </div> : <Circle color={color} />}
        </div>
    )
}