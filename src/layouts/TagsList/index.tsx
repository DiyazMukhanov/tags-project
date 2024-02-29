import { Paper } from "../../UI/Paper/index";
import styles from './TagsList.module.css';
import classNames from "classnames";
import { TagCollection } from "./TagCollection";
import { ModalPositioned } from "@/UI/ModalPositioned";
import { useRef, useState } from "react";
import { TagsSettings } from "@/components/TagsSettings";
import { getTagsList } from "@/utils/getTagsList";
import { TagInterface } from "@/store/slices/sliceTypes";
import { RootState } from "@/store/slices/sliceTypes";

import { useSelector } from 'react-redux';
import { Position } from "@/types/position";

const TABLEHEADERS = [
    {
        title: 'ID',
        id: 1,
        width: 'small'
    },
    {
        title: 'Теги',
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
    const [collectionPosition, setCollectionPosition] = useState<Position | null>(null)
    const [tags, setTags] = useState<TagInterface[] | null>(null)
    const [currentTagsCollectionId, setCurrentTagsCollectionId] = useState<number | null>(null)
    const tagsList = useSelector((state: RootState) => state.tags.tags);
    const collections = useSelector((state: RootState) => state.tags.collections);
    const collectionRefs = useRef<(HTMLDivElement | null)[]>([])

    const updateAddedTags = (ids: number[]) => {
        let tags = getTagsList(tagsList, ids)
        setTags(tags)
    }

    const onTagClickHandler = (event: React.MouseEvent, ids: number[], collectionId: number, index: number) => {
        updateAddedTags(ids)
        setCurrentTagsCollectionId(collectionId)

        const currentCollectionRef = collectionRefs.current[index]
        if (currentCollectionRef) {
            const { left, top } = currentCollectionRef.getBoundingClientRect()
            setCollectionPosition({
                top: top + 50,
                left: left
            })
        }
    }

    return (
        <div>
            <ModalPositioned
                className='modalContent'
                onClose={() => setCollectionPosition(null)}
                position={collectionPosition}
            >
                <TagsSettings
                    tags={tags}
                    setTags={setTags}
                    currentTagsCollectionId={currentTagsCollectionId}
                />
            </ModalPositioned>
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
                        {collections.map((collection, index) => (
                            <TagCollection
                                key={collection.id}
                                collectionItem={collection}
                                onClick={(e) => onTagClickHandler(e, collection.tagIds, collection.id, index)}
                                ref={collection => collectionRefs.current[index] = collection}
                            />
                        ))}
                    </tbody>
                </table>
            </Paper>
        </div>
    )
}