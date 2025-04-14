/**
 * Waning!
 *
 * The <window> object is not available on module import (apparently because of dynamic module loading)
 * so store functions can only be used in client component react hooks (useState, useEffect, etc...)
 */

type Theme = 'auto' | 'light' | 'dark';

const themes: Theme[] = ['auto', 'light', 'dark'];
const defaultTheme: Theme = themes[0];

interface Store {
  getTheme(): Theme;
  setTheme(theme: Theme): Theme;
}

const store: Store = {
  getTheme() {
    const storedTheme = window.localStorage.getItem('theme') || '';
    return (themes.includes(storedTheme as Theme) ? storedTheme : defaultTheme) as Theme;
  },
  setTheme(theme) {
    window.localStorage.setItem('theme', theme);
    return theme;
  },
};

export default store;
