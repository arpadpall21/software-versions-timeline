import { type Lang } from '@/misc/types';

interface AppSettings {
  lang: {
    defaultLanguage: Lang;
    supportedLanguages: { [langCode: string]: Lang };
  };
  theme: {
    supportedThemes: string[];
  };
  timelineZoom: {
    minLevel: number;
    maxLevel: number;
    defaultLevel: number;
    sensitivity: number;
  };
}

const supportedLanguages: { [langCode: string]: Lang } = {
  en: { langCode: 'en', lang: 'English' },
  fr: { langCode: 'fr', lang: 'Français' },
  de: { langCode: 'de', lang: 'Deutsch' },
  hu: { langCode: 'hu', lang: 'Magyar' },
};
const defaultLanguage: Lang = supportedLanguages.en;

const appSettings: AppSettings = {
  lang: {
    defaultLanguage,
    supportedLanguages,
  },
  theme: {
    supportedThemes: ['light', 'dark', 'auto'],
  },
  timelineZoom: {
    minLevel: 0.5,
    maxLevel: 3,
    defaultLevel: 1,
    sensitivity: 0.1,
  },
};

export default appSettings;
