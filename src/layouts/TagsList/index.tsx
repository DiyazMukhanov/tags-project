import { Tooltip } from "@/UI/Tooltip";
import { Paper } from "../../UI/Paper/index";
import Tag from "../../components/Tag/index";
import styles from './TagsList.module.css';
import classNames from "classnames";
import { TagInfo } from "@/components/TagInfo";
import { TagCollection } from "./TagCollection";
import { Modal } from "@/UI/Modal";
import { useState } from "react";
import { usePosition } from "@/utils/hooks/usePosition";
import { TagsSettings } from "@/components/TagsSettings";
import { getTagsList } from "@/utils/getTagsList";
import { TagType } from "@/types/TagType";
// import { TAGS } from "@/utils/tags";
import { useSelector, useDispatch } from 'react-redux';
import { addTag, deleteTag, updateTag, addTagToCollection } from '../../store/slices/tagsSlice';

const TABLEHEADERS = [
    {
        title: 'ID',
        id: 1,
        width: 'small'
    },
    {
        title: 'Тэги',
        id: 2,
        width: 'medium'
    },
    {
        title: 'Пустая колонка',
        id: 3,
        width: 'large'
    }
]

// const ITEMS = [
//     {
//         id: 123450,
//         tagIds: [1, 2, 3]
//     },
//     {
//         id: 123451,
//         tagIds: [1, 2, 3, 4, 5]
//     },
//     {
//         id: 123452,
//         tagIds: [1, 2, 3, 4, 5]
//     },
//     {
//         id: 123453,
//         tagIds: [1, 2, 3, 4,]
//     },
//     {
//         id: 123454,
//         tagIds: [1, 2]
//     },
// ]

export default function TagsList() {
    const { position, setPosition, onMouseEventHandler } = usePosition()
    const [tags, setTags] = useState<TagType[]>(null)
    // const [tagsList, setTagsList] = useState(TAGS)
    // const [tagItems, setTagItems] = useState(ITEMS)
    const [currentTagsCollectionId, setCurrentTagsCollectionId] = useState(null)
    const dispatch = useDispatch();
    const tagsList = useSelector(state => state.tags.tags);
    const collections = useSelector(state => state.tags.collections);

    const onTagClickHandler = (event: React.MouseEvent, ids, collectionId) => {
        let tags = getTagsList(tagsList, ids)
        setTags(tags)
        onMouseEventHandler(event)
        setCurrentTagsCollectionId(collectionId)
    }

    return (
        <div>
            <Modal
                className='modalContent'
                onClose={() => setPosition(null)}
                position={position}
            >
                <TagsSettings
                    tagsList={tagsList}
                    tags={tags}
                    setTags={setTags}
                    collections={collections}
                    currentTagsCollectionId={currentTagsCollectionId}
                />
            </Modal>
            <Paper radius="large" className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.row}>
                            {TABLEHEADERS.map(header => (
                                <th className={classNames(
                                    styles.tableHeader,
                                    styles[header.width]
                                )} key={header.id}>{header.title}</th>
                            )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {collections.map(collection => (
                            <TagCollection key={collection.id} collectionItem={collection} onClick={(e) => onTagClickHandler(e, collection.tagIds, collection.id)} />
                        ))}
                    </tbody>
                </table>
            </Paper>
        </div>
    )
}