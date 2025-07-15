'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLang } from '@/misc/helpers';
import Cookies from 'js-cookie';
import { type Lang } from '@/misc/types';
import appConfig from '../../config/appConfig';
import { useTranslations } from 'next-intl';
import Dropdown from '@/Components/Dropdown';
import store from '@/misc/store';

const defaultLanguage: Lang = appConfig.lang.defaultLanguage;

const LangSelector: React.FC = () => {
  const [langState, setLangState] = useState<string>(defaultLanguage.langCode);
  const [supportedLanguages, setSupportedLanguages] = useState<{ [langCode: string]: Lang }>(
    appConfig.lang.supportedLanguages,
  );

  const router = useRouter();
  const t = useTranslations('components.languageSelector');

  useEffect(() => {
    const lang: Lang = getLang(Cookies.get('lang'));
    setLangState(lang.langCode);
  }, []);

  function handleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    setLangState(e.target.value);
    Cookies.set('lang', e.target.value);
    router.refresh();
  }

  function handleParentClick() {
    if (store.getCookiesAllowed() === 'no') {
      setSupportedLanguages({ defaultLanguage });
    }
  }

  return (
    <div onClick={handleParentClick}>
      <Dropdown
        selectedItem={langState}
        optionItems={Object.keys(supportedLanguages).map((lang) => [
          supportedLanguages[lang].langCode,
          supportedLanguages[lang].lang,
        ])}
        handleDropdown={handleDropdown}
        title={t('language')}
      />
    </div>
  );
};

export default LangSelector;
