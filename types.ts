export type LayoutType = string;
export type Language = 'en' | 'zh';

export interface PosterConfig {
  productDescription: string;
  referenceImage: string | null; // Base64 data URL
  style: string;
  layout: LayoutType;
  environment: string;
  textOverlay: string;
}

export interface GeneratedResult {
  refinedPrompt: string;
  imageUrl?: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  GENERATING_PROMPT = 'GENERATING_PROMPT',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}