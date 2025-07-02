import styles from './LeftSection.module.css';
import Select from '../Selects/Select/Select.tsx';
import Button from '../Buttons/button.tsx';
import EducationSection from '../sections/Education/EducationSection.tsx';
import SkillsSection from '../sections/Skills/SkillsSection.tsx';
import AboutSection from '../sections/About/AboutSection.tsx';
import CertificatesSection from '../sections/Certificates/CertificatesSection.tsx';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import Input from '../Input/Input.tsx';
import { IoDownloadOutline } from 'react-icons/io5';
import type { EducationCardData } from '../sections/Education/types.ts';
import type { Certificate } from '../sections/Certificates/types.ts';

interface LeftSectionProps {
  sections: string[];
  setSections: React.Dispatch<React.SetStateAction<string[]>>;
  name: string;
  setName: (data: string) => void;
  education: EducationCardData[];
  setEducation: (data: EducationCardData[]) => void;
  skills: string[];
  setSkills: (data: string[]) => void;
  certificates: Certificate[];
  setCertificates: (data: Certificate[]) => void;
  about: string;
  setAbout: (data: string) => void;
}

const sectionMap: Record<
  string,
  (onDelete: () => void, data: any, setData: (val: any) => void) => JSX.Element
> = {
  Education: (onDelete, data, setData) => (
    <EducationSection
      onDeleteSection={onDelete}
      data={data}
      setData={setData}
    />
  ),
  Skills: (onDelete, data, setData) => (
    <SkillsSection onDeleteSection={onDelete} data={data} setData={setData} />
  ),
  Sertificates: (onDelete, data, setData) => (
    <CertificatesSection
      onDeleteSection={onDelete}
      data={data}
      setData={setData}
    />
  ),
  About: (onDelete, data, setData) => (
    <AboutSection onDeleteSection={onDelete} data={data} setData={setData} />
  )
};

const LeftSection = ({
  sections,
  setSections,
  name,
  setName,
  education,
  setEducation,
  skills,
  setSkills,
  certificates,
  setCertificates,
  about,
  setAbout
}: LeftSectionProps) => {
  const [selected, setSelected] = useState('');

  const props = {
    Education: [education, setEducation],
    Skills: [skills, setSkills],
    Sertificates: [certificates, setCertificates],
    About: [about, setAbout]
  };

  type SectionKey = keyof typeof props;

  const handleAdd = () => {
    if (selected && !sections.includes(selected)) {
      setSections((prev) => [...prev, selected]);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = [...sections];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setSections(reordered);
  };

  return (
    <div className={styles.section}>
      <Input
        type='text'
        label='Имя'
        placeholder='Введите ваше имя'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='sectionsList'>
          {(provided) => (
            <div
              className={styles.sectionsList}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sections.map((key: SectionKey, index) => {
                return (
                  <Draggable key={key} draggableId={key} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {sectionMap[key](
                          () =>
                            setSections((prev) =>
                              prev.filter((item) => item !== key)
                            ),
                          props[key][0],
                          props[key][1]
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button type='primary' htmlType='button' className={styles.nextButton}>
        Скачать pdf
        <IoDownloadOutline className={styles.icon} />
      </Button>
    </div>
  );
};

export default LeftSection;
