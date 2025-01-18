import { type Lang } from '@/misc/types';

// lang
export const defaultLanguage: Lang = { langCode: 'en', lang: 'English' };
export const supportedLanguages: { [langCode: string]: Lang } = {
  en: defaultLanguage,
  fr: { langCode: 'fr', lang: 'Français' },
};
