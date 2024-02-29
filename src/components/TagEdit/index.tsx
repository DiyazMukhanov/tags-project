import { Paper } from "@/UI/Paper";
import styles from './TagEdit.module.css';
import { ColorCircle } from "../ColorCircle";
import { useEffect, useState } from "react";
import Garbage from './../../../public/icons/garbage.svg';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { deleteTag, updateTag, clearFilteredTags } from '../../store/slices/tagsSlice';
import { TagInterface } from "@/store/slices/sliceTypes";
import { Position } from "@/types/position";
import { Modal } from "@/UI/Modal";
import classNames from "classnames";

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

type Props = {
    tag: TagInterface | null
    setPosition: (position: Position | null) => void
    setInputValue?: (value: string) => void
}

export const TagEdit = ({ tag, setPosition, setInputValue }: Props) => {
    const dispatch = useDispatch();
    const [etitableTag, setEditableTag] = useState<TagInterface | null>(tag)
    const [currentColor, setCurrentColor] = useState(etitableTag?.color)
    const [name, setName] = useState<string | undefined>(etitableTag?.name)
    const [modalIsShowing, setModalIsShowing] = useState(false)

    useEffect(() => {
        if (name) {
            updateTaghandler(name)
        }
    }, [name, currentColor])

    const deleteTagHandler = (tagId: number | undefined) => {
        dispatch(deleteTag(tagId))
        dispatch(clearFilteredTags())
        if (setInputValue) {
            setInputValue('')
        }
        setPosition(null)
    }

    const onNameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        if (name) {
            updateTaghandler(name)
        }

    }

    const updateTaghandler = (name: string) => {
        if (currentColor) {
            dispatch(updateTag({ id: etitableTag?.id, name: name, color: currentColor }))
        }

    }

    const onCircleClickHandler = (event: React.MouseEvent, color: string) => {
        setCurrentColor(color)
    };

    return (
        <>
            {<Modal
                className={styles.modal}
                backDropClassName={styles.backDrop}
                isOpened={modalIsShowing}
                setIsOpened={setModalIsShowing}
            >
                <div className={styles.deleteModal} key={tag?.id}>
                    <p>Удалить тег?</p>
                    <div className={styles.buttons}>
                        <button
                            className={classNames(styles.button, styles.deleteButton)}
                            onClick={() => deleteTagHandler(etitableTag?.id)}
                        >
                            Удалить
                        </button>
                        <button
                            className={classNames(styles.button, styles.cancelDeleteButton)}
                            onClick={() => setModalIsShowing(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </Modal>}
            <Paper radius="medium" className={styles.container} key={tag?.id}>
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
                                color={color.color}
                                onClick={(e) => onCircleClickHandler(e, color.color)}
                                key={color.id}
                                isChosen={currentColor === color.color ? true : false}
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
                    <div onClick={() => setModalIsShowing(true)}>Удалить тег</div>
                </div>
            </Paper>
        </>
    )
}