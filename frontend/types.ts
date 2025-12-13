export interface Experiment {
  id: string;
  title: string;
  shortDescription: string;
  fullContent: string;
  imageUrl: string;
  videoUrl: string; 
  category: string;
  date: string;
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
  GHOST = 'ghost'
}