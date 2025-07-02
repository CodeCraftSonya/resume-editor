export type CerProps = {
  onDeleteSection: () => void;
};

export interface Certificate {
  id: number;
  course: string;
  organization: string;
  period: string;
}
