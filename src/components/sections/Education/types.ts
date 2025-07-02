export interface EducationCardData {
  level: string;
  institution: string;
  faculty: string;
}

export interface EducationFormProps {
  onClose: () => void;
  onSave: (data: EducationCardData) => void;
  initialData?: EducationCardData;
}

export interface EducationCardProps {
  data: any;
  onEdit: () => void;
  onDelete: () => void;
}

export interface EducationProps {
  onDeleteSection: () => void;
  data: EducationCardData[];
  setData: (data: EducationCardData[]) => void;
}
