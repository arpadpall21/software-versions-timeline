import { type Lang, type SupportedSoftwares } from '../src/misc/types';
import supportedSoftwares from './supportedSoftwares';

interface AppConfig {
  supportedSoftwares: SupportedSoftwares;
  oldestYear: number;
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

const supportedLanguages: { [langCode: string]: Lang } = {
  en: { langCode: 'en', lang: 'English' },
  fr: { langCode: 'fr', lang: 'Français' },
  de: { langCode: 'de', lang: 'Deutsch' },
  hu: { langCode: 'hu', lang: 'Magyar' },
};
const defaultLanguage: Lang = supportedLanguages.en;

const appConfig: AppConfig = {
  supportedSoftwares,
  oldestYear: 1994,
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
