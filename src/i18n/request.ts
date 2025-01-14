import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/i18n/locale';


export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  
  console.log('-----------------')
  console.log( await getUserLocale() )
  
  const locale = 'en';

  return {
    locale,
    messages: (await import(`../../translation/${locale}.json`)).default,
  };
});
