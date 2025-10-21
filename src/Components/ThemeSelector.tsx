'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Dropdown from '@/Components/Dropdown';
import store from '@/misc/store';
import { type AppTheme } from '@/misc/types';
import { defaultAppTheme, parseAppTheme, autoDetectBrowserTheme } from '@/misc/helpers';

const ThemeSelector: React.FC = () => {
  const [themeState, setThemeState] = useState<AppTheme>(defaultAppTheme);
  const t = useTranslations('components.themeSelector');

  useEffect(() => setThemeState(store.getTheme()), []);

  useEffect(() => {
    switch (themeState) {
      case 'light': {
        store.setTheme('light');
        document.documentElement.classList.remove('dark');
        break;
      }
      case 'dark': {
        store.setTheme('dark');
        document.documentElement.classList.add('dark');
        break;
      }
      default: {
        store.setTheme('auto');
        if (autoDetectBrowserTheme() === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.add('dark');
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
      handleDropdown={(e) => setThemeState(parseAppTheme(e.target.value))}
      title={t('theme')}
    />
  );
};

export default ThemeSelector;
