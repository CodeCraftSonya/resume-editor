import styles from './Education.module.css';

const EducationCard = ({ data, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div>
          <strong>Уровень:</strong> {data.level}
        </div>
        <div>
          <strong>Институт:</strong> {data.institution}
        </div>
      </div>
      <div className={styles.cardActions}>
        <button onClick={onEdit}>✏️</button>
        <button onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default EducationCard;
