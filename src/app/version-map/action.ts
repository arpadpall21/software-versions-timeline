'use server';

import { readFile } from 'node:fs/promises';
import { type HistoryData, type HistoryDataResponse, type ParsedHistoryData, Software, YearMonth } from '@/misc/types';
import appConfig from '../../../config/appConfig';

export async function getVersionHistory(software: Software): Promise<HistoryDataResponse> {
  try {
    if (software === 'CHROME') {      // TODO remove at the end
      const data = await readFile(appConfig.supportedSoftwares[software].dataPath);
      const historyData: HistoryData = JSON.parse(data.toString());

      const dates: Date[] = [];
      for (const yearMonth in historyData) {
        dates.push(new Date(yearMonth + '-01'));
      }

      const times: number[] = [...dates].map((date) => date.getTime());
      const oldestDate: Date = new Date(Math.min(...times));
      const newestDate: Date = new Date(Math.max(...times));
      const oldestYear: number = oldestDate.getFullYear();
      const oldestMonth: number = oldestDate.getMonth() + 1;
      const newestYear: number = newestDate.getFullYear();
      const newestMonth: number = newestDate.getMonth() + 1;

      const parsedData: ParsedHistoryData = {};
      while (oldestDate <= newestDate) {
        const year: number = oldestDate.getFullYear();
        const month: number = oldestDate.getMonth() + 1;
        const yearMonth: string = `${year}-${month.toString().padStart(2, '0')}`;

        if (year === oldestYear && month === oldestMonth) {
          parsedData[yearMonth] = {
            versions: historyData[yearMonth].versions,
            timeline: { from: 'right', percent: -1 },   // TODO calc start
          };
        } else if (year === newestYear && month === newestMonth) {
          parsedData[yearMonth] = {
            versions: historyData[yearMonth].versions,
            timeline: { from: 'left', percent: -1 },   // TODO calc end
          };
        } else {
          parsedData[yearMonth] = {
            versions: historyData[yearMonth] ? historyData[yearMonth].versions : undefined,
            timeline: { from: 'left', percent: 100 },
          };
        }

        oldestDate.setMonth(oldestDate.getMonth() + 1);
      }

      const result: HistoryDataResponse = {
        data: parsedData,
        oldestMonth: { year: oldestYear, month: oldestMonth },
        newestMonth: { year: newestYear, month: newestMonth },
      };

      return result;
    }
  } catch (err) {
    console.error(`Failed to get version history data for software: ${software}`, err);
    throw err;
  }
}
