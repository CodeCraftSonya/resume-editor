import { useState } from 'react';
import styles from './SkillsSection.module.css';
import Button from '../../Buttons/button.tsx';
import { FaPlus } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import type { SkillsProps } from './types';
import Input from '../../Input/Input.tsx';
import Modal from '../../modal/Modal.tsx';

const SkillsSection = ({ onDeleteSection, data, setData }: SkillsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill)) {
      setData([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setData(data.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Навыки</h2>
        <div className={styles.sectionButtons}>
          {data.length === 0 && (
            <Button
              type='primary'
              htmlType='button'
              className={styles.sectionButton}
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className={styles.icon} />
            </Button>
          )}
          {data.length > 0 && (
            <Button
              type='primary'
              htmlType='button'
              className={styles.sectionButton}
              onClick={() => setIsModalOpen(true)}
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

      <div className={styles.skillsList}>
        {data.map((skill) => (
          <div className={styles.skillPill} key={skill}>
            {skill}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalHeader}>
            <h3>Редактировать навыки</h3>
          </div>
          <Input
            type='text'
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder='Введите навык'
            maxLength={20}
          />
          <Button type='primary' htmlType='submit' onClick={handleAddSkill}>
            Добавить навык
          </Button>
          <div className={styles.skillsEditList}>
            {data.map((skill) => (
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
        </Modal>
      )}
    </div>
  );
};

export default SkillsSection;
