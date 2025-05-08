'use server';

import { readFile } from 'node:fs/promises';
import { type HistoryData, type VersionHistoryResponse, type ParsedHistoryData, Software } from '@/misc/types';
import { calcPercentOf } from '@/misc/helpers';
import appConfig from '../../../config/appConfig';

export async function getVersionHistory(software: Software): Promise<VersionHistoryResponse> {
  try {
    const data = await readFile(appConfig.supportedSoftwares[software].dataPath);
    const historyData: HistoryData = JSON.parse(data.toString());

    const dates: Date[] = [];
    for (const yearMonth in historyData) {
      dates.push(new Date(yearMonth + '-01'));
    }

    const times: number[] = [...dates].map((date) => date.getTime());
    const oldestDate: Date = new Date(Math.min(...times));
    const newestDate: Date = new Date(Math.max(...times));

    const dateClone: Date = new Date(oldestDate);
    const parsedData: ParsedHistoryData = {};
    while (dateClone <= newestDate) {
      const year: number = dateClone.getFullYear();
      const month: number = dateClone.getMonth() + 1;
      const yearMonth: string = `${year}-${month.toString().padStart(2, '0')}`;

      if (year === oldestDate.getFullYear() && month === oldestDate.getMonth() + 1) {
        parsedData[yearMonth] = {
          versions: historyData[yearMonth].versions,
          timeline: {
            from: 'right',
            percent: 100 - calcPercentOf(Math.min(...historyData[yearMonth].versions.map(({ day }) => day)), 31),
          },
        };
      } else if (year === newestDate.getFullYear() && month === newestDate.getMonth() + 1) {
        parsedData[yearMonth] = {
          versions: historyData[yearMonth].versions,
          timeline: {
            from: 'left',
            percent: calcPercentOf(Math.max(...historyData[yearMonth].versions.map(({ day }) => day)), 31),
          },
        };
      } else {
        parsedData[yearMonth] = {
          versions: historyData[yearMonth] ? historyData[yearMonth].versions : undefined,
          timeline: { from: 'left', percent: 100 },
        };
      }

      dateClone.setMonth(dateClone.getMonth() + 1);
    }

    return { data: parsedData, oldestDate, newestDate };
  } catch (err) {
    console.error(`Failed to get version history data for software: ${software}`, err);
    throw err;
  }
}
