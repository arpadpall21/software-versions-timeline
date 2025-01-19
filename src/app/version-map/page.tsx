'use client';

import '@/app/globals.css';
import { useTranslations } from 'next-intl';
import LangSelector from '@/Components/LangSelector';
import ThemeSelector from '@/Components/ThemeSelector';

const Home = () => {
  const t = useTranslations('pages.versionMap');

  return (
    <>
      <p className={'text-+lt-fg-pri dark:text-+dk-fg-pri'}> Hello World! </p>
      <p className={'text-+lt-fg-pri dark:text-+dk-fg-pri text-lg font-bold'}> Hello World! </p>
      <p className={'text-+lt-fg-pri dark:text-+dk-fg-pri text-xl'}> Hello World! </p>
      <p className={'text-+lt-fg-pri dark:text-+dk-fg-pri text-2xl font-bold'}> Hello World! </p>
      
      <p className={'text-+lt-fg-sec dark:text-+dk-fg-sec'}> Hello World! </p>
      <p className={'text-+lt-fg-sec dark:text-+dk-fg-sec text-lg font-bold'}> Hello World! </p>
      <p className={'text-+lt-fg-sec dark:text-+dk-fg-sec text-xl'}> Hello World! </p>
      <p className={'text-+lt-fg-sec dark:text-+dk-fg-sec text-2xl font-bold'}> Hello World! </p>
      
      <p className={'text-+lt-fg-pop dark:text-+dk-fg-pop'}> Pop color </p>
      <p className={'text-+lt-fg-pop dark:text-+dk-fg-pop text-lg font-bold'}> Pop color </p>
      <p className={'text-+lt-fg-pop dark:text-+dk-fg-pop text-xl'}> Pop color </p>
      <p className={'text-+lt-fg-pop dark:text-+dk-fg-pop text-2xl font-bold'}> Pop color </p>
      
      
      <br /><br /><br /><br /><br /><br /><br /> 
      <LangSelector />
      <br /><br /><br /><br /><br /><br /><br /> 
      <ThemeSelector />
      <br /><br /><br /><br /><br /><br /><br /> 
      <br /><br /><br /><br /><br /><br /><br /> 
      
      
    </>
  );
};

export default Home;
