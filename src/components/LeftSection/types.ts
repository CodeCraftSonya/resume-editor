import type { EducationCardData } from '../sections/Education/types.ts';
import type { Certificate } from '../sections/Certificates/types.ts';

export interface LeftSectionProps {
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
