import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/i18n/locale';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../translation/${locale}.json`)).default,
  };
});
