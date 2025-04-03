export enum Software {
  CHROME = 'CHROME',
  FIREFOX = 'FIREFOX',
}

export interface Lang {
  langCode: string;
  lang: string;
}

export interface VersionHistoryData {
  [yearMonth: string]: { day: number; version: string }[];
}

export type Months = {
  yearMonth: string;
  monthName: string;
}[];
