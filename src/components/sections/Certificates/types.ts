export interface Certificate {
  id: number;
  course: string;
  organization: string;
  date?: Date | null;
}

export interface CerProps {
  onDeleteSection: () => void;
  data: Certificate[];
  setData: (data: Certificate[]) => void;
}
