import { Tooltip } from "@/UI/Tooltip";
import Tag from "@/components/Tag";
import { TagInfo } from "@/components/TagInfo";
import styles from './TagCollection.module.css';
import { Counter } from "@/components/Counter";
import { getTagsList } from "@/utils/getTagsList";
import { useSelector } from 'react-redux';
import { CollectionInterface, RootState, TagInterface } from "@/store/slices/sliceTypes";
import { useState } from "react";

type Props = {
    collectionItem: CollectionInterface
    onClick: (event: React.MouseEvent) => void
}

const findTag = (tags: TagInterface[], collectionItem: CollectionInterface) => {
    return tags.filter(tag => tag.id === collectionItem.tagIds[collectionItem.tagIds.length - 1])[0]
}

export const TagCollection = ({ collectionItem, onClick }: Props) => {
    const [addIsHovered, setAddIsHovered] = useState(false)
    const tagsList = useSelector((state: RootState) => state.tags.tags);

    return (
        <tr key={collectionItem.id} className={styles.row}>
            <td className={styles.itemId}>{collectionItem.id}</td>
            <td className={styles.tagContainer}>
                <Tooltip
                    content={<TagInfo tags={getTagsList(tagsList, collectionItem.tagIds)} />}
                >
                    {(onMouseEnter, onMouseLeave) => {
                        return (
                            <div className={styles.container}>
                                {collectionItem.tagIds.length > 0 ? <Tag
                                    size="large"
                                    id={collectionItem.id}
                                    text={findTag(tagsList, collectionItem)?.name}
                                    color={findTag(tagsList, collectionItem)?.color}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                    onClick={onClick}
                                    isShort={true}
                                /> : <div onMouseEnter={() => setAddIsHovered(true)} onMouseLeave={() => setAddIsHovered(false)}>{addIsHovered ? <div className={styles.addTag} onClick={onClick}><span>+</span> <span>Добавить тег</span></div> : <span>-</span>}</div>}
                                {collectionItem.tagIds.length > 1 && <Counter count={collectionItem.tagIds.length - 1} />}
                            </div>
                        )
                    }}
                </Tooltip>
            </td>
            <td></td>
        </tr>
    )

}