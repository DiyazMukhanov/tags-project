import { Paper } from '@/UI/Paper';
import styles from './TagsSettings.module.css';
import Tag from '../Tag';
import { TagInterface, RootState } from '@/store/slices/sliceTypes';
import Image from 'next/image';
import CancelButton from '../../../public/icons/closeTag.svg';
import SixDots from './../../../public/icons/sixDots.svg';
import Plus from './../../../public/icons/plus.svg';
import ThreeDots from './../../../public/icons/threeDots.svg';
import React, { useEffect, useState } from 'react';
import { Modal } from '@/UI/Modal';
import { TagEdit } from '../TagEdit';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getTagsList } from "@/utils/getTagsList";
import { addTag, addTagToCollection, removeTagFromCollection, moveTagOrder } from '../../store/slices/tagsSlice';
import { DndContext, useSensor, PointerSensor, MouseSensor } from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core';
import { DraggableDroppableTag } from '@/UI/DraggableDroppable';
import { Position } from '@/types/position';

type Props = {
    tags: TagInterface[] | null
    currentTagsCollectionId: number | null
    setTags: (tags: TagInterface[]) => void
}


const getTagById = (tags: TagInterface[], tagId: number) => {
    const tag = tags.filter(tag => tag.id === tagId)
    return tag[0]
}

export const TagsSettings = ({ tags, setTags, currentTagsCollectionId }: Props) => {
    const dispatch = useDispatch();
    const tagsList = useSelector((state: RootState) => state.tags.tags);
    const collections = useSelector((state: RootState) => state.tags.collections);
    const [position, setPosition] = useState<Position | null>(null);
    const [tagForEdit, setTagForEdit] = useState<TagInterface | null>(null)
    const [inputValue, setInputValue] = useState('')

    const ACTIVATION_CONSTRAINTS = {
        delay: 10,
        tolerance: 5
    }
    const sensors = [useSensor(PointerSensor, {
        activationConstraint: ACTIVATION_CONSTRAINTS,
    }), useSensor(MouseSensor, {
        activationConstraint: ACTIVATION_CONSTRAINTS,
    })];


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const activeId = active.id.toString()

        if (over && active.id !== over.id) {
            const newIndex = tagsList.findIndex(tag => tag.id.toString() === over.id);

            dispatch(moveTagOrder({ id: parseInt(activeId), newOrder: newIndex + 1 }));
        }

    }

    useEffect(() => {
        let collection = collections.filter(collection => collection.id === currentTagsCollectionId)[0]
        let newTags = getTagsList(tagsList, collection.tagIds)
        setTags(newTags)
    }, [collections])

    const onEditClickHandler = (event: React.MouseEvent) => {
        const hoveredElement = event.currentTarget as HTMLElement;
        setPosition({
            top: hoveredElement.getBoundingClientRect().bottom - 100,
            left: hoveredElement.getBoundingClientRect().left - 70,
        });
    };

    const onTagHover = (tagId: number) => {
        const searchedTag = getTagById(tagsList, tagId)
        setTagForEdit(searchedTag)
    }

    const deleteTagHandler = (tagIdToRemove: number) => {
        dispatch(removeTagFromCollection({ collectionId: currentTagsCollectionId, tagId: tagIdToRemove }))
    }

    const addTagHandler = (tagId: number) => {
        dispatch(addTagToCollection({ collectionId: currentTagsCollectionId, tagId: tagId }))
    }

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const createTagHandler = () => {
        if (!inputValue) {
            return
        }
        dispatch(addTag({ name: inputValue, color: '#F46262' }))
        setInputValue('')
    }

    return (
        <>
            <Modal
                onClose={() => setPosition(null)}
                position={position}
            >
                <TagEdit tag={tagForEdit} setPosition={setPosition} />
            </Modal>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <Paper className={styles.container} radius='medium'>
                    <div className={styles.top}>
                        {tags && tags.map(tag => (
                            <Tag size='small' text={tag.name} color={tag.color} isShort={true} id={tag.id}>
                                <Image
                                    priority
                                    src={CancelButton}
                                    alt='close'
                                    onClick={() => deleteTagHandler(tag.id)}
                                />
                            </Tag>
                        ))}
                        <input
                            type="text"
                            className={styles.invisibleInput}
                            value={inputValue}
                            onChange={(event) => inputChangeHandler(event)}
                        />
                    </div>
                    <div className={styles.bottom}>
                        <div
                            className={styles.createTag}
                            onClick={createTagHandler}
                        >
                            <Image
                                priority
                                src={Plus}
                                alt='plus'
                            />
                            Создать тэг
                        </div>
                        <div>
                            {tagsList.map(tag => (

                                <div
                                    className={classNames(
                                        styles.tagBlock,
                                        { [styles.hovered]: tag.id === tagForEdit?.id }
                                    )}
                                    onMouseEnter={() => onTagHover(tag.id)}
                                    onMouseLeave={() => setTagForEdit(null)}
                                    key={tag.id}
                                >
                                    <DraggableDroppableTag tag={tag} icon={<Image
                                        priority
                                        src={SixDots}
                                        alt='soxDots'
                                        className={styles.sixDots}
                                    />}>
                                        <div className={styles.tagNameBlock}>
                                            <Tag text={tag?.name} color={tag?.color} size='small' id={tag.id} onClick={() => addTagHandler(tag.id)} />
                                        </div>
                                    </DraggableDroppableTag>

                                    {tag.id === tagForEdit?.id && (
                                        <Image
                                            className={styles.threeDots}
                                            priority
                                            src={ThreeDots}
                                            alt='threeDots'
                                            onClick={onEditClickHandler}
                                        />)
                                    }
                                </div>

                            )
                            )}
                        </div>
                    </div>
                </Paper>
            </DndContext>
        </>
    )
}