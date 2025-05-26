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
    left: 0,
    right: 0,
  },
};

export default appConfig;
