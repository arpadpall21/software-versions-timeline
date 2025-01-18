'use server';

import { cookies } from 'next/headers';
import { getLang } from '@/misc/helpers';

const languageCookieKey = 'lang';

export async function getUserLocale() {
  const cookiesStore = await cookies();
  const langCookieValue: string = cookiesStore.get(languageCookieKey)?.value || '';

  return getLang(langCookieValue);
}
