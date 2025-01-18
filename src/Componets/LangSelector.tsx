'use client';

import Cookies from 'js-cookie';
import { validLang } from '@/misc/helpers';

const LangSelector: React.FC = () => {
  const lang = validLang(Cookies.get('lang'));


  return (
    <select value='x'>
      <option value='x'> X </option>
      <option value='y'> Y </option>
      <option value='z'> Z </option>
    </select>
  )
}

export default LangSelector;
