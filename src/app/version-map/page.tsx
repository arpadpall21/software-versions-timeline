'use client';

import {useTranslations} from 'next-intl';

const Home = () => {
  const t = useTranslations('HomePage');

  return (
    <>
      <p className="text-black">{t('title')}</p>
    </>
  );
};

export default Home;
