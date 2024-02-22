import { Tooltip } from "@/UI/Tooltip";
import Tag from "@/components/Tag";
import { TagInfo } from "@/components/TagInfo";
import styles from './TagCollection.module.css';
import { Counter } from "@/components/Counter";
import { useState } from "react";
import { getTagsList } from "@/utils/getTagsList";
// import { TAGS } from "@/utils/tags";
import { useSelector, useDispatch } from 'react-redux';
import { addTag, deleteTag, updateTag, addTagToCollection } from '../../../store/slices/tagsSlice';

const findTag = (tags, collectionItem) => {
    return tags.filter(tag => tag.id === collectionItem.tagIds[collectionItem.tagIds.length - 1])[0]
}

export const TagCollection = ({ collectionItem, onClick }) => {
    const dispatch = useDispatch();
    const tagsList = useSelector(state => state.tags.tags);
    const collections = useSelector(state => state.tags.collections);

    return (
        <tr key={collectionItem.id} className={styles.row}>
            <td>{collectionItem.id}</td>
            <td className={styles.tagContainer}>
                <Tooltip
                    content={<TagInfo tags={getTagsList(tagsList, collectionItem.tagIds)} />}
                >
                    {(onMouseEnter, onMouseLeave) => {
                        return (
                            <div className={styles.container}>

                                {collectionItem.tagIds.length > 0 ? <Tag
                                    size="large"
                                    text={findTag(tagsList, collectionItem)?.name}
                                    color={findTag(tagsList, collectionItem)?.color}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                    onClick={onClick}
                                /> : <div>-</div>}
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