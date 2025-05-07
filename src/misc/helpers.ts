import { type Lang, type Month, type AppTheme, type DisplayedSoftwares, type YearMonth, Software } from '@/misc/types';
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

export function calcMonthRange(
  endDate: YearMonth,
  monthsToSubtract: number,
  minAllowedMonth?: YearMonth,
  maxAllowedMonth?: YearMonth,
): Month[] {
  const result: Month[] = [];
  const monthMap: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  const totalMonths: number = endDate.year * 12 + endDate.month;
  const resultTotalMonths: number = totalMonths - monthsToSubtract;

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

export function calcYearRange(endInc: number | 'current'): number[] {   // TODO: refactor
  const result: number[] = [];
  const endYear: number = endInc === 'current' ? new Date().getFullYear() : endInc;

  for (let i = appConfig.oldestYear; i <= endYear; i++) {
    result.push(i);
  }

  result.reverse();
  return result;
}
