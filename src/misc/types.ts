export enum Software {
  CHROME = 'CHROME',
  MOZILLA = 'MOZILLA',
  OPERA = 'OPERA',
  EDGE = 'EDGE',
  SAFARI = 'SAFARI',
  NODE = 'NODE',
  REACT = 'REACT',
  PYTHON = 'PYTHON',
}

interface SupportedSoftware {
  displayName: string;
  logoPath: string;
  dataPath: string;
  source?: string;
}

export type SupportedSoftwares = { [software in Software]: SupportedSoftware };

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

export type LocalCache = { [key: string]: VersionHistoryData };
