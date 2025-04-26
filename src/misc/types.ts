export enum Software {
  CHROME = 'CHROME',
  FIREFOX = 'FIREFOX',
  OPERA = 'OPERA',
  EDGE = 'EDGE',
}

export interface Lang {
  langCode: string;
  lang: string;
}

export interface VersionHistoryData {
  [yearMonth: string]: { day: number; version: string }[];
}

export type Month = {
  yearMonth: string;
  monthName: string;
  timeline?: { from: 'left' | 'right'; percent: number };
};

export type AppTheme = 'auto' | 'light' | 'dark';
