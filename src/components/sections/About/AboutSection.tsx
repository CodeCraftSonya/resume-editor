import { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';
import Button from '../../Buttons/button.tsx';
import { FaPlus } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import type { AboutProps } from './types';

const AboutSection = ({ onDeleteSection }: AboutProps) => {
  const [aboutText, setAboutText] = useState('');
  const [tempText, setTempText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    setAboutText(tempText);
    setIsEditing(false);
  };

  const handleOpen = () => {
    setTempText(aboutText);
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
          {!aboutText && (
            <Button
              type='primary'
              htmlType='button'
              className={styles.sectionButton}
              onClick={handleOpen}
            >
              <FaPlus className={styles.icon} />
            </Button>
          )}
          {aboutText && (
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

      {!isEditing && aboutText && (
        <div className={styles.text} title={aboutText}>
          {aboutText}
        </div>
      )}

      {isEditing && (
        <div className={styles.formOverlay}>
          <div className={styles.form} ref={formRef}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsEditing(false)}
            >
              ×
            </button>
            <textarea
              placeholder='Напишите что-нибудь о себе...'
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
            />
            <Button
              type='primary'
              htmlType='submit'
              className={styles.nextButton}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
