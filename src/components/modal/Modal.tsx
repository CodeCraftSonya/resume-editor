import styles from './Modal.module.css';
import { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import type { ModalProps } from './types';

const Modal = ({ onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
