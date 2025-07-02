import { useRef, useState } from 'react';
import styles from './Education.module.css';
import EducationCard from './EducationCard';
import EducationForm from './EducationForm';
import Button from '../../Buttons/button.tsx';
import { FaPlus } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import type { EducationProps } from './types';

const MAX_CARDS = 3;

const EducationSection = ({
  onDeleteSection,
  data,
  setData
}: EducationProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleAdd = () => {
    if (data.length < MAX_CARDS) {
      setEditingIndex(null);
      setFormVisible(true);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index: number) => {
    const filtered = data.filter((_, i) => i !== index);
    setData(filtered);
  };

  const handleSave = (data: any) => {
    if (editingIndex === null) {
      setData((prev) => [...prev, data]);
    } else {
      setData((prev) =>
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
          {data.length < MAX_CARDS && (
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
        {data.map((card, index) => (
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
          initialData={editingIndex !== null ? data[editingIndex] : undefined}
        />
      )}
    </div>
  );
};

export default EducationSection;
