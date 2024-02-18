import { Paper } from "../../UI/Paper/index";
import Tag from "../../components/Tag/index";
import styles from './TagsList.module.css';
import classNames from "classnames";

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
        name: 'Тэг 3',
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

const ITEMS = [
    {
        id: 123450,
        tagIds: [1, 2, 3, 4, 5]
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
        tagIds: [1, 2, 3, 4, 5]
    },
    {
        id: 123454,
        tagIds: [1, 2, 3, 4, 5]
    },
]

const findTag = (tags, collectionItem) => {
    return tags.filter(tag => tag.id === collectionItem.tagIds[collectionItem.tagIds.length - 1])[0]
}

const TagCollectionRender = ({ collectionItem }) => {
    return (
        <tr key={collectionItem.id} className={styles.row}>
            <td>{collectionItem.id}</td>
            <td className={styles.tagContainer}>
                <Tag text={findTag(TAGS, collectionItem).name} color="blue" />
            </td>
            <td></td>
        </tr>
    )

}

export default function TagsList() {
    return (
        <div>
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
                            <TagCollectionRender key={item.id} collectionItem={item} />
                        ))}
                    </tbody>
                </table>
            </Paper>
        </div>
    )
}