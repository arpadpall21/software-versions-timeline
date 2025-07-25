import { type Lang, type SupportedSoftwares } from '../src/misc/types';
import supportedSoftwares from './supportedSoftwares';

interface AppConfig {
  supportedSoftwares: SupportedSoftwares;
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
  extendDisplayableMonthRange: {
    min: number;
    max: number;
  };
  standByMonths: {
    // number of month cells ready to be scrolled into view (user experience VS performance)
    left: number;
    right: number;
  };
  timelineDisplayLimit: {
    min: number;
    max: number;
  };
}

const supportedLanguages: { [langCode: string]: Lang } = {
  en: { langCode: 'en', lang: 'English' },
  de: { langCode: 'de', lang: 'Deutsch' },
  fr: { langCode: 'fr', lang: 'Français' },
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
  extendDisplayableMonthRange: {
    min: 2,
    max: 1,
  },
  standByMonths: {
    left: 3,
    right: 3,
  },
  timelineDisplayLimit: {
    min: 2,
    max: 10,
  },
};

export default appConfig;
