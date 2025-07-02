import { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';
import Button from '../../Buttons/button.tsx';
import { FaPlus } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import type { AboutProps } from './types';
import Modal from '../../modal/Modal.tsx';

const AboutSection = ({ onDeleteSection, data, setData }: AboutProps) => {
  const [tempText, setTempText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    setData(tempText);
    setIsEditing(false);
  };

  const handleOpen = () => {
    setTempText(data);
    setIsEditing(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Обо мне</h2>
        <div className={styles.sectionButtons}>
          {!data && (
            <Button
              type='primary'
              htmlType='button'
              className={styles.sectionButton}
              onClick={handleOpen}
            >
              <FaPlus className={styles.icon} />
            </Button>
          )}
          {data && (
            <Button
              type='primary'
              htmlType='button'
              className={styles.sectionButton}
              onClick={handleOpen}
            >
              <FaRegEdit className={styles.icon} />
            </Button>
          )}
          <Button
            type='primary'
            htmlType='button'
            className={styles.sectionButton}
            onClick={onDeleteSection}
          >
            <MdDeleteOutline className={styles.icon} />
          </Button>
        </div>
      </div>

      {!isEditing && data && (
        <div className={styles.text} title={data}>
          {data}
        </div>
      )}

      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <textarea
            placeholder='Напишите что-нибудь о себе...'
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            className={styles.textarea}
          />
          <Button
            type='primary'
            htmlType='submit'
            className={styles.nextButton}
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default AboutSection;
