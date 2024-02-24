import classNames from 'classnames';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

type Position = {
    top: number
    left: number
}

type Props = {
    children: React.ReactNode;
    className?: string;
    onClose: () => void;
    position?: Position | null
}

export const Modal = ({
    children,
    className,
    onClose,
    position
}: Props) => {
    if (position) {
        return (
            <>
                {createPortal(<>
                    <div
                        className={styles.backDrop}
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

            </>
        )
    }
}