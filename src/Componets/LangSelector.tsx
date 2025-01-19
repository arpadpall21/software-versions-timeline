'use client';

import '@/app/globals.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validLang } from '@/misc/helpers';
import Cookies from 'js-cookie';
import { type Lang } from '@/misc/types';
import appSettings from '@/misc/appSettings';
import { useTranslations } from 'next-intl';

const supportedLanguages: { [langCode: string]: Lang } = appSettings.lang.supportedLanguages;
const defaultLanguage: Lang = appSettings.lang.defaultLanguage;

const LangSelector: React.FC = () => {
  const [langState, setLangState] = useState<string>(defaultLanguage.langCode);
  const router = useRouter();
  const t = useTranslations('components.languageSelector');

  useEffect(() => {
    const lang: Lang = validLang(Cookies.get('lang'));
    setLangState(lang.langCode);
  }, []);

  function dropdownHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setLangState(e.target.value);
    Cookies.set('lang', e.target.value);
    router.refresh();
  }

  return (
    <div>
      <p>{t('language')}</p>
      <select className={'bg-bg-lt dark:bg-bg-dk'} value={langState} onChange={dropdownHandler}>
        {Object.keys(supportedLanguages).map((lang) => (
          <option value={supportedLanguages[lang].langCode} key={lang}>
            {supportedLanguages[lang].lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LangSelector;
