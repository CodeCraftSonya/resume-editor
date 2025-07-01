import { useRef, useState } from 'react';
import styles from './Education.module.css';
import EducationCard from './EducationCard';
import EducationForm from './EducationForm';

const MAX_CARDS = 3;

const EducationSection = () => {
  const [cards, setCards] = useState([]);
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
        {cards.length < MAX_CARDS && (
          <button className={styles.addButton} onClick={handleAdd}>
            +
          </button>
        )}
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
          initialData={editingIndex !== null ? cards[editingIndex] : null}
        />
      )}
    </div>
  );
};

export default EducationSection;
