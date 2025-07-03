import EducationSection from '../components/sections/Education/EducationSection.tsx';
import SkillsSection from '../components/sections/Skills/SkillsSection.tsx';
import CertificatesSection from '../components/sections/Certificates/CertificatesSection.tsx';
import AboutSection from '../components/sections/About/AboutSection.tsx';

export const sectionMap: Record<
  string,
  (
    onDelete: () => void,
    data: any,
    setData: (val: any) => void
  ) => React.JSX.Element
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
