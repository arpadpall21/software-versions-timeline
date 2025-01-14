import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async (req) => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  
  console.log(req)
  
  const locale = 'fr';

  return {
    locale,
    messages: (await import(`../../translation/${locale}.json`)).default,
  };
});
