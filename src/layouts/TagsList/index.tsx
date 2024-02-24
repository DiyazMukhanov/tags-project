import { Paper } from "../../UI/Paper/index";
import styles from './TagsList.module.css';
import classNames from "classnames";
import { TagCollection } from "./TagCollection";
import { Modal } from "@/UI/Modal";
import { useState } from "react";
import { usePosition } from "@/utils/hooks/usePosition";
import { TagsSettings } from "@/components/TagsSettings";
import { getTagsList } from "@/utils/getTagsList";
import { TagInterface } from "@/store/slices/sliceTypes";
import { RootState } from "@/store/slices/sliceTypes";

import { useSelector } from 'react-redux';

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

export default function TagsList() {
    const { position, setPosition, onMouseEventHandler } = usePosition()
    const [tags, setTags] = useState<TagInterface[] | null>(null)
    const [currentTagsCollectionId, setCurrentTagsCollectionId] = useState<number | null>(null)
    const tagsList = useSelector((state: RootState) => state.tags.tags);
    const collections = useSelector((state: RootState) => state.tags.collections);

    const onTagClickHandler = (event: React.MouseEvent, ids: number[], collectionId: number) => {
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
                    // tagsList={tagsList}
                    tags={tags}
                    setTags={setTags}
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