'use client';

import { useRouter } from 'next/navigation';
import { validLang } from '@/misc/helpers';
import Cookies from 'js-cookie';
import { type Lang } from '@/misc/types';
import appSettings from '@/misc/appSettings';

const supportedLanguages = appSettings.lang.supportedLanguages;

const LangSelector: React.FC = () => {
  const router = useRouter();
  const lang: Lang = validLang(Cookies.get('lang'));

  function dropdownHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    Cookies.set('lang', e.target.value);
    router.refresh();
  }

  return (
    <select value={lang.langCode} onChange={dropdownHandler}>
      {Object.keys(supportedLanguages).map((lang) => (
        <option value={supportedLanguages[lang].langCode} key={lang}>
          {supportedLanguages[lang].lang}
        </option>
      ))}
    </select>
  );
};

export default LangSelector;
