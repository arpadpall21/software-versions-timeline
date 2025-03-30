'use server';

import { readFile } from 'node:fs/promises';
import { type VersionHistoryData, Software } from '@/misc/types';
import appConfig from '../../../config/appConfig';

export async function getVersionHistory(software: Software): Promise<VersionHistoryData | undefined> {
  try {
    const data = await readFile(appConfig.supportedSoftwares[software].dataPath);
    return JSON.parse(data.toString());
  } catch (err) {
    console.error(`Failed to get version history data for software: ${software}`, err);
    return undefined;
  }
}
