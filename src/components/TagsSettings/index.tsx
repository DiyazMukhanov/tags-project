import { Paper } from '@/UI/Paper';
import styles from './TagsSettings.module.css';
import Tag from '../Tag';
import { TagType } from '@/types/TagType';
import { TagsListItem } from '@/types/TagsListItemType';
import Image from 'next/image';
import CancelButton from '../../../public/icons/closeTag.svg';
import SixDots from './../../../public/icons/sixDots.svg';
import Plus from './../../../public/icons/plus.svg';
import ThreeDots from './../../../public/icons/threeDots.svg';
import { use, useEffect, useState } from 'react';
import { Modal } from '@/UI/Modal';
import { TagEdit } from '../TagEdit';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getTagsList } from "@/utils/getTagsList";
import { addTag, deleteTag, updateTag, addTagToCollection, removeTagFromCollection } from '../../store/slices/tagsSlice';

type Props = {
    tags: TagType[]
    tagsList: TagsListItem[]
    currentTagsCollectionId: number
    setTags: (tags) => void
    setTagsList: (tags) => void
}

type Position = {
    top: number
    left: number
}

const getTagById = (tags, tagId) => {
    const tag = tags.filter(tag => tag.id === tagId)
    return tag[0]
}

export const TagsSettings = ({ tags, setTags, setTagsList, currentTagsCollectionId, tagItems, setTagItems }: Props) => {
    const dispatch = useDispatch();
    const tagsList = useSelector(state => state.tags.tags);
    const collections = useSelector(state => state.tags.collections);
    const [position, setPosition] = useState<Position | null>(null);
    const [tagForEdit, setTagForEdit] = useState(null)
    const [inputValue, setInputValue] = useState('')

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

    const onTagHover = (tagId) => {
        const searchedTag = getTagById(tagsList, tagId)
        setTagForEdit(searchedTag)
    }

    const deleteTagHandler = (tagIdToRemove: number) => {
        dispatch(removeTagFromCollection({ collectionId: currentTagsCollectionId, tagId: tagIdToRemove }))
    }

    const addTagHandler = (tagId: number) => {
        dispatch(addTagToCollection({ collectionId: currentTagsCollectionId, tagId: tagId }))
    }

    const inputChangeHandler = (event) => {
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
                <TagEdit tag={tagForEdit} />
            </Modal>

            <Paper className={styles.container} radius='medium'>
                <div className={styles.top}>
                    {tags.map(tag => (
                        <Tag size='small' text={tag.name} color={tag.color} isShort={true} key={tag.id}>
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
                                <div className={styles.tagNameBlock}>
                                    <Image
                                        priority
                                        src={SixDots}
                                        alt='soxDots'
                                    />
                                    <Tag text={tag?.name} color={tag?.color} onClick={() => addTagHandler(tag.id)} />
                                </div>
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
                        ))}
                    </div>
                </div>
            </Paper>
        </>
    )
}