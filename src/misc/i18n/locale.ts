'use server';

import { cookies } from 'next/headers';
import { getLang } from '@/misc/helpers';
import { type Lang } from '@/misc/types';

const languageCookieKey = 'lang';

export async function getUserLocale() {
  const cookiesStore = await cookies();
  const langCookieValue: string = cookiesStore.get(languageCookieKey)?.value || '';
  const lang: Lang = getLang(langCookieValue);

  return lang.langCode;
}
