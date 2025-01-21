'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validLang } from '@/misc/helpers';
import Cookies from 'js-cookie';
import { type Lang } from '@/misc/types';
import appSettings from '@/misc/appSettings';
import { useTranslations } from 'next-intl';
import Dropdown from '@/Components/Dropdown';

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
    <Dropdown
      selectedItem={langState}
      optionItems={Object.keys(supportedLanguages).map((lang) => [
        supportedLanguages[lang].langCode,
        supportedLanguages[lang].lang,
      ])}
      dropdownHandler={dropdownHandler}
      title={t('language')}
    />
  );
};

export default LangSelector;
