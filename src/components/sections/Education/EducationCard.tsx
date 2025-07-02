import styles from './Education.module.css';
import { educationOptions } from '../../../constants/educationOptions';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import type { EducationCardProps } from './types';

const EducationCard = ({ data, onEdit, onDelete }: EducationCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div>
          <strong>
            {educationOptions.find((option) => option.value === data.level)
              ?.label || data.level}
          </strong>
        </div>
        <div>{data.institution}</div>
      </div>
      <div className={styles.cardActions}>
        <button onClick={onEdit}>
          <FaRegEdit className={styles.icon} />
        </button>
        <button onClick={onDelete}>
          <MdDeleteOutline className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default EducationCard;
