export enum Software {
  CHROME = 'CHROME',
  FIREFOX = 'FIREFOX',
}

export interface Lang {
  langCode: string;
  lang: string;
}

export type VersionHistoryData = {
  date: string;
  version: string;
}[][];
