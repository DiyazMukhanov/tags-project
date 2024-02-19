import styles from './Counter.module.css';

type Props = {
    count: number
}

export const Counter = ({ count }: Props) => {
    return (
        <div className={styles.counter}>
            +{count}
        </div>
    )
}