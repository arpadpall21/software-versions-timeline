import { type Lang } from '@/misc/types';
import { defaultLanguage, supportedLanguages } from '@/misc/constants';

export function validLang(langCode: string = ''): Lang {
  return supportedLanguages[langCode] ? supportedLanguages[langCode] : defaultLanguage;
}
