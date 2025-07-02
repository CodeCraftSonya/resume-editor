import { useEffect, useRef, useState } from 'react';
import styles from './Education.module.css';
import Select from '../../Selects/Select/Select.tsx';
import Input from '../../Input/Input.tsx';
import Button from '../../Buttons/button.tsx';
import { educationOptions } from '../../../constants/educationOptions.ts';
import type { EducationFormProps } from './types.ts';
import Modal from '../../modal/Modal.tsx';

const EducationForm = ({
  onClose,
  onSave,
  initialData
}: EducationFormProps) => {
  const [level, setLevel] = useState(initialData?.level || '');
  const [faculty, setFaculty] = useState(initialData?.faculty || '');
  const [institution, setInstitution] = useState(
    initialData?.institution || ''
  );
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ level, faculty, institution });
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          id='levelSelect'
          label='Уровень образования'
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          options={educationOptions}
          rightIcon={
            <img
              src='/icons/chevron-down.svg'
              alt='Стрелка вниз'
              // className={styles.arrow}
            />
          }
        />
        <Input
          id='facultyInput'
          type='text'
          label='Факультет'
          placeholder='Введите факультет'
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required
        />
        <Input
          id='institutionInput'
          type='text'
          label='Институт'
          placeholder='Введите институт'
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />
        <Button type='primary' htmlType='submit' className={styles.nextButton}>
          Сохранить
        </Button>
      </form>
    </Modal>
  );
};

export default EducationForm;
