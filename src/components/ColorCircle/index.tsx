import styles from './ColorCircle.module.css';

type Props = {
    color: string
    isChosen: boolean
    onClick: (event: React.MouseEvent) => void
}

type OuterCircleProps = {
    strokeColor?: string
    fillColor?: string
}

const OuterCircleSVG = ({ strokeColor, fillColor }: OuterCircleProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke={strokeColor} strokeWidth="2" />
            <circle cx="12" cy="12" r="8" fill={fillColor} />
        </svg>
    )
}

export const ColorCircle = ({ color, isChosen, onClick }: Props) => {

    return (
        <div className={styles.container}>
            {
                isChosen ? (
                    <>
                        <div className={styles.chosen}>
                            <OuterCircleSVG strokeColor={color} fillColor={color} />
                        </div>
                        <div
                            className={styles.circle}
                            style={{
                                backgroundColor: color,
                                borderColor: color
                            }}
                            onClick={onClick}
                        >
                        </div>
                    </>
                ) : (<div
                    className={styles.circle}
                    style={{
                        backgroundColor: color,
                        borderColor: color
                    }}
                    onClick={onClick}
                >
                </div>
                )
            }
        </div>
    )
}