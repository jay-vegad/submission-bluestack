export interface FaqNoteItem {
  id: string;
  answerId: string;
  question: string;
  answer: string;
  pinColor: string;
  tilt: string;
  index: number;
  keywords?: string[];
}
