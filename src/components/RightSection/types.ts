import type { EducationCardData } from '../sections/Education/types.ts';
import type { Certificate } from '../sections/Certificates/types.ts';

export interface RightSectionProps {
  education: EducationCardData[];
  skills: string[];
  certificates: Certificate[];
  about: string;
  name: string;
  activeSections: string[];
}
