'use client';

import { useTranslations } from 'next-intl';
import LangSelector from '@/Componets/LangSelector';

const Home = () => {
  const t = useTranslations('VersionMapPage');

  return (
    <>
      <p className="text-orange-500"> Hello World! </p>
      <br /><br /><br /><br /><br /><br /><br /> 
      <LangSelector />
    </>
  );
};

export default Home;
