import { type Lang, type Month, type VersionHistoryData, type AppTheme } from '@/misc/types';
import appConfig from '../../config/appConfig';

const minZoomLevel = appConfig.zoom.minLevel;
const maxZoomLevel = appConfig.zoom.maxLevel;

const themes: AppTheme[] = ['auto', 'light', 'dark'];
export const defaultAppTheme: AppTheme = themes[0];

export function parseAppTheme(theme: string): AppTheme {
  return (themes.includes(theme as AppTheme) ? theme : defaultAppTheme) as AppTheme;
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

export function calcMonthsUpToCurrent(startYear: number, startMonth: number = 1): Month[] {
  const result: Month[] = [];

  const monthMap: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const today = new Date();
  const endYear = today.getUTCFullYear();
  const endMonth = today.getUTCMonth() + 1;

  for (let year = startYear; year <= endYear; year++) {
    for (let month = year === startYear ? startMonth : 1; month <= (year === endYear ? endMonth : 12); month++) {
      result.push({ yearMonth: `${year}-${month.toString().padStart(2, '0')}`, monthName: monthMap[month - 1] });
    }
  }

  return result;
}

function getDate(versionHistoryData: VersionHistoryData, which: 'first' | 'last' = 'first'): string {
  let result: string = which === 'first' ? '2500-01' : '1970-01';

  for (const yearMonth in versionHistoryData) {
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
export function calcMonthTimeline(months: Month[], versionHistoryData: VersionHistoryData): Month[] {
  const firstYearMonth: string = getDate(versionHistoryData, 'first');
  const lastYearMonth: string = getDate(versionHistoryData, 'last');

  const firstMonthHavingVersionIdx: number = months.findIndex((month) => month.yearMonth === firstYearMonth);
  const lastMonthHavingVersionIdx: number = months.findLastIndex((month) => month.yearMonth === lastYearMonth);

  months[firstMonthHavingVersionIdx < 0 ? 0 : firstMonthHavingVersionIdx].timeline = {
    from: 'right',
    percent: firstMonthHavingVersionIdx < 0 ? 100 : 100 - calcPercentOf(versionHistoryData[firstYearMonth][0].day, 31),
  };
  months[lastMonthHavingVersionIdx].timeline = {
    from: 'left',
    percent: calcPercentOf(versionHistoryData[lastYearMonth][versionHistoryData[lastYearMonth].length - 1].day, 31),
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
