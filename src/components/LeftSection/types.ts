import type { EducationCardData } from '../sections/Education/types.ts';
import type { Certificate } from '../sections/Certificates/types.ts';

export type Section = 'Education' | 'Skills' | 'Certificates' | 'About';

export interface LeftSectionProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
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

export type SectionPropsMap = {
  Education: [EducationCardData[], (data: EducationCardData[]) => void];
  Skills: [string[], (data: string[]) => void];
  Certificates: [Certificate[], (data: Certificate[]) => void];
  About: [string, (data: string) => void];
};
