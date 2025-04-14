/**
 * Waning!
 *
 * The <window> object is not available on module import (apparently because of dynamic module loading)
 * so store functions can only be used in client component react hooks (useState, useEffect, etc...)
 */

import { type AppTheme } from './types';
import { parseAppTheme } from '@/misc/helpers';

interface Store {
  getTheme(): AppTheme;
  setTheme(theme: AppTheme): AppTheme;
}

const store: Store = {
  getTheme() {
    return parseAppTheme(window.localStorage.getItem('theme') || '');
  },
  setTheme(theme) {
    window.localStorage.setItem('theme', theme);
    return theme;
  },
};

export default store;
