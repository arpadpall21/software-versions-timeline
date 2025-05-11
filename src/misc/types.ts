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

export interface HistoryData {
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

export interface VersionHistoryResponse {
  data: ParsedHistoryData;
  oldestDate: Date;
  newestDate: Date;
}

export interface Month {
  yearMonth: string;
  monthName: string;
}

export interface DisplayableDateLimit {
  oldestDate: Date;
  newestDate: Date;
}

export type AppTheme = 'auto' | 'light' | 'dark';

export type FeCache = { [key: string]: VersionHistoryResponse };

export type DisplayedSoftwares = Software[];
