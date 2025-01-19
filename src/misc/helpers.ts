import { type Lang } from '@/misc/types';
import appSettings from '@/misc/appSettings';

export function validLang(langCode: string = ''): Lang {
  return appSettings.lang.supportedLanguages[langCode]
    ? appSettings.lang.supportedLanguages[langCode]
    : appSettings.lang.defaultLanguage;
}

export function validTheme(theme: string = ''): string {
  return appSettings.theme.supportedThemes.includes(theme) ? theme : 'light';
}
