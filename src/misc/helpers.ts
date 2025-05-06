import {
  type Lang,
  type Month,
  type VersionHistoryResponse,
  type AppTheme,
  type DisplayedSoftwares,
  type YearMonth,
  Software,
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

function getDate(versionHistory: VersionHistory, which: 'first' | 'last' = 'first'): string {
  let result: string = which === 'first' ? '2500-01' : '1970-01';

  for (const yearMonth in versionHistory.data) {
    if (which === 'first' && yearMonth < result) {
      result = yearMonth;
    }
    if (which === 'last' && yearMonth > result) {
      result = yearMonth;
    }
  }

  return result;
}

/**
 * calculates the timeline length for each month
 */
export function calcMonthTimeline(months: Month[], versionHistory: VersionHistory): Month[] {
  const firstYearMonth: string = getDate(versionHistory.data, 'first');
  const lastYearMonth: string = getDate(versionHistory, 'last');

  const firstMonthHavingVersionIdx: number = months.findIndex((month) => month.yearMonth === firstYearMonth);
  const lastMonthHavingVersionIdx: number = months.findLastIndex((month) => month.yearMonth === lastYearMonth);

  if (lastMonthHavingVersionIdx < 0) {
    return months;
  }

  months[firstMonthHavingVersionIdx < 0 ? 0 : firstMonthHavingVersionIdx].timeline = {
    from: 'right',
    percent: firstMonthHavingVersionIdx < 0 ? 100 : 100 - calcPercentOf(versionHistory.data[firstYearMonth][0].day, 31),
  };
  months[lastMonthHavingVersionIdx].timeline = {
    from: 'left',
    percent: calcPercentOf(versionHistory[lastYearMonth][versionHistory[lastYearMonth].length - 1].day, 31),
  };

  return months.map((month, i) => {
    if (i > firstMonthHavingVersionIdx && i < lastMonthHavingVersionIdx) {
      month.timeline = {
        from: 'left',
        percent: 100,
      };
    }

    return month;
  });
}
