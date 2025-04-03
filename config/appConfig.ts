import { type Lang, Software } from '../src/misc/types';

interface SupportedSoftware {
  displayName: string;
  logoPath: string;
  dataPath: string;
}

interface AppConfig {
  supportedSoftwares: { [software in Software]: SupportedSoftware };
  lang: {
    defaultLanguage: Lang;
    supportedLanguages: { [langCode: string]: Lang };
  };
  theme: {
    supportedThemes: string[];
  };
  zoom: {
    minLevel: number;
    maxLevel: number;
    defaultLevel: number;
    sensitivity: number;
  };
}

const supportedSoftwares: { [software in Software]: SupportedSoftware } = {
  [Software.CHROME]: { displayName: 'Chrome', logoPath: 'softwareLogos/chrome.png', dataPath: 'data/test_software.json' },
  [Software.FIREFOX]: { displayName: 'Firefox', logoPath: 'softwareLogos/firefox.png', dataPath: 'data/firefox.json' },
};
const supportedLanguages: { [langCode: string]: Lang } = {
  en: { langCode: 'en', lang: 'English' },
  fr: { langCode: 'fr', lang: 'Français' },
  de: { langCode: 'de', lang: 'Deutsch' },
  hu: { langCode: 'hu', lang: 'Magyar' },
};
const defaultLanguage: Lang = supportedLanguages.en;

const appConfig: AppConfig = {
  supportedSoftwares,
  lang: {
    defaultLanguage,
    supportedLanguages,
  },
  theme: {
    supportedThemes: ['light', 'dark', 'auto'],
  },
  zoom: {
    minLevel: 0.5,
    maxLevel: 3,
    defaultLevel: 1,
    sensitivity: 0.1,
  },
};

export default appConfig;
