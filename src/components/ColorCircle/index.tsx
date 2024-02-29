import styles from './ColorCircle.module.css';

type Props = {
    color: string
    isChosen: boolean
    onClick: (event: React.MouseEvent) => void
}

export const ColorCircle = ({ color, isChosen, onClick }: Props) => {

    return (
        <>

            <div
                className={styles.circle}
                style={{
                    backgroundColor: color,
                    borderColor: color
                }}
                onClick={onClick}
            >
                {isChosen && (
                    <div className={styles.chosen}
                        style={{
                            borderColor: color
                        }}>

                    </div>
                )}
            </div>
        </>
    )

}