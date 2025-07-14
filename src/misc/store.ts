/**
 * Waning!
 *
 * The <window> object is not available on module import (apparently because of dynamic module loading)
 * so store functions are only available in client component hooks (useState, useEffect, etc...)
 */

import { type AppTheme, type DisplayedSoftwares } from './types';
import { parseAppTheme, parseDisplayedSofwares } from '@/misc/helpers';

interface Store {
  getTheme(): AppTheme;
  setTheme(theme: AppTheme): AppTheme;
  getDisplayedSoftwares(): DisplayedSoftwares;
  setDisplayedSoftwares(DisplayedSoftwares: DisplayedSoftwares): DisplayedSoftwares;
  getCookiesAllowed(): string | null;
  setCookiesAllowed(allowCookies: boolean): boolean;
}

const store: Store = {
  getTheme() {
    return parseAppTheme(window.localStorage.getItem('theme') || '');
  },
  setTheme(theme) {
    window.localStorage.setItem('theme', theme);
    return theme;
  },
  getDisplayedSoftwares() {
    return parseDisplayedSofwares(window.localStorage.getItem('displayedSoftwares') || '');
  },
  setDisplayedSoftwares(displayedSoftwares) {
    window.localStorage.setItem('displayedSoftwares', displayedSoftwares.join(','));
    return displayedSoftwares;
  },
  getCookiesAllowed() {
    return window.localStorage.getItem('cookiesAllowed');
  },
  setCookiesAllowed(allowCookies) {
    window.localStorage.setItem('cookiesAllowed', allowCookies ? 'yes' : 'no');
    return allowCookies;
  },
};

export default store;
