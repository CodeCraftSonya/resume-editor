import { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  const [aboutText, setAboutText] = useState('');
  const [tempText, setTempText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    setAboutText(tempText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setAboutText('');
    setTempText('');
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
        <div className={styles.actions}>
          {!aboutText && <button onClick={handleOpen}>➕</button>}
          <button onClick={handleOpen}>✏️</button>
          <button onClick={handleDelete}>🗑️</button>
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
              ✖️
            </button>
            <textarea
              placeholder='Напишите что-нибудь о себе...'
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
            />
            <button className={styles.saveBtn} onClick={handleSave}>
              Сохранить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
