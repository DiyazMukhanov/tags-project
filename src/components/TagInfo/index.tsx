import { Paper } from '@/UI/Paper';
import styles from './TagInfo.module.css';
import Tag from '../Tag';

export const TagInfo = ({ tags }) => {
    return (
        <Paper radius='medium' className={styles.tagInfo}>
            {tags.map(tag => (
                <Tag text={tag.name} color={tag.color} isShort={true} size='large' id={tag.id} key={tag.id} />
            ))}
        </Paper>
    )
}