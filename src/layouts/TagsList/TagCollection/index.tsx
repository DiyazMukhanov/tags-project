import { Tooltip } from "@/UI/Tooltip";
import Tag from "@/components/Tag";
import { TagInfo } from "@/components/TagInfo";
import styles from './TagCollection.module.css';
import { Counter } from "@/components/Counter";
import { getTagsList } from "@/utils/getTagsList";
import { useSelector } from 'react-redux';
import { CollectionInterface, RootState, TagInterface } from "@/store/slices/sliceTypes";
import { forwardRef, useEffect, useRef, useState } from "react";

type Props = {
    collectionItem: CollectionInterface
    onClick: (event: React.MouseEvent) => void
}

const findTag = (tags: TagInterface[], collectionItem: CollectionInterface) => {
    return tags.filter(tag => tag.id === collectionItem.tagIds[collectionItem.tagIds.length - 1])[0]
}

export const TagCollection = forwardRef<HTMLDivElement, Props>(({ collectionItem, onClick }, ref) => {
    const [addIsHovered, setAddIsHovered] = useState(false)
    const tagsList = useSelector((state: RootState) => state.tags.tags);
    const [counterTooltipOptions, setCounterTooltipOptions] = useState({})
    const counterRef = useRef<HTMLDivElement>(null)

    const updateCounterTooltipOptions = () => {
        if (counterRef.current) {
            const { left } = counterRef.current.getBoundingClientRect()
            const baseLeft = -170
            const leftDifference = left + baseLeft
            const xOffset = -leftDifference;
            const yOffset = 15;

            setCounterTooltipOptions({
                xOffset,
                yOffset
            })
        }
    };

    useEffect(() => {
        updateCounterTooltipOptions()
        window.addEventListener("resize", updateCounterTooltipOptions)

        return () => {
            window.removeEventListener("resize", updateCounterTooltipOptions);
        }
    }, [])

    return (
        <tr key={collectionItem.id} className={styles.row}>
            <td className={styles.itemId}>{collectionItem.id}</td>
            <td className={styles.tagContainer}>
                <div className={styles.container} ref={ref} key={collectionItem.id}>
                    <Tooltip
                        content={<TagInfo tags={getTagsList(tagsList, collectionItem.tagIds)} />}
                    >
                        {(onMouseEnter, onMouseLeave) => {
                            return (
                                <>
                                    {collectionItem.tagIds.length > 0 ? <Tag
                                        size="large"
                                        id={collectionItem.id}
                                        text={findTag(tagsList, collectionItem)?.name}
                                        color={findTag(tagsList, collectionItem)?.color}
                                        onMouseEnter={onMouseEnter}
                                        onMouseLeave={onMouseLeave}
                                        onClick={onClick}
                                        isShort={true}
                                    /> :
                                        <div
                                            onMouseEnter={() => setAddIsHovered(true)}
                                            onMouseLeave={() => setAddIsHovered(false)}
                                            className={styles.empty}
                                        >
                                            {addIsHovered ?
                                                <div
                                                    className={styles.addTag}
                                                    onClick={onClick}
                                                    key={collectionItem.id}
                                                >
                                                    <span>
                                                        +
                                                    </span> <span>Добавить тег</span>
                                                </div> : <span>-</span>
                                            }
                                        </div>}
                                </>
                            )
                        }}
                    </Tooltip>
                    {collectionItem.tagIds.length > 1 &&
                        <Tooltip
                            content={<TagInfo tags={getTagsList(tagsList, collectionItem.tagIds)} />}
                            options={counterTooltipOptions}

                        >
                            {
                                (onMouseEnter, onMouseLeave) => {
                                    return (
                                        <Counter
                                            ref={counterRef}
                                            count={collectionItem.tagIds.length - 1}
                                            onMouseEnter={onMouseEnter}
                                            onMouseLeave={onMouseLeave}
                                            onClick={onClick}
                                        />
                                    )
                                }
                            }
                        </Tooltip>

                    }


                </div>
            </td>
            <td></td>
        </tr>
    )
})