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

export interface YearMonth {
  year: number;
  month: number;
}

export type SupportedSoftwares = { [software in Software]: SupportedSoftware };

export interface Lang {
  langCode: string;
  lang: string;
}

export interface Month {
  yearMonth: string;
  monthName: string;
}

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
