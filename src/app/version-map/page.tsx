'use client';

import { useTranslations } from 'next-intl';
import LangSelector from '@/Componets/LangSelector';
import ThemeSelector from '@/Componets/ThemeSelector';

const Home = () => {
  const t = useTranslations('pages.versionMap');

  return (
    <>
      <p> Hello World! </p>
      <br /><br /><br /><br /><br /><br /><br /> 
      <LangSelector />
      <br /><br /><br /><br /><br /><br /><br /> 
      <ThemeSelector />
      
      
    </>
  );
};

export default Home;
