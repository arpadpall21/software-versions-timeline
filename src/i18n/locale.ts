'use server';

import { cookies } from 'next/headers';

const defaultLanguage = 'en';
const supportedLanguages = ['en', 'fr'];
const languageCookieKey = 'lang';

export async function getUserLocale() {
  const cookiesStore = await cookies();
  const languageCookieValue: string = cookiesStore.get(languageCookieKey)?.value || '';

  return supportedLanguages.includes(languageCookieValue) ? languageCookieValue : defaultLanguage;
}
