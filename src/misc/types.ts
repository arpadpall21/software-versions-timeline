import { Software } from '../../config/supportedSoftwares';

interface SupportedSoftware {
  displayName: string;
  logoPath: string;
  dataPath: string;
  source?: string;
}

export interface PopUpBoxDialog {
  handleYesButtonClick: (e: React.MouseEvent) => void;
  handleNoButtonClick: (e: React.MouseEvent) => void;
}

export type SupportedSoftwares = { [software in Software]: SupportedSoftware };

export interface Lang {
  langCode: string;
  lang: string;
}

export type Months = { date: Date; yearMonth: string; monthName: string }[];

export interface DisplayableDateLimit {
  oldestDate: Date;
  newestDate: Date;
}

export interface RawHistoryData {
  [yearMonth: string]: {
    versions: { day: number; version: string }[];
  };
}

export interface ParsedHistoryData {
  [yearMonth: string]: {
    versions?: { day: number; version: string }[];
    timeline: { from: 'left' | 'right'; percent: number };
  };
}

export interface ParsedVersionHistoryData {
  data: ParsedHistoryData;
  oldestDate: Date;
  newestDate: Date;
}

export type GetVersionHistoryActionResponse = { [key: string]: ParsedVersionHistoryData | null };
export type FeCache = GetVersionHistoryActionResponse;

export type AppTheme = 'auto' | 'light' | 'dark';

export type DisplayedSoftwares = Software[];
