'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { validTheme } from '@/misc/helpers';

const ThemeSelector: React.FC = () => {
  const [themeState, setThemeState] = useState<string>('light');
  const t = useTranslations('components.themeSelector');

  useEffect(() => {
    setThemeState(validTheme(Cookies.get('theme')));
  }, []);

  function dropdownHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setThemeState(e.target.value);
    Cookies.set('theme', e.target.value);
  }

  return (
    <div>
      <p>{t('theme')}</p>
      <select value={themeState} onChange={dropdownHandler}>
        <option value={'light'}>{t('lightMode')}</option>
        <option value={'dark'}>{t('darkMode')}</option>
        <option value={'auto'}>{t('auto')}</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
