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

interface DayVersion {
  day: number;
  version: string;
}

interface DayVersionWithTimeline extends DayVersion {
  timeline: { from: 'left' | 'right'; percent: number };
}

export type VersionHistoryData = { [yearMonth: string]: DayVersion[] };
export type VersionHistoryDataWithTimeline = { [yearMonth: string]: DayVersionWithTimeline[] };

export interface VersionHistory {
  data: VersionHistoryDataWithTimeline;
  oldestYearMonth: YearMonth;
  newestYearMonth: YearMonth;
}

export interface Month {
  yearMonth: string;
  monthName: string;
  timeline?: { from: 'left' | 'right'; percent: number };
}

export type AppTheme = 'auto' | 'light' | 'dark';

export type FeCache = { [key: string]: VersionHistory };

export type DisplayedSoftwares = [Software, Software, Software, Software, Software];

export interface YearMonth {
  year: number;
  month: number;
}
