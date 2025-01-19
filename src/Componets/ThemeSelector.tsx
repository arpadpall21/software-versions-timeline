'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { validTheme } from '@/misc/helpers';

const ThemeSelector: React.FC = () => {
  const [themeState, setThemeState] = useState<string>('auto');
  const t = useTranslations('components.themeSelector');

  useEffect(() => {
    setThemeState(validTheme(Cookies.get('theme')));
  }, []);

  useEffect(() => {
    switch (themeState) {
      case 'light': {
        Cookies.set('theme', 'light');
        document.documentElement.classList.remove('dark');
        break;
      }
      case 'dark': {
        Cookies.set('theme', 'dark');
        document.documentElement.classList.add('dark');
        break;
      }
      default: {
        Cookies.set('theme', 'auto');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, [themeState]);

  return (
    <div>
      <p>{t('theme')}</p>
      <select value={themeState} onChange={(e) => setThemeState(e.target.value)}>
        <option value={'light'}>{t('lightMode')}</option>
        <option value={'dark'}>{t('darkMode')}</option>
        <option value={'auto'}>{t('auto')}</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
