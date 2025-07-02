import {
  type Lang,
  type AppTheme,
  type DisplayedSoftwares,
  type DisplayableDateLimit,
  type Months,
  FeCache,
} from '@/misc/types';
import appConfig from '../../config/appConfig';
import { Software, defaultDisplayedSoftwares } from '../../config/supportedSoftwares';

const minZoomLevel = appConfig.zoom.minLevel;
const maxZoomLevel = appConfig.zoom.maxLevel;

const themes: AppTheme[] = ['auto', 'light', 'dark'];
export const defaultAppTheme: AppTheme = themes[0];

export function parseAppTheme(theme: string): AppTheme {
  return (themes.includes(theme as AppTheme) ? theme : defaultAppTheme) as AppTheme;
}

/**
 * argument <displayedSoftwares> is expected to be a comma separated list of strings
 */
export function parseDisplayedSofwares(displayedSoftwares: string): DisplayedSoftwares {
  const softwareList: string[] = displayedSoftwares.split(',');

  const supportedSoftwares: string[] = Object.values(Software);
  for (const software of softwareList) {
    if (!supportedSoftwares.includes(software)) {
      return defaultDisplayedSoftwares;
    }
  }

  return softwareList as DisplayedSoftwares;
}

/**
 * usable in client component hook
 */
export function getCurrentBrowserTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getLang(langCode: string = ''): Lang {
  return appConfig.lang.supportedLanguages[langCode]
    ? appConfig.lang.supportedLanguages[langCode]
    : appConfig.lang.defaultLanguage;
}

export function calcTimelineZoom(zoom: 'zoomIn' | 'zoomOut', currentZoomLevel: number): number {
  const zoomSensitivity: number = currentZoomLevel / 10;

  if (zoom === 'zoomIn') {
    return Math.min(currentZoomLevel + zoomSensitivity, maxZoomLevel);
  }
  return Math.max(currentZoomLevel - zoomSensitivity, minZoomLevel);
}

export function calcPercentOf(fraction: number, total: number = 100): number {
  return Math.floor((fraction / total) * 100);
}

export function calcMonthRange(
  endDate: Date,
  nrOfMonths: number,
  dateLimit?: DisplayableDateLimit,
  addExtraMonth?: number,
): Months {
  const result: Months = [];
  const monthMap: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  let _endDate = new Date(endDate);
  if (dateLimit?.newestDate) {
    _endDate = _endDate.getTime() > dateLimit.newestDate.getTime() ? new Date(dateLimit.newestDate) : _endDate;
  }

  let _startDate = new Date(_endDate);
  _startDate.setMonth(_startDate.getMonth() - (nrOfMonths - 1));
  if (dateLimit?.oldestDate) {
    _startDate = _startDate.getTime() < dateLimit.oldestDate.getTime() ? new Date(dateLimit.oldestDate) : _startDate;
  }

  if (addExtraMonth && dateLimit?.newestDate) {
    const endDateWithExtraMonth = new Date(_endDate);
    endDateWithExtraMonth.setMonth(endDateWithExtraMonth.getMonth() + addExtraMonth);

    _endDate =
      endDateWithExtraMonth.getTime() > dateLimit.newestDate.getTime()
        ? new Date(dateLimit.newestDate)
        : endDateWithExtraMonth;
  }

  while (
    _startDate.getFullYear() < _endDate.getFullYear() ||
    (_startDate.getFullYear() === _endDate.getFullYear() && _startDate.getMonth() <= _endDate.getMonth())
  ) {
    const year: number = _startDate.getFullYear();
    const month: number = _startDate.getMonth() + 1;
    const yearMonth: string = `${year}-${month.toString().padStart(2, '0')}`;

    result.push({ date: new Date(_startDate), yearMonth, monthName: monthMap[month - 1] });

    _startDate.setMonth(_startDate.getMonth() + 1);
  }

  return result;
}

export function calcDisplayableDateLimit(
  displayedSoftwares: DisplayedSoftwares,
  feCache: FeCache,
  extendMonthRange?: { min?: number; max?: number },
): DisplayableDateLimit | undefined {
  if (Object.keys(feCache).length === 0 || displayedSoftwares.length === 0) {
    return;
  }

  let oldestDate = new Date('2500-01-01');
  let newestDate = new Date(0);

  for (const software of displayedSoftwares) {
    if (feCache[software]) {
      if (feCache[software].oldestDate < oldestDate) {
        oldestDate = new Date(feCache[software].oldestDate);
      }
      if (feCache[software].newestDate > newestDate) {
        newestDate = new Date(feCache[software].newestDate);
      }
    }
  }

  if (extendMonthRange?.min) {
    oldestDate.setMonth(oldestDate.getMonth() - extendMonthRange.min);
  }
  if (extendMonthRange?.max) {
    newestDate.setMonth(newestDate.getMonth() + extendMonthRange.max);
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

  return result;
}

/**
 * usable in client component hook
 */
export function calcNrOfGridCellsToRender(gridCellWidth: number): number {
  return Math.ceil(window.outerWidth / gridCellWidth) + appConfig.standByMonths.left + appConfig.standByMonths.right;
}

export function getDisplayedLastMonth(displayedMonths: Months, shiftBy: number = 0): Date {
  const lastMonth = displayedMonths[displayedMonths.length - 1];
  const shiftedMonthIdx = Number.parseInt(lastMonth.yearMonth.slice(5)) - 1 + shiftBy;

  return new Date(Number.parseInt(lastMonth.yearMonth.slice(0, 5)), shiftedMonthIdx);
}

/**
 * compares date objects by checking years & months only
 */
export function compareDates(date1: Date, operator: '<' | '>', date2: Date): boolean {
  if (
    operator === '<' &&
    (date1.getFullYear() < date2.getFullYear() ||
      (date1.getFullYear() === date2.getFullYear() && date1.getMonth() < date2.getMonth()))
  ) {
    return true;
  } else if (
    operator === '>' &&
    (date1.getFullYear() > date2.getFullYear() ||
      (date1.getFullYear() === date2.getFullYear() && date1.getMonth() > date2.getMonth()))
  ) {
    return true;
  }

  return false;
}

export function getMonthDifference(date1: Date = new Date(), date2: Date): number {
  const year1: number = date1.getFullYear();
  const month1: number = date1.getMonth();
  const year2: number = date2.getFullYear();
  const month2: number = date2.getMonth();

  const yearDifference = year1 - year2;
  const monthDifference = month1 - month2;

  return yearDifference * 12 + monthDifference;
}
