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
      const oldestMonth: YearMonth = { year: oldestDate.getFullYear(), month: oldestDate.getMonth() + 1 };
      const newestMonth: YearMonth = { year: newestDate.getFullYear(), month: newestDate.getMonth() + 1 };

      const parsedData: ParsedHistoryData = {};
      while (oldestDate <= newestDate) {
        const yearMonth: string = `${oldestDate.getFullYear()}-${String(oldestDate.getMonth() + 1).padStart(2, '0')}`;

        if (historyData[yearMonth]) {
          parsedData[yearMonth] = {
            versions: historyData[yearMonth].versions,
            timeline: { from: 'left', percent: 100 },
          };
        }

        oldestDate.setMonth(oldestDate.getMonth() + 1);
      }

      const result: HistoryDataResponse = { data: parsedData, oldestMonth, newestMonth };


      console.log(result)
      return result;
    }
  } catch (err) {
    console.error(`Failed to get version history data for software: ${software}`, err);
    throw err;
  }
}
