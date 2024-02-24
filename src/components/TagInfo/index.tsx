import { Paper } from '@/UI/Paper';
import styles from './TagInfo.module.css';
import Tag from '../Tag';
import { TagInterface } from '@/store/slices/sliceTypes';

type Props = {
    tags: TagInterface[]
}

export const TagInfo = ({ tags }: Props) => {
    return (
        <Paper radius='medium' className={styles.tagInfo}>
            {tags.map(tag => (
                <Tag text={tag.name} color={tag.color} size='large' id={tag.id} key={tag.id} />
            ))}
        </Paper>
    )
}