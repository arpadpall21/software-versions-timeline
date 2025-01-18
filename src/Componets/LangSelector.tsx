'use client';

import { useRouter } from 'next/navigation';
import { validLang } from '@/misc/helpers';
import Cookies from 'js-cookie';
import { type Lang } from '@/misc/types';
import appSettings from '@/misc/appSettings';
import { useTranslations } from 'next-intl';

const supportedLanguages = appSettings.lang.supportedLanguages;

const LangSelector: React.FC = () => {
  const router = useRouter();
  const t = useTranslations('components.languageSelector');
  const lang: Lang = validLang(Cookies.get('lang'));

  function dropdownHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    Cookies.set('lang', e.target.value);
    router.refresh();
  }

  return (
    <div>
      <p>{t('language')}</p>
      <select value={lang.langCode} onChange={dropdownHandler}>
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
