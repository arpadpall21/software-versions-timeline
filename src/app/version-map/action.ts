'use server';

import { readFile } from 'node:fs/promises';
import { type RawHistoryData, type ParsedVersionHistoryData, type Software } from '@/misc/types';
import { calcPercentOf, parseHistoryData } from '@/misc/helpers';
import appConfig from '../../../config/appConfig';

function delay(milliseconds) {    // TODO: for testing remove it
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}


export async function getVersionHistory(softwares: Software[]): Promise<ParsedVersionHistoryData> {
  try {
    const data = await readFile(appConfig.supportedSoftwares[softwares[0]].dataPath);
    const historyData: RawHistoryData = JSON.parse(data.toString());

    return parseHistoryData(historyData);
  } catch (err) {
    console.error(`Failed to get version history data for software: ${softwares[0]}`, err);
    throw err;
  }
}
