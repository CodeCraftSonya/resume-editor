import styles from './LeftSection.module.css';
import Select from '../Selects/Select/Select.tsx';
import Button from '../Buttons/button.tsx';
import EducationSection from '../sections/Education/EducationSection.tsx';
import SkillsSection from '../sections/Skills/SkillsSection.tsx';
import AboutSection from '../sections/About/AboutSection.tsx';
import CertificatesSection from '../sections/Certificates/CertificatesSection.tsx';
import { useState } from 'react';

const sectionMap: Record<string, (onDelete: () => void) => JSX.Element> = {
  Education: (onDelete: () => void) => (
    <EducationSection onDeleteSection={onDelete} />
  ),
  Skills: (onDelete: () => void) => (
    <SkillsSection onDeleteSection={onDelete} />
  ),
  Sertificates: (onDelete: () => void) => (
    <CertificatesSection onDeleteSection={onDelete} />
  ),
  About: (onDelete: () => void) => <AboutSection onDeleteSection={onDelete} />
};

const LeftSection = () => {
  const [selected, setSelected] = useState('');
  const [sections, setSections] = useState<string[]>([]);

  const handleAdd = () => {
    if (selected && !sections.includes(selected)) {
      setSections((prev) => [...prev, selected]);
    }
  };
  return (
    <div className={styles.section}>
      <Select
        id='sectionSelect'
        label='Добавить секцию'
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        options={[
          { label: 'Не выбрано', value: '' },
          { label: 'Образование', value: 'Education' },
          { label: 'Навыки', value: 'Skills' },
          { label: 'Сертификаты', value: 'Sertificates' },
          { label: 'Обо мне', value: 'About' }
        ]}
        rightIcon={
          <img
            src='/icons/chevron-down.svg'
            alt='Стрелка вниз'
            // className={styles.arrow}
          />
        }
      />
      <Button
        onClick={handleAdd}
        type='primary'
        htmlType='button'
        className={styles.nextButton}
      >
        Добавить
      </Button>

      <div className={styles.sectionsList}>
        {sections.map((key) => (
          <div key={key}>
            {sectionMap[key](() => {
              setSections((prev) => prev.filter((item) => item !== key));
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSection;
