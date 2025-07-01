import { useEffect, useRef, useState } from 'react';
import styles from './SkillsSection.module.css';

const SkillsSection = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleDeleteSection = () => {
    setIsSectionVisible(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
      setNewSkill('');
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  if (!isSectionVisible) return null;

  return (
    <div className={styles.skillsSection}>
      <div className={styles.skillsHeader}>
        <h2>Навыки</h2>
        <div className={styles.skillsActions}>
          <button className={styles.iconButton} onClick={handleDeleteSection}>
            🗑
          </button>
          {skills.length > 0 && (
            <button
              className={styles.iconButton}
              onClick={() => setIsModalOpen(true)}
            >
              ✏️
            </button>
          )}
        </div>
      </div>

      <div className={styles.skillsList}>
        {skills.map((skill) => (
          <div className={styles.skillPill} key={skill}>
            {skill}
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <button
          className={styles.addSkillButton}
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      )}

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal} ref={modalRef}>
            <div className={styles.modalHeader}>
              <h3>Редактировать навыки</h3>
              <button onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <input
              type='text'
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder='Введите навык'
              maxLength={20}
            />
            <button onClick={handleAddSkill}>Добавить навык</button>
            <div className={styles.skillsEditList}>
              {skills.map((skill) => (
                <div className={styles.skillPill} key={skill}>
                  {skill}
                  <button
                    className={styles.removePill}
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
