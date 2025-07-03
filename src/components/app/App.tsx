import LeftSection from '../LeftSection/LeftSection.tsx';
import styles from './App.module.css';
import { useState } from 'react';
import RightSection from '../RightSection/RightSection.tsx';
import type { Certificate } from '../sections/Certificates/types.ts';
import type { EducationCardData } from '../sections/Education/types.ts';
import type { Section } from '../LeftSection/types.ts';

const App = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [name, setName] = useState('');
  const [education, setEducation] = useState<EducationCardData[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [about, setAbout] = useState('');

  return (
    <div className={styles.appСontainer}>
      <LeftSection
        sections={sections}
        setSections={setSections}
        name={name}
        setName={setName}
        education={education}
        setEducation={setEducation}
        skills={skills}
        setSkills={setSkills}
        certificates={certificates}
        setCertificates={setCertificates}
        about={about}
        setAbout={setAbout}
      />
      <RightSection
        education={education}
        skills={skills}
        certificates={certificates}
        about={about}
        name={name}
        activeSections={sections}
      />
    </div>
  );
};

export default App;
