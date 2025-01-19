'use client';

import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';

const ThemeSelector: React.FC = () => {
  const t = useTranslations('components.themeSelector');

  function dropdownHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    
  }

  return (
    <div>
      <p>{t('theme')}</p>
      <select value={'light'} onChange={dropdownHandler}>
        <option value={'light'}>{t('lightMode')}</option>
        <option value={'dark'}>{t('darkMode')}</option>
        <option value={'auto'}>{t('auto')}</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
