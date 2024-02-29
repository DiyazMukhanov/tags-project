import { ReactNode } from 'react';
import styles from './Modal.module.css';

type Props = {
    isOpened: boolean
    setIsOpened: (status: boolean) => void
    children: ReactNode
    className?: string
    backDropClassName?: string

}

export const Modal = ({ isOpened, setIsOpened, children, backDropClassName }: Props) => {
    if (isOpened) {
        return (
            <>
                <div
                    className={backDropClassName}
                    onClick={() => setIsOpened(false)}
                >
                </div>
                <div>
                    {children}
                </div>
            </>
        )
    }
}