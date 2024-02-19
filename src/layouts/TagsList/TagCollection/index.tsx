import { Tooltip } from "@/UI/Tooltip";
import Tag from "@/components/Tag";
import { TagInfo } from "@/components/TagInfo";
import styles from './TagCollection.module.css';
import { Counter } from "@/components/Counter";
import { useState } from "react";

const findTag = (tags, collectionItem) => {
    return tags.filter(tag => tag.id === collectionItem.tagIds[collectionItem.tagIds.length - 1])[0]
}

const getTagsList = (tags, ids) => {
    let tagsList = []

    for (let i = 0; i < ids.length; i++) {
        let tag = tags.filter(tag => tag.id === ids[i])
        tagsList.push(tag[0])
    }

    return tagsList
}

const TAGS = [
    {
        id: 1,
        name: 'Тэг 1',
        color: '#47D17C',
        order: 1
    },
    {
        id: 2,
        name: 'Тэг 2',
        color: '#F46262',
        order: 2
    },
    {
        id: 3,
        name: 'Очень длинный тэг',
        color: '#FC944A',
        order: 3
    },
    {
        id: 4,
        name: 'Тэг 4',
        color: '#FAD038',
        order: 4
    },
    {
        id: 5,
        name: 'Тэг 5',
        color: '#6E85F7',
        order: 5
    },
]

export const TagCollection = ({ collectionItem, onClick }) => {
    return (
        <tr key={collectionItem.id} className={styles.row}>
            <td>{collectionItem.id}</td>
            <td className={styles.tagContainer}>
                <Tooltip
                    content={<TagInfo tags={getTagsList(TAGS, collectionItem.tagIds)} />}
                >
                    {(onMouseEnter, onMouseLeave) => {
                        return (
                            <div className={styles.container}>
                                <Tag
                                    text={findTag(TAGS, collectionItem).name}
                                    color={findTag(TAGS, collectionItem).color}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                    onClick={onClick}
                                />
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