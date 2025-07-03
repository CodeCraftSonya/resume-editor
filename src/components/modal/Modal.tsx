import styles from './Modal.module.css';
import { IoMdClose } from 'react-icons/io';
import type { ModalProps } from './types';

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
