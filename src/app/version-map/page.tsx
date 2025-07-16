import '@/app/globals.css';
import GridContainer from '@/app/version-map/Components/GridContainer';
import SupportedSoftwares from '@/app/version-map/Components/SupportedSoftwares';
import { getTranslations } from 'next-intl/server';

const VersionMapPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <GridContainer />
      <div className={'max-sm:hidden md:block my-7'}>
        <SupportedSoftwares />
      </div>
      <p className={'text-justify max-sm:hidden my-7'}> {t('introText')} </p>
    </>
  );
};

export default VersionMapPage;
