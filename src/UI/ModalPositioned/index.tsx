import classNames from 'classnames';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

type Position = {
    top: number
    left: number
}

type Props = {
    children: React.ReactNode;
    backDropClassName?: string,
    className?: string;
    onClose?: () => void;
    position?: Position | null
}

export const ModalPositioned = ({
    children,
    className,
    backDropClassName,
    onClose,
    position,
}: Props) => {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true);
    }, [])


    if (isBrowser && position) {
        return (
            <div>
                {createPortal(<>
                    <div
                        className={classNames(styles.backDrop, backDropClassName)}
                        onClick={onClose}
                    >
                    </div>
                    <div
                        className={classNames('modal', className)}
                        style={{
                            position: 'absolute',
                            top: position?.top,
                            left: position?.left,
                            zIndex: '1',
                        }}>
                        {children}
                    </div>
                </>, document.body)}

            </div>
        )
    }
}