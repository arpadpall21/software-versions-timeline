'use client';

import Cookies from 'js-cookie';

const LangSelector: React.FC = () => {
  const lang = Cookies.get('lang');

  console.log(lang);

  return (
    <p> test </p>
  )
}

export default LangSelector;
