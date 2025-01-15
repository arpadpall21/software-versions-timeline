'use client';

import { useTranslations } from 'next-intl';

const Home = () => {
  const t = useTranslations('VersionMapPage');

  return (
    <>
      <p className="text-orange-500"> Hello World! </p>
    </>
  );
};

export default Home;
