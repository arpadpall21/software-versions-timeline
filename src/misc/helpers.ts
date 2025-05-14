import {
  type Lang,
  type Month,
  type AppTheme,
  type DisplayedSoftwares,
  type YearMonth,
  type DisplayableDateLimit,
  type RawHistoryData,
  type ParsedVersionHistoryData,
  type ParsedHistoryData,
  Software,
  FeCache,
} from '@/misc/types';
import appConfig from '../../config/appConfig';

const minZoomLevel = appConfig.zoom.minLevel;
const maxZoomLevel = appConfig.zoom.maxLevel;

const themes: AppTheme[] = ['auto', 'light', 'dark'];
export const defaultAppTheme: AppTheme = themes[0];
export const defaultDisplayedSoftwares: DisplayedSoftwares = [
  Software.CHROME,
  Software.MOZILLA,
  Software.OPERA,
  Software.EDGE,
  Software.SAFARI,
];

export function parseAppTheme(theme: string): AppTheme {
  return (themes.includes(theme as AppTheme) ? theme : defaultAppTheme) as AppTheme;
}
/**
 * argument <displayedSoftwares> is expected to be a comma separated vlue string
 */
export function parseDisplayedSofwares(displayedSoftwares: string): DisplayedSoftwares {
  const softwareList: string[] = displayedSoftwares.split(',');

  if (softwareList.length !== defaultDisplayedSoftwares.length) {
    return defaultDisplayedSoftwares;
  }

  const supportedSoftwares: string[] = Object.values(Software);
  for (const software of softwareList) {
    if (!supportedSoftwares.includes(software)) {
      return defaultDisplayedSoftwares;
    }
  }

  return softwareList as DisplayedSoftwares;
}

/**
 * only in client component hook
 */
export function getCurrentBrowserTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getLang(langCode: string = ''): Lang {
  return appConfig.lang.supportedLanguages[langCode]
    ? appConfig.lang.supportedLanguages[langCode]
    : appConfig.lang.defaultLanguage;
}

export function calcTimelineZoom(direction: 'zoomIn' | 'zoomOut', currentZoomLevel: number): number {
  const zoomSensitivity: number = currentZoomLevel / 10;

  if (direction === 'zoomIn') {
    return Math.min(currentZoomLevel + zoomSensitivity, maxZoomLevel);
  }
  return Math.max(currentZoomLevel - zoomSensitivity, minZoomLevel);
}

export function calcPercentOf(fraction: number, total: number = 100): number {
  return Math.floor((fraction / total) * 100);
}

export function calcMonthRange(endDate: YearMonth, minusMonths: number): Month[] {
  const result: Month[] = [];
  const monthMap: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  const totalMonths: number = endDate.year * 12 + endDate.month;
  const resultTotalMonths: number = totalMonths - minusMonths;

  const resultYear = Math.floor(resultTotalMonths / 12);
  const resultMonth = resultTotalMonths % 12;

  const startYear = resultMonth === 0 ? resultYear - 1 : resultYear;
  const startMonth = resultMonth === 0 ? 12 : resultMonth;

  for (let year = startYear; year <= endDate.year; year++) {
    for (
      let month = year === startYear ? startMonth : 1;
      month <= (year === endDate.year ? endDate.month : 12);
      month++
    ) {
      result.push({ yearMonth: `${year}-${month.toString().padStart(2, '0')}`, monthName: monthMap[month - 1] });
    }
  }

  return result;
}

export function new__calcMonthRange(
  endDate: Date,
  minusMonths: number,
  displayableDateLimit: DisplayableDateLimit,
): Month[] {
  const result: Month[] = [];
  const monthMap: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - minusMonths);

  while (
    startDate.getFullYear() < endDate.getFullYear() ||
    (startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() <= endDate.getMonth())
  ) {
    const year: number = startDate.getFullYear();
    const month: number = startDate.getMonth() + 1;
    const yearMonth: string = `${year}-${month.toString().padStart(2, '0')}`;

    result.push({ yearMonth, monthName: monthMap[month - 1] });

    startDate.setMonth(startDate.getMonth() + 1);
  }

  return result;
}












export function calcDisplayableDateLimit(
  displayedSoftwares: DisplayedSoftwares,
  feCache: FeCache,
): DisplayableDateLimit | undefined {
  if (Object.keys(feCache).length === 0 || displayedSoftwares.length === 0) {
    return;
  }

  let oldestDate = new Date('2500-01-01');
  let newestDate = new Date(0);

  for (const software of displayedSoftwares) {
    if (feCache[software]) {
      if (feCache[software].oldestDate < oldestDate) {
        oldestDate = feCache[software].oldestDate;
      }
      if (feCache[software].newestDate > newestDate) {
        newestDate = feCache[software].newestDate;
      }
    }
  }

  return { oldestDate, newestDate };
}

export function getYearRange(displayableDateLimit: DisplayableDateLimit): number[] {
  const result: number[] = [];

  const oldestDateClone = new Date(displayableDateLimit.oldestDate); // clone avois mutating the state
  const newestYear = displayableDateLimit.newestDate.getFullYear();

  while (oldestDateClone.getFullYear() <= newestYear) {
    const year: number = oldestDateClone.getFullYear();
    result.push(year);

    oldestDateClone.setFullYear(year + 1);
  }

  result.reverse();
  return result;
}
