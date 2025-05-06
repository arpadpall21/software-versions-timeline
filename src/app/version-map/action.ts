'use server';

import { readFile } from 'node:fs/promises';
import { type VersionHistory, type VersionHistoryData, Software } from '@/misc/types';
import appConfig from '../../../config/appConfig';

export async function getVersionHistory(software: Software): Promise<VersionHistory> {
  try {
    if (software === 'NODE') {      // TODO remove at the end
      let oldestYear: number = 2500;
      let oldestMonth: number = 12;
      let newestYear: number = 2500;
      let newestMonth: number = 12;
    
      const data = await readFile(appConfig.supportedSoftwares[software].dataPath);
      const historyData: VersionHistoryData = JSON.parse(data.toString());

      const result: VersionHistory = {
        data: historyData,
        oldestYearMonth: { year: olde, month: 12 },
        newestYearMonth: { year: 1979, month: 1 },
      };


      console.log(result)
      return result;
    }
  } catch (err) {
    console.error(`Failed to get version history data for software: ${software}`, err);
    throw err;
  }
}
