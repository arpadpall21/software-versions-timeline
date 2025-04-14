'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import Dropdown from '@/Components/Dropdown';

const themes: string[] = ['auto', 'light', 'dark'];
const defaultTheme: string = themes[0];

const ThemeSelector: React.FC = () => {
  const [themeState, setThemeState] = useState<string>('auto');
  const t = useTranslations('components.themeSelector');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme') || '';
    setThemeState(themes.includes(storedTheme) ? storedTheme : defaultTheme);
  }, []);

  useEffect(() => {
    switch (themeState) {
      case 'light': {
        window.localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
        break;
      }
      case 'dark': {
        window.localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
        break;
      }
      default: {
        window.localStorage.setItem('theme', 'auto');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, [themeState]);

  return (
    <Dropdown
      selectedItem={themeState}
      optionItems={[
        ['auto', t('auto')],
        ['light', t('lightMode')],
        ['dark', t('darkMode')],
      ]}
      dropdownHandler={(e) => setThemeState(e.target.value)}
      title={t('theme')}
    />
  );
};

export default ThemeSelector;
