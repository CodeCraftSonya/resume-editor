import { useRef, useState } from 'react';
import styles from './Education.module.css';
import EducationCard from './EducationCard';
import EducationForm from './EducationForm';
import Button from '../../Buttons/button.tsx';
import { FaPlus } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import type { EducationCardData, EducationProps } from './types';

const MAX_CARDS = 3;

const EducationSection = ({ onDeleteSection }: EducationProps) => {
  const [cards, setCards] = useState<EducationCardData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleAdd = () => {
    if (cards.length < MAX_CARDS) {
      setEditingIndex(null);
      setFormVisible(true);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (data: any) => {
    if (editingIndex === null) {
      setCards((prev) => [...prev, data]);
    } else {
      setCards((prev) =>
        prev.map((item, i) => (i === editingIndex ? data : item))
      );
    }
    setFormVisible(false);
  };

  return (
    <div className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <h2>Образование</h2>
        <div className={styles.sectionButtons}>
          {cards.length < MAX_CARDS && (
            <Button
              type='primary'
              htmlType='button'
              className={styles.sectionButton}
              onClick={handleAdd}
            >
              <FaPlus className={styles.icon} />
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

      <div className={styles.cards}>
        {cards.map((card, index) => (
          <EducationCard
            key={index}
            data={card}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>

      {formVisible && (
        <EducationForm
          onClose={() => setFormVisible(false)}
          onSave={handleSave}
          initialData={editingIndex !== null ? cards[editingIndex] : undefined}
        />
      )}
    </div>
  );
};

export default EducationSection;
