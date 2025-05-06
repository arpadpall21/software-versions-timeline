'use server';

import { readFile } from 'node:fs/promises';
import { type HistoryData, type ParsedHistoryData, Software } from '@/misc/types';
import appConfig from '../../../config/appConfig';

export async function getVersionHistory(software: Software): Promise<ParsedHistoryData> {
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



      const result: ParsedHistoryData = {
        data: {},
        oldestMonth: { year: oldestYear, month: oldestMonth },
        newestMonth: { year: newestYear, month: newestMonth },
      };


      console.log(result)
      return result;
    }
  } catch (err) {
    console.error(`Failed to get version history data for software: ${software}`, err);
    throw err;
  }
}
