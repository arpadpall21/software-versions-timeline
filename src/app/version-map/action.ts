'use server';

import { readFile } from 'node:fs/promises';
import { type VersionHistoryData } from '@/misc/types';

export async function getVersionHistory(path: string): VersionHistoryData | null {
  try {
    const data = await readFile(path);
    console.log(data);
    
    console.log()
    
    // return JSON.parse(data.toJSON());
  } catch (err) {
    console.error(`Failed to get version history data on path: ${path}`, err);
  }
}
