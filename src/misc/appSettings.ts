import { type Lang } from '@/misc/types';

interface AppSettings {
  lang: {
    defaultLanguage: Lang;
    supportedLanguages: { [langCode: string]: Lang };
  };
}

const supportedLanguages: { [langCode: string]: Lang } = {
  en: { langCode: 'en', lang: 'English' },
  fr: { langCode: 'fr', lang: 'Français' },
  de: { langCode: 'de', lang: 'Deutsch' },
};
const defaultLanguage: Lang = supportedLanguages.en;

const appSettings: AppSettings = {
  lang: {
    defaultLanguage,
    supportedLanguages,
  },
};

export default appSettings;
