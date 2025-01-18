'use client';

import Cookies from 'js-cookie';
import { getLang } from '@/misc/helpers';

const LangSelector: React.FC = () => {
  const lang = getLang(Cookies.get('lang'));

  console.log(lang);

  return (
    <p> test </p>
  )
}

export default LangSelector;
