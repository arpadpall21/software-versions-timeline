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
  zoom: {
    minLevel: number;
    maxLevel: number;
    defaultLevel: number;
    sensitivity: number;
  };
}

const supportedSoftwares: { [software in Software]: SupportedSoftware } = {
  [Software.CHROME]: {
    displayName: 'Google Chrome',
    logoPath: '/softwareLogos/chrome.png',
    dataPath: 'data/chrome.json',
  },
  [Software.FIREFOX]: {
    displayName: 'Mozilla Firefox',
    logoPath: '/softwareLogos/firefox.webp',
    dataPath: 'data/firefox.json',
  },
  [Software.OPERA]: {
    displayName: 'Opera',
    logoPath: '/softwareLogos/opera.png',
    dataPath: 'data/opera.json',
  },
  [Software.EDGE]: {
    displayName: 'Microsoft Edge',
    logoPath: '/softwareLogos/edge.webp',
    dataPath: 'data/edge.json',
  },
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
  zoom: {
    minLevel: 0.5,
    maxLevel: 10,
    defaultLevel: 1,
    sensitivity: 0.1,
  },
};

export default appConfig;
