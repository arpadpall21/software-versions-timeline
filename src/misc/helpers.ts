import { type Lang } from '@/misc/types';
import appSettings from '@/misc/appSettings';

const minZoomLevel = appSettings.timelineZoom.minLevel;
const maxZoomLevel = appSettings.timelineZoom.maxLevel;
const zoomSensitivity = appSettings.timelineZoom.sensitivity;

export function validLang(langCode: string = ''): Lang {
  return appSettings.lang.supportedLanguages[langCode]
    ? appSettings.lang.supportedLanguages[langCode]
    : appSettings.lang.defaultLanguage;
}

export function validTheme(theme: string = ''): string {
  return appSettings.theme.supportedThemes.includes(theme) ? theme : 'auto';
}

export function calcTimelineZoom(direction: 'zoomIn' | 'zoomOut', currentZoomLevel: number): number {
  if (direction === 'zoomIn') {
    return Math.max(currentZoomLevel - zoomSensitivity, minZoomLevel);
  }
  return Math.min(currentZoomLevel + zoomSensitivity, maxZoomLevel);
}
