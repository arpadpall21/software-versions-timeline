'use client';

import Cookies from 'js-cookie';
import { validLang } from '@/misc/helpers';
import { type Lang } from '@/misc/types';
import appSettings from '@/misc/appSettings';

const LangSelector: React.FC = () => {
  const lang: Lang = validLang(Cookies.get('lang'));

  function dropdownHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    Cookies.set('lang', e.target.value);
    window.location.reload();
  }

  return (
    <select value={lang.langCode} onChange={dropdownHandler}>
      {Object.keys(appSettings.lang.supportedLanguages).map((lang) => (
        <option value={appSettings.lang.supportedLanguages[lang].langCode} key={lang}>
          {appSettings.lang.supportedLanguages[lang].lang}
        </option>
      ))}
    </select>
  );
};

export default LangSelector;
