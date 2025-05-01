'use server';

import { readFile } from 'node:fs/promises';
import { type VersionHistoryData, Software } from '@/misc/types';
import appConfig from '../../../config/appConfig';


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getVersionHistory(software: Software): Promise<VersionHistoryData> {
  try {
    const data = await readFile(appConfig.supportedSoftwares[software].dataPath);
    
    // const suspended = Math.random() * 3000
    // console.log('suspeded for: ', suspended)
    await sleep(1000)
    
    // if (Math.random() > .5) {
    //   throw Error('some error')
    // }
    
    
    return JSON.parse(data.toString());
  } catch (err) {
    console.error(`Failed to get version history data for software: ${software}`, err);
    throw err;
  }
}
