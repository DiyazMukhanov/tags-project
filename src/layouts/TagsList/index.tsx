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

const tableHeaders = [
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

const ITEMS = [
    {
        id: 123450,
        tagIds: [1, 2, 3]
    },
    {
        id: 123451,
        tagIds: [1, 2, 3, 4, 5]
    },
    {
        id: 123452,
        tagIds: [1, 2, 3, 4, 5]
    },
    {
        id: 123453,
        tagIds: [1, 2, 3, 4,]
    },
    {
        id: 123454,
        tagIds: [1, 2]
    },
]

export default function TagsList() {
    const { position, setPosition, onMouseEventHandler } = usePosition()

    const onTagClickHandler = (event: React.MouseEvent) => {
        onMouseEventHandler(event)
    }

    return (
        <div>
            <Modal
                className='modalContent'
                onClose={() => setPosition(null)}
                position={position}
            >
                Some modal text
            </Modal>
            <Paper radius="large" className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.row}>
                            {tableHeaders.map(header => (
                                <th className={classNames(
                                    styles.tableHeader,
                                    styles[header.width]
                                )} key={header.id}>{header.title}</th>
                            )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {ITEMS.map(item => (
                            <TagCollection key={item.id} collectionItem={item} onClick={onTagClickHandler} />
                        ))}
                    </tbody>
                </table>
            </Paper>
        </div>
    )
}