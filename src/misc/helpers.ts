import { type Lang } from '@/misc/types';
import appConfig from '../../config/appConfig';

const minZoomLevel = appConfig.timelineZoom.minLevel;
const maxZoomLevel = appConfig.timelineZoom.maxLevel;
const zoomSensitivity = appConfig.timelineZoom.sensitivity;

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
