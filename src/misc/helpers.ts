import { defaultLanguage, supportedLanguages } from '@/misc/constants';

export function getLang(lang: string = ''): string {
  return supportedLanguages.includes(lang) ? lang : defaultLanguage;
}
