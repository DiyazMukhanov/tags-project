import { Paper } from "@/UI/Paper";
import styles from './TagEdit.module.css';
import { ColorCircle } from "../ColorCircle";
import { useEffect, useState } from "react";
import Garbage from './../../../public/icons/garbage.svg';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTag, updateTag } from '../../store/slices/tagsSlice';

const colors = [
    {
        id: 1,
        color: '#F46262'
    },
    {
        id: 2,
        color: '#FC944A'
    },
    {
        id: 3,
        color: '#FAD038'
    },
    {
        id: 4,
        color: '#47D17C'
    },
    {
        id: 5,
        color: '#4CB2E5'
    },
    {
        id: 6,
        color: '#6E85F7'
    },
    {
        id: 7,
        color: '#C47DE8'
    },
    {
        id: 8,
        color: '#999999'
    },
]

export const TagEdit = ({ tag }) => {
    const dispatch = useDispatch();
    const [chosenId, setChosenId] = useState<number | null>(null)
    const [etitableTag, setEditableTag] = useState(tag)
    const [currentColor, setCurrentColor] = useState(etitableTag?.color)
    const [name, setName] = useState(etitableTag?.name)

    useEffect(() => {
        updateTaghandler(name)
    }, [name, currentColor])

    const circleClickHandler = (id: number) => {
        setChosenId(id)
        const color = colors.find(color => color.id === id)
        setCurrentColor(color.color)
    }

    const deleteTagHandler = (tagId) => {
        dispatch(deleteTag(tagId))
    }

    const onNameInputChangeHandler = (event) => {
        setName(event.target.value)
        updateTaghandler()
    }

    const updateTaghandler = (name) => {
        dispatch(updateTag({ id: etitableTag.id, name: name, color: currentColor }))
    }

    return (
        <Paper radius="medium" className={styles.container}>
            <div className={styles.nameBlock}>
                <label>Имя</label>
                <input
                    defaultValue={etitableTag?.name}
                    className={styles.input}
                    onChange={(event) => onNameInputChangeHandler(event)}
                >

                </input>
            </div>
            <div className={styles.colorsBlock}>
                <label>Цвета</label>
                <div className={styles.colorsContainer}>
                    {colors.map(color =>
                        <ColorCircle
                            chosen={chosenId === color.id && true}
                            color={color.color}
                            id={color.id}
                            onClick={() => circleClickHandler(color.id)}
                            key={color.id}
                        />
                    )}

                </div>
            </div>
            <div className={styles.deleteBlock}>
                <Image
                    priority
                    src={Garbage}
                    alt='garbage'
                />
                <div onClick={() => deleteTagHandler(etitableTag?.id)}>Удалить тэг</div>
            </div>
        </Paper>
    )
}