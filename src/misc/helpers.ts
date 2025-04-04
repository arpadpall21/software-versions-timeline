import { type Lang, type Month, type VersionHistoryData } from '@/misc/types';
import appConfig from '../../config/appConfig';

const minZoomLevel = appConfig.zoom.minLevel;
const maxZoomLevel = appConfig.zoom.maxLevel;
const zoomSensitivity = appConfig.zoom.sensitivity;

export function validLang(langCode: string = ''): Lang {
  return appConfig.lang.supportedLanguages[langCode]
    ? appConfig.lang.supportedLanguages[langCode]
    : appConfig.lang.defaultLanguage;
}

export function validTheme(theme: string = ''): string {
  return appConfig.theme.supportedThemes.includes(theme) ? theme : 'auto';
}

export function calcTimelineZoom(direction: 'zoomIn' | 'zoomOut', currentZoomLevel: number): number {
  if (direction === 'zoomIn') {
    return Math.max(currentZoomLevel - zoomSensitivity, minZoomLevel);
  }
  return Math.min(currentZoomLevel + zoomSensitivity, maxZoomLevel);
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

function getFirstYearMonth(versionHistoryData: VersionHistoryData): string {
  let firstYearMonth = '3000-01';

  for (const yearMonth in versionHistoryData) {
    if (yearMonth < firstYearMonth) {
      firstYearMonth = yearMonth;
    }
  }

  return firstYearMonth;
}

/**
 * calculate the timeline length for each month
 */
export function calcMonthsWithTimeline(months: Month[], versionHistoryData: VersionHistoryData): Month[] {
  const _firstYearMonth: string = getFirstYearMonth(versionHistoryData);
  
  
  // Math.min(...Object.keys(versionHistoryData).map(date => new Date(date)));
  
  console.log(_firstYearMonth)
  
  
  
  
  const firstMonthHavingVersionIdx: number = months.findIndex((month) => versionHistoryData?.[month.yearMonth]);
  const lastMonthHavingVersionIdx: number = months.findLastIndex((month) => versionHistoryData?.[month.yearMonth]);

  const firstYearMonth: string = months[firstMonthHavingVersionIdx].yearMonth;
  const lastYearMonth: string = months[lastMonthHavingVersionIdx].yearMonth;

  return months.map((month, i) => {
    if (i === firstMonthHavingVersionIdx) {
      month.timeline = {
        from: 'right',
        percent: 100 - calcPercentOf(versionHistoryData[firstYearMonth][0].day, 31),
      };
    } else if (i === lastMonthHavingVersionIdx) {
      month.timeline = {
        from: 'left',
        percent: calcPercentOf(versionHistoryData[lastYearMonth][versionHistoryData[lastYearMonth].length - 1].day, 31),
      };
    } else if (i > firstMonthHavingVersionIdx && i < lastMonthHavingVersionIdx) {
      month.timeline = {
        from: 'left',
        percent: 100,
      };
    }

    return month;
  });
}
