'use client';

import { useTranslations } from 'next-intl';
import LangSelector from '@/Componets/LangSelector';

const Home = () => {
  const t = useTranslations('pages.versionMap');

  return (
    <>
      <p> Hello World! </p>
      <br /><br /><br /><br /><br /><br /><br /> 
      <LangSelector />
    </>
  );
};

export default Home;
