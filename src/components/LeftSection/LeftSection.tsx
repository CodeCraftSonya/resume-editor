import styles from './LeftSection.module.css';
import Select from '../Selects/Select/Select.tsx';
import Button from '../Buttons/button.tsx';
import Education from '../sections/Education/Education.tsx';
import Skills from '../sections/Skills/Skills.tsx';
import Sertificates from '../sections/Sertificates/Sertificates.tsx';
import About from '../sections/About/About.tsx';
import type { JSX } from 'react';
import { useState } from 'react';

const sectionMap: Record<string, JSX.Element> = {
  Education: <Education />,
  Skills: <Skills />,
  Sertificates: <Sertificates />,
  About: <About />
};

const LeftSection = () => {
  const [selected, setSelected] = useState('');
  const [sections, setSections] = useState<string[]>([]);

  const handleAdd = () => {
    if (selected && !sections.includes(selected)) {
      setSections((prev) => [...prev, selected]);
    }
  };

  console.log(sections);
  console.log(sectionMap);
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
          { label: 'О себе', value: 'About' }
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

      <div>
        {sections.map((key) => (
          <div key={key} style={{ marginBottom: '12px' }}>
            {sectionMap[key]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSection;
